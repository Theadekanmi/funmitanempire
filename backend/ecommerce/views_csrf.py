from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf(request):
    token = get_token(request)
    resp = JsonResponse({"detail": "ok"})
    resp.set_cookie(
        "csrftoken",
        token,
        domain=".funmitanempire.uk",
        secure=True,
        samesite="Lax",
        httponly=False,
    )
    return resp
