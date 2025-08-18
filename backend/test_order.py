#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from orders.models import Cart, CartItem, Order, OrderItem
from products.models import Product
from accounts.models import User

def test_order_creation():
    try:
        # Get a user
        user = User.objects.first()
        if not user:
            print("No users found")
            return
        
        print(f"Testing with user: {user.email}")
        
        # Get or create cart
        cart, created = Cart.objects.get_or_create(user=user)
        print(f"Cart: {cart.id}, Created: {created}")
        
        # Check cart items
        items = cart.items.all()
        print(f"Cart items count: {items.count()}")
        
        for item in items:
            print(f"Item: {item.product.name}, Price: {item.product.price}, Sale Price: {item.product.sale_price}")
            try:
                current_price = item.product.current_price
                print(f"Current price: {current_price}")
            except Exception as e:
                print(f"Error getting current_price: {e}")
        
        # Try to create a simple order
        if items.exists():
            print("\nTrying to create order...")
            
            # Create order
            order = Order.objects.create(
                user=user,
                full_name="Test User",
                email="test@test.com",
                phone="1234567890",
                address="Test Address",
                city="Test City",
                postal_code="M1 1AA",
                country="United Kingdom",
                subtotal=0,
                shipping_cost=0,
                total_amount=0,
                notes="Test order"
            )
            print(f"Order created: {order.order_number}")
            
            # Create order items
            for cart_item in items:
                try:
                    product_price = cart_item.product.current_price
                except:
                    product_price = cart_item.product.price
                
                order_item = OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=product_price,
                    size=cart_item.size,
                    color=cart_item.color
                )
                print(f"Order item created: {order_item.id}")
            
            # Update totals
            order.update_totals()
            order.save()
            print(f"Order totals updated: Subtotal: {order.subtotal}, Total: {order.total_amount}")
            
            # Clean up test order
            order.delete()
            print("Test order cleaned up")
            
        else:
            print("No cart items to test with")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_order_creation()
