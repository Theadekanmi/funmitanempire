from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, sys

@csrf_exempt
def paypal_webhook(request):
    try:
        body = request.body.decode("utf-8") if request.body else ""
        # Optional: log to stdout for now
        print("PAYPAL_WEBHOOK:", body, file=sys.stdout, flush=True)
        # TODO: verify signature + handle events once live creds provided
        return JsonResponse({"status": "ok"}, status=200)
    except Exception:
        return JsonResponse({"status": "error"}, status=400)
