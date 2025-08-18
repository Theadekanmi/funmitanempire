from django.conf import settings

class SecurityHeadersMiddleware:
    """
    Middleware to add security headers to all responses
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Content Security Policy
        response['Content-Security-Policy'] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.paypal.com *.paypalobjects.com; "
            "style-src 'self' 'unsafe-inline' fonts.googleapis.com; "
            "font-src 'self' fonts.gstatic.com; "
            "img-src 'self' data: *.paypal.com *.paypalobjects.com; "
            "connect-src 'self' *.paypal.com *.paypalobjects.com; "
            "frame-src 'self' *.paypal.com *.paypalobjects.com; "
            "object-src 'none'; "
            "base-uri 'self';"
        )
        
        # Prevent clickjacking
        response['X-Frame-Options'] = 'DENY'
        
        # Prevent MIME type sniffing
        response['X-Content-Type-Options'] = 'nosniff'
        
        # XSS Protection
        response['X-XSS-Protection'] = '1; mode=block'
        
        # Referrer Policy
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Permissions Policy
        response['Permissions-Policy'] = (
            "geolocation=(), "
            "microphone=(), "
            "camera=(), "
            "payment=(self), "
            "usb=(), "
            "accelerometer=(), "
            "gyroscope=()"
        )
        
        # HTTPS enforcement (when in production)
        if not settings.DEBUG:
            # Strict Transport Security
            response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
            
            # Secure cookies
            response['Set-Cookie'] = response.get('Set-Cookie', '') + '; Secure; SameSite=Strict'
        
        return response
