from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


def get_client_ip(request):
    """Get the real IP address of the client"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
from .models import User


def send_welcome_email(user):
    """Send welcome email to new user"""
    try:
        subject = f'Welcome to Funmitan Empire Limited, {user.first_name or user.username}!'
        message = f"""
🛍️ FUNMITAN EMPIRE LIMITED
Premium Fashion & Quality Fabrics

Dear {user.first_name or user.username},

🎉 Welcome to Funmitan Empire Limited!

Thank you for joining our fashion community. We're excited to have you on board!

✨ HERE'S WHAT YOU CAN DO NOW:
• 👗 Browse our premium collection of fabrics, gele, and ready-made fashion
• 🛒 Add items to your cart
• 📦 Track your orders
• 🚚 Enjoy fast UK delivery

🎯 Visit your account dashboard: {settings.FRONTEND_URL}/account

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ FUNMITAN EMPIRE LIMITED
📧 funmitanempire@gmail.com
📞 +447368369348
📍 Manchester, United Kingdom

📱 FOLLOW US FOR DAILY INSPIRATION:
🔵 Facebook: https://www.facebook.com/share/1AHGWcKrWq/
📸 Instagram: @funmitan2022
🎵 TikTok: @funmitan2022

🛒 Shop Now: {settings.FRONTEND_URL}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        """
        
        # Use HTML email template
        from django.core.mail import EmailMultiAlternatives
        from django.template.loader import render_to_string
        
        # Render HTML template
        html_content = render_to_string('emails/welcome_email.html', {
            'user': user,
            'shop_url': f"{settings.FRONTEND_URL}",
            'unsubscribe_url': f"{settings.FRONTEND_URL}/unsubscribe?email={user.email}"
        })
        
        # Create email message
        msg = EmailMultiAlternatives(
            subject=subject,
            body=message,  # Plain text fallback
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        
        print(f"✅ Welcome email sent to {user.email}")
    except Exception as e:
        print(f"❌ Failed to send welcome email to {user.email}: {str(e)}")


def send_verification_email(user):
    """Send email verification to user"""
    try:
        # Generate verification token
        user.generate_verification_token()
        
        subject = 'Verify Your Email - Funmitan Empire Limited'
        message = f"""
🛍️ FUNMITAN EMPIRE LIMITED
Premium Fashion & Quality Fabrics

Dear {user.first_name or user.username},

🔐 Please verify your email address to complete your registration.

✅ Click the link below to verify your email:
{settings.FRONTEND_URL}/verify-email?token={user.email_verification_token}

⏰ This link will expire in 24 hours for security reasons.

If you didn't create an account with us, please ignore this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ FUNMITAN EMPIRE LIMITED
📧 funmitanempire@gmail.com
📞 +447368369348
📍 Manchester, United Kingdom

📱 FOLLOW US:
🔵 Facebook: https://www.facebook.com/share/1AHGWcKrWq/
📸 Instagram: @funmitan2022
🎵 TikTok: @funmitan2022
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        """
        
        # Use HTML email template
        from django.core.mail import EmailMultiAlternatives
        from django.template.loader import render_to_string
        
        verification_url = f"{settings.FRONTEND_URL}/verify-email?token={user.email_verification_token}"
        
        # Render HTML template
        html_content = render_to_string('emails/verification_email.html', {
            'user': user,
            'verification_url': verification_url,
            'unsubscribe_url': f"{settings.FRONTEND_URL}/unsubscribe?email={user.email}"
        })
        
        # Create email message
        msg = EmailMultiAlternatives(
            subject=subject,
            body=message,  # Plain text fallback
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        
        print(f"✅ Verification email sent to {user.email}")
    except Exception as e:
        print(f"❌ Failed to send verification email to {user.email}: {str(e)}")


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        try:
            # Check if user with email already exists
            email = serializer.validated_data.get('email')
            if User.objects.filter(email=email).exists():
                return Response({
                    'error': 'Email is already in use. Please use a different email or try logging in.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            user = serializer.save()
            
            # Track registration IP
            user.registration_ip = get_client_ip(request)
            user.save()
            
            # Send welcome and verification emails (simplified)
            try:
                send_verification_email(user)
            except Exception as email_error:
                print(f"Email sending failed: {email_error}")
            
            return Response({
                'message': 'Account created successfully! Please check your email for verification link.'
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle specific database errors
            error_message = str(e)
            if 'UNIQUE constraint failed' in error_message:
                return Response({
                    'error': 'Email is already in use. Please use a different email.'
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'error': f'Registration failed: {error_message}'
                }, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle validation errors
    errors = {}
    for field, field_errors in serializer.errors.items():
        if field == 'email' and 'user with this email already exists' in str(field_errors).lower():
            errors[field] = ['Email is already in use. Please use a different email.']
        else:
            errors[field] = field_errors
    
    return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Check if email is verified
        if not user.email_verified:
            return Response({
                'error': 'Please verify your email before logging in. Check your inbox for verification link.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Track login IP
        user.last_login_ip = get_client_ip(request)
        user.save()
        
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({'message': 'Logout successful'})
    except Exception:
        return Response({'message': 'Logout successful'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response(UserSerializer(request.user).data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    # Remove email from update data to prevent uniqueness error
    update_data = request.data.copy()
    if 'email' in update_data:
        del update_data['email']
    
    serializer = UserSerializer(request.user, data=update_data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def verify_email(request):
    token = request.GET.get('token') or request.data.get('token')
    if not token:
        return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email_verification_token=token)
        user.email_verified = True
        user.email_verification_token = None
        user.save()
        
        # Auto-login user after verification
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Email verified successfully! You are now logged in.',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
    except User.DoesNotExist:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        # Generate reset token
        reset_token = user.generate_verification_token()
        
        subject = 'Reset Your Password - Funmitan Empire Limited'
        message = f"""
Dear {user.first_name or user.username},

You have requested to reset your password for your Funmitan Empire account.

Click the link below to reset your password:
{settings.FRONTEND_URL}/reset-password?token={reset_token}

This link will expire in 24 hours for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
The Funmitan Empire Team
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        
        return Response({'message': 'Password reset email sent successfully!'})
    except User.DoesNotExist:
        # Don't reveal if email exists for security
        return Response({'message': 'If that email exists, a reset link has been sent.'})
    except Exception as e:
        return Response({'error': 'Failed to send reset email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    token = request.data.get('token')
    password = request.data.get('password')
    
    if not token or not password:
        return Response({'error': 'Token and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email_verification_token=token)
        user.set_password(password)
        user.email_verification_token = None  # Clear the token
        user.save()
        
        return Response({'message': 'Password reset successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def resend_verification(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        if user.email_verified:
            return Response({'message': 'Email is already verified'})
        
        # Send verification email
        send_verification_email(user)
        return Response({'message': 'Verification email sent successfully!'})
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)