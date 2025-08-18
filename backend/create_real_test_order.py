import os
import django
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth import get_user_model
from orders.models import Order, OrderItem
from products.models import Product
from django.utils import timezone
from decimal import Decimal

User = get_user_model()

def create_real_test_order():
    print("Creating test order with YOUR real email...")
    
    # Get admin user
    admin_user = User.objects.get(email='funmitanempire@gmail.com')
    
    # Get some products
    products = Product.objects.all()[:2]
    if not products:
        print("No products found! Run create_sample_data.py first.")
        return
    
    # Calculate total amount
    total_amount = Decimal('0.00')
    order_items = []
    
    for i, product in enumerate(products):
        quantity = 1 if i == 0 else 2
        item_total = product.current_price * quantity
        total_amount += item_total
        order_items.append({
            'product': product,
            'quantity': quantity,
            'price': product.current_price
        })
    
    # Create order with YOUR email
    order = Order.objects.create(
        user=admin_user,
        full_name='Test Customer (You)',
        email='funmitanempire@gmail.com',  # YOUR EMAIL
        phone='+44 20 1234 5678',
        address='123 Test Street',
        city='London',
        postal_code='SW1A 1AA',
        country='United Kingdom',
        total_amount=total_amount,
        notes='Test order for tracking email verification',
        status='pending'
    )
    
    # Create order items
    for item_data in order_items:
        OrderItem.objects.create(
            order=order,
            product=item_data['product'],
            quantity=item_data['quantity'],
            price=item_data['price']
        )
    
    print(f"✅ Created test order {order.order_number}")
    print(f"   Customer Email: {order.email}")
    print(f"   Total: £{order.total_amount}")
    print()
    print("🎯 Now go to admin and:")
    print("1. Add tracking info to this order")
    print("2. Mark it as shipped")
    print("3. You'll receive the email at funmitanempire@gmail.com!")

if __name__ == '__main__':
    create_real_test_order()

