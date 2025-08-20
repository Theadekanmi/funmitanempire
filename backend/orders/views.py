from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from django.conf import settings
from .models import Cart, CartItem, Order, OrderItem, Wishlist, Contact, Newsletter
from products.models import Product
from .serializers import (
    CartSerializer, CartItemSerializer, OrderSerializer,
    WishlistSerializer, ContactSerializer, NewsletterSerializer
)


def get_or_create_cart(request):
    """Get or create cart for user or session"""
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart


@api_view(['GET'])
@permission_classes([AllowAny])
def my_cart(request):
    cart = get_or_create_cart(request)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    cart = get_or_create_cart(request)
    
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    size = request.data.get('size', '')
    color = request.data.get('color', '')
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Check if item already exists
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        size=size,
        color=color,
        defaults={'quantity': quantity}
    )
    
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cart_item(request):
    cart = get_or_create_cart(request)
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')
    
    try:
        cart_item = CartItem.objects.get(id=item_id, cart=cart)
        cart_item.quantity = quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_from_cart(request):
    cart = get_or_create_cart(request)
    item_id = request.data.get('item_id')
    
    try:
        cart_item = CartItem.objects.get(id=item_id, cart=cart)
        cart_item.delete()
        
        # Return updated cart data
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def clear_cart(request):
    cart = get_or_create_cart(request)
    cart.items.all().delete()
    return Response({'message': 'Cart cleared'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order_from_cart(request):
    print(f"🔍 create_order_from_cart called by user: {request.user}")
    print(f"🔍 Request data: {request.data}")
    
    try:
        cart = get_or_create_cart(request)
        print(f"🔍 Cart: {cart}, Items count: {cart.items.count()}")
        
        if not cart.items.exists():
            print("❌ Cart is empty")
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        print("✅ Cart has items, proceeding with order creation...")
        
        # Log each cart item
        for item in cart.items.all():
            print(f"   - Cart item: {item.product.name} x{item.quantity} @ £{item.product.current_price}")
        
    except Exception as e:
        print(f"❌ Error in cart setup: {e}")
        import traceback
        traceback.print_exc()
        return Response({'error': f'Cart setup error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Create order (calculations will be done after items are added)
    try:
        print("🔍 Creating order...")
        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                full_name=request.data.get('full_name'),
                email=request.data.get('email'),
                phone=request.data.get('phone'),
                address=request.data.get('address'),
                city=request.data.get('city'),
                postal_code=request.data.get('postal_code'),
                country=request.data.get('country'),
                subtotal=0,  # Will be calculated after items are added
                shipping_cost=0,  # Will be calculated after items are added
                total_amount=0,  # Will be calculated after items are added
                notes=request.data.get('notes', '')
            )
            print(f"✅ Order created: {order.order_number}")
            
            # Create order items
            print("🔍 Creating order items...")
            for cart_item in cart.items.all():
                try:
                    # Use safe price calculation
                    try:
                        product_price = cart_item.product.current_price
                        print(f"   - Using current_price: £{product_price}")
                    except Exception as e:
                        # Fallback to regular price if current_price fails
                        product_price = cart_item.product.price
                        print(f"   - Using fallback price: £{product_price} (error: {e})")
                    
                    order_item = OrderItem.objects.create(
                        order=order,
                        product=cart_item.product,
                        quantity=cart_item.quantity,
                        price=product_price,
                        size=cart_item.size,
                        color=cart_item.color
                    )
                    print(f"   ✅ Order item created: {order_item.id}")
                    
                except Exception as e:
                    print(f"   ❌ Error creating order item: {e}")
                    import traceback
                    traceback.print_exc()
                    raise e
            
            # Calculate accurate totals based on items and shipping
            order.update_totals()
            order.save()
            
            # Now send the order confirmation email (after totals are calculated)
            try:
                order.send_order_confirmation_email()
                print(f"✅ Order confirmation email sent to {order.email}")
            except Exception as e:
                print(f"❌ Failed to send order confirmation email: {e}")
            
            # Clear cart
            cart.items.all().delete()
            
            # Send email notifications
            try:
                from django.core.mail import send_mail
                
                # Email to admin (you)
                admin_subject = f"New Order #{order.order_number}"
                order_items_text = "\n".join([
                    f"- {item.product.name} x{item.quantity} - £{item.total_price}"
                    for item in order.items.all()
                ])
                
                admin_url = request.build_absolute_uri('/admin/orders/order/')
                admin_message = f"""
New order received!

Order Number: {order.order_number}
Customer: {order.full_name} ({order.email})
Phone: {order.phone}
Total Amount: £{order.total_amount}

Shipping Address:
{order.address}
{order.city}, {order.postal_code}
{order.country}

Order Items:
{order_items_text}

Notes: {order.notes}

Order Date: {order.created_at}

Please login to the admin panel to process: {admin_url}
                """
                
                send_mail(
                    subject=admin_subject,
                    message=admin_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER, 'funmitanempire@gmail.com'],
                    fail_silently=True,
                )
                
                # Note: Customer confirmation email is now sent automatically by the Order model
                # This prevents duplicate emails and ensures consistent styling
                
            except Exception as e:
                print(f"Failed to send admin notification email: {str(e)}")
                
    except Exception as e:
        print(f"❌ Error in order creation process: {e}")
        import traceback
        traceback.print_exc()
        return Response({'error': f'Order creation error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    print(f"🔍 my_orders API called by user: {request.user}")
    print(f"🔍 User authenticated: {request.user.is_authenticated}")
    
    try:
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        print(f"🔍 Found {orders.count()} orders for user {request.user.email}")
        
        serializer = OrderSerializer(orders, many=True)
        print(f"🔍 Serialized data length: {len(serializer.data)}")
        
        return Response(serializer.data)
    except Exception as e:
        print(f"❌ Error in my_orders: {str(e)}")
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([AllowAny])
def track_order(request, order_number):
    try:
        order = Order.objects.get(order_number=order_number)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


# Wishlist views
@api_view(['GET'])
@permission_classes([AllowAny])
def my_wishlist(request):
    if request.user.is_authenticated:
        wishlist = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlist, many=True)
        return Response(serializer.data)
    else:
        # For anonymous users, return empty wishlist (frontend will handle localStorage)
        return Response([])


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_wishlist(request):
    if not request.user.is_authenticated:
        return Response({'message': 'Added to wishlist'}, status=status.HTTP_201_CREATED)
    
    product_id = request.data.get('product_id')
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    wishlist, created = Wishlist.objects.get_or_create(
        user=request.user,
        product=product
    )
    
    if not created:
        return Response({'message': 'Product already in wishlist'})
    
    return Response({'message': 'Added to wishlist'}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_from_wishlist(request):
    if not request.user.is_authenticated:
        return Response({'message': 'Removed from wishlist'})
    
    product_id = request.data.get('product_id')
    
    try:
        wishlist = Wishlist.objects.get(user=request.user, product_id=product_id)
        wishlist.delete()
        return Response({'message': 'Removed from wishlist'})
    except Wishlist.DoesNotExist:
        return Response({'error': 'Product not in wishlist'}, status=status.HTTP_404_NOT_FOUND)


# Contact and Newsletter
@api_view(['POST'])
@permission_classes([AllowAny])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        contact_instance = serializer.save()
        
        # Send email notification to admin
        try:
            from django.core.mail import send_mail
            from django.conf import settings
            
            subject = f"New Contact Message: {contact_instance.subject}"
            message = f"""
New contact message received:

From: {contact_instance.name} ({contact_instance.email})
Subject: {contact_instance.subject}

Message:
{contact_instance.message}

Submitted at: {contact_instance.created_at}

Please login to the admin panel to reply: http://203.161.60.101:8000/admin/orders/contact/
            """
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],  # funmitanempire@gmail.com
                fail_silently=True,  # Don't fail if email fails
            )
        except Exception as e:
            print(f"Failed to send notification email: {str(e)}")
        
        return Response({'message': 'Message sent successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def newsletter_subscribe(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        newsletter = serializer.save()
        
        # Send welcome newsletter email
        try:
            from django.core.mail import send_mail
            from django.conf import settings
            
            subject = "Welcome to Funmitan Empire Newsletter! 📰"
            message = f"""
🛍️ FUNMITAN EMPIRE LIMITED
Premium Fashion & Quality Fabrics

Hello Fashion Lover!

🎉 Thank you for subscribing to the Funmitan Empire newsletter!

✨ YOU'LL NOW RECEIVE:
• 🔥 Exclusive fashion updates
• 🎯 Early access to new collections
• 💰 Special member discounts
• 👗 Style tips and trends
• 🚚 Free UK delivery offers

We're excited to have you as part of our fashion community!

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
🚫 Unsubscribe: {settings.FRONTEND_URL}/unsubscribe?email={newsletter.email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            """
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[newsletter.email],
                fail_silently=False,
            )
            
            print(f"✅ Newsletter welcome email sent to {newsletter.email}")
            
        except Exception as e:
            print(f"❌ Failed to send newsletter welcome email: {e}")
        
        return Response({'message': 'Subscribed successfully! Check your email for confirmation.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def newsletter_unsubscribe(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        newsletter = Newsletter.objects.get(email=email)
        newsletter.delete()
        return Response({'message': 'Successfully unsubscribed from newsletter'})
    except Newsletter.DoesNotExist:
        return Response({'message': 'Email not found in newsletter list'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def mark_order_paid(request, order_number):
    """Mark an order as paid and send notifications.
    This lightweight endpoint is meant to be called by the payment success handler.
    """
    try:
        order = Order.objects.get(order_number=order_number)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        old_status = order.status
        if old_status in ['pending', 'processing']:
            order.status = 'processing'
            order.save()

        # Notify customer
        from django.core.mail import send_mail
        customer_subject = f"Payment Received - Order #{order.order_number}"
        customer_message = (
            f"Hi {order.full_name},\n\n"
            f"We have received your payment for order #{order.order_number}. "
            f"We'll start processing your order right away. You can track your order here: "
            f"{settings.FRONTEND_URL}/track-order?order={order.order_number}\n\n"
            f"Thank you for shopping with Funmitan Empire!"
        )
        send_mail(
            subject=customer_subject,
            message=customer_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[order.email],
            fail_silently=True,
        )

        # Notify admin
        admin_subject = f"Payment Received - Order #{order.order_number}"
        admin_message = (
            f"Payment received for order #{order.order_number}.\n"
            f"Customer: {order.full_name} ({order.email})\n"
            f"Total: £{order.total_amount}\n"
            f"View admin: http://203.161.60.101:8000/admin/orders/order/"
        )
        send_mail(
            subject=admin_subject,
            message=admin_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER, 'funmitanempire@gmail.com'],
            fail_silently=True,
        )

        return Response({'message': 'Order marked as paid and notifications sent.'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)