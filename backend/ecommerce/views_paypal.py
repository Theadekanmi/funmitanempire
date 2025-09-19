from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
import json, sys, hmac, hashlib, base64, requests


def _get_paypal_api_base():
    return 'https://api.paypal.com' if getattr(settings, 'PAYPAL_MODE', 'live') == 'live' else 'https://api.sandbox.paypal.com'


def _get_paypal_access_token():
    url = f"{_get_paypal_api_base()}/v1/oauth2/token"
    auth = (settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET)
    headers = {"Accept": "application/json", "Accept-Language": "en_US"}
    data = {"grant_type": "client_credentials"}
    resp = requests.post(url, headers=headers, data=data, auth=auth, timeout=10)
    resp.raise_for_status()
    return resp.json().get('access_token')


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def create_paypal_order(request):
    """Create a PayPal order for payment processing"""
    try:
        # Get order data from request
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'GBP')
        cart_items = request.data.get('cart_items', [])
        shipping_info = request.data.get('shipping_info', {})
        
        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate a temporary order reference for PayPal
        import uuid
        temp_order_ref = f"temp-{uuid.uuid4().hex[:8]}"
        
        # Get access token
        access_token = _get_paypal_access_token()
        
        # Create PayPal order
        url = f"{_get_paypal_api_base()}/v2/checkout/orders"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
            "PayPal-Request-Id": f"order-{temp_order_ref}-{timezone.now().timestamp()}"
        }
        
        payload = {
            "intent": "CAPTURE",
            "purchase_units": [{
                "reference_id": temp_order_ref,
                "invoice_id": temp_order_ref,  # This is what we'll use in webhook
                "amount": {
                    "currency_code": currency,
                    "value": str(amount)
                }
            }],
            "application_context": {
                "return_url": f"{settings.FRONTEND_URL}/checkout/success",
                "cancel_url": f"{settings.FRONTEND_URL}/checkout/cancel",
                "brand_name": "Funmitan Empire",
                "landing_page": "BILLING",
                "user_action": "PAY_NOW",
                "payment_method": {
                    "payer_selected": "PAYPAL",
                    "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
                },
                "shipping_preference": "NO_SHIPPING"
            }
        }
        
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        
        paypal_order = response.json()
        
        return Response({
            'id': paypal_order['id'],
            'paypal_order_id': paypal_order['id'],
            'temp_order_ref': temp_order_ref,
            'status': paypal_order['status'],
            'approve_url': next((link['href'] for link in paypal_order['links'] if link['rel'] == 'approve'), None)
        })
        
    except requests.exceptions.RequestException as e:
        print(f"PayPal API error: {e}", file=sys.stdout, flush=True)
        return Response({'error': 'Payment service unavailable'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except Exception as e:
        print(f"Create PayPal order error: {e}", file=sys.stdout, flush=True)
        return Response({'error': 'Failed to create payment order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def capture_paypal_order(request):
    """Capture a PayPal order after approval and create the order"""
    try:
        paypal_order_id = request.data.get('paypal_order_id')
        shipping_info = request.data.get('shipping_info', {})

        if not paypal_order_id:
            return Response({'error': 'PayPal order ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Get access token
        access_token = _get_paypal_access_token()

        # Capture the order
        url = f"{_get_paypal_api_base()}/v2/checkout/orders/{paypal_order_id}/capture"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        response = requests.post(url, headers=headers, json={}, timeout=10)
        response.raise_for_status()

        capture_result = response.json()

        if capture_result['status'] == 'COMPLETED':
            # Now create the order from cart data after payment is confirmed
            try:
                # Get the authenticated user
                user = request.user
                if not user.is_authenticated:
                    return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

                # Import the order creation function
                from orders.views import create_order_from_cart_internal
                
                # Create order data with payment info
                order_data = {
                    **shipping_info,
                    'paypal_order_id': paypal_order_id,
                    'payment_status': 'completed'
                }

                # Create the order now that payment is confirmed
                order = create_order_from_cart_internal(user, order_data)
                
                return Response({
                    'status': 'success',
                    'order_number': order.order_number,
                    'paypal_order_id': paypal_order_id,
                    'capture_id': capture_result['purchase_units'][0]['payments']['captures'][0]['id']
                })
            except Exception as order_error:
                print(f"Order creation error: {order_error}", file=sys.stdout, flush=True)
                return Response({'error': f'Order creation failed: {str(order_error)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Payment capture failed'}, status=status.HTTP_400_BAD_REQUEST)

    except requests.exceptions.RequestException as e:
        print(f"PayPal capture error: {e}", file=sys.stdout, flush=True)
        return Response({'error': 'Payment capture failed'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except Exception as e:
        print(f"Capture PayPal order error: {e}", file=sys.stdout, flush=True)
        return Response({'error': 'Failed to capture payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def _verify_paypal_webhook_signature(transmission_id, timestamp, webhook_id, event_body, cert_url, auth_algo, transmission_sig):
    """
    Use PayPal's verify webhook signature API.
    """
    access_token = _get_paypal_access_token()
    url = f"{_get_paypal_api_base()}/v1/notifications/verify-webhook-signature"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    payload = {
        "transmission_id": transmission_id,
        "transmission_time": timestamp,
        "cert_url": cert_url,
        "auth_algo": auth_algo,
        "transmission_sig": transmission_sig,
        "webhook_id": webhook_id,
        "webhook_event": event_body,
    }
    resp = requests.post(url, headers=headers, json=payload, timeout=10)
    if resp.status_code != 200:
        return False
    return resp.json().get('verification_status') == 'SUCCESS'

@csrf_exempt
@permission_classes([AllowAny])
def paypal_webhook(request):
    try:
        body_text = request.body.decode("utf-8") if request.body else "{}"
        event = json.loads(body_text or "{}")

        # Headers for verification
        transmission_id = request.headers.get('PAYPAL-TRANSMISSION-ID')
        timestamp = request.headers.get('PAYPAL-TRANSMISSION-TIME')
        cert_url = request.headers.get('PAYPAL-CERT-URL')
        auth_algo = request.headers.get('PAYPAL-AUTH-ALGO')
        transmission_sig = request.headers.get('PAYPAL-TRANSMISSION-SIG')
        webhook_id = getattr(settings, 'PAYPAL_WEBHOOK_ID', None)

        # Log basic event meta
        print("PAYPAL_WEBHOOK event_id=", event.get('id'), "event_type=", event.get('event_type'), file=sys.stdout, flush=True)

        # Basic validation
        if not webhook_id:
            print("Missing PAYPAL_WEBHOOK_ID in settings", file=sys.stdout, flush=True)
            return JsonResponse({"error": "Webhook not configured"}, status=500)

        if not (transmission_id and timestamp and cert_url and auth_algo and transmission_sig):
            print("Missing verification headers", file=sys.stdout, flush=True)
            return JsonResponse({"error": "Missing headers"}, status=400)

        # Verify signature with PayPal
        is_valid = _verify_paypal_webhook_signature(
            transmission_id, timestamp, webhook_id, event, cert_url, auth_algo, transmission_sig
        )
        if not is_valid:
            print("Webhook signature verification failed", file=sys.stdout, flush=True)
            return JsonResponse({"error": "Invalid signature"}, status=400)

        # Handle events
        event_type = event.get('event_type')

        if event_type == 'PAYMENT.CAPTURE.COMPLETED':
            # Extract order reference from resource
            resource = event.get('resource', {})
            # Prefer invoice_id or custom_id we set at payment creation time
            order_ref = resource.get('invoice_id') or resource.get('custom_id')

            # Fallback: try to dig deeper
            if not order_ref:
                seller = resource.get('supplementary_data', {}).get('related_ids', {})
                order_ref = seller.get('order_id')

            if not order_ref:
                print("No order reference found in webhook payload", file=sys.stdout, flush=True)
                return JsonResponse({"status": "ignored"}, status=200)

            # Handoff to existing endpoint to mark paid
            from django.urls import reverse
            from django.test import Client
            client = Client()
            mark_url = f"/api/v1/orders/{order_ref}/mark-paid/" if False else None
            # Directly import and call the function instead (avoids URL coupling)
            from orders.views import mark_order_paid
            response = mark_order_paid(request._request, order_ref)  # pass underlying HttpRequest
            try:
                status_code = getattr(response, 'status_code', 200)
            except Exception:
                status_code = 200
            print(f"Order {order_ref} marked paid via webhook: status={status_code}", file=sys.stdout, flush=True)
            return JsonResponse({"status": "ok"}, status=200)

        # Log other events for now
        print("Unhandled PayPal event:", event_type, file=sys.stdout, flush=True)
        return JsonResponse({"status": "ok"}, status=200)
    except Exception:
        return JsonResponse({"status": "error"}, status=400)
