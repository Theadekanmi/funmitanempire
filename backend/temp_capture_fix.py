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
            # Now create the order from cart data
            from orders.views import create_order_from_cart
            
            # Get the authenticated user from the request
            user = request.user
            if not user.is_authenticated:
                return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # Create order data
            order_data = {
                **shipping_info,
                'paypal_order_id': paypal_order_id,
                'payment_status': 'completed'
            }

            # Create the order
            order_response = create_order_from_cart(request, order_data)
            
            if hasattr(order_response, 'data') and order_response.data.get('order_number'):
                order_number = order_response.data['order_number']
                
                return Response({
                    'status': 'success',
                    'order_number': order_number,
                    'paypal_order_id': paypal_order_id,
                    'capture_id': capture_result['purchase_units'][0]['payments']['captures'][0]['id']
                })
            else:
                return Response({'error': 'Failed to create order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Payment capture failed'}, status=status.HTTP_400_BAD_REQUEST)

    except requests.exceptions.RequestException as e:
        print(f"PayPal capture error: {e}", file=sys.stdout, flush=True)
        return Response({'error': 'Payment capture failed'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except Exception as e:
        print(f"Capture PayPal order error: {e}", file=sys.stdout, flush=True)
        return Response({'error': 'Failed to capture payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
