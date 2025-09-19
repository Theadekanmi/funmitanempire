def _verify_paypal_webhook_signature(transmission_id, timestamp, webhook_id, event_body, cert_url, auth_algo, transmission_sig):
    """
    Use PayPal's verify webhook signature API.
    """
    try:
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
        
        if resp.status_code == 200:
            result = resp.json()
            return result.get('verification_status') == 'SUCCESS'
        else:
            print(f"PayPal verification API error: {resp.status_code} - {resp.text}", file=sys.stdout, flush=True)
            return False
    except Exception as e:
        print(f"Webhook verification error: {e}", file=sys.stdout, flush=True)
        return False
