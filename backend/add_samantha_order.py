import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth import get_user_model
from products.models import Product
from orders.models import Order, OrderItem
from datetime import datetime, timedelta
from decimal import Decimal

User = get_user_model()

# Find Samantha's user account
try:
    user = User.objects.get(first_name='Samantha')
    print(f'✅ Found user: {user.email} - {user.first_name} {user.last_name}')
except User.DoesNotExist:
    print('❌ No user named Samantha found')
    # List all users to see what's available
    users = User.objects.all()
    for u in users:
        print(f'User: {u.email} - {u.first_name} {u.last_name}')
    exit()

# Get products
products = Product.objects.all()[:2]
if products:
    # Create order
    total = sum(p.price for p in products)
    order = Order.objects.create(
        user=user,
        full_name=f'{user.first_name} {user.last_name}',
        email=user.email,
        phone='555-123-4567',
        address='123 Main Street, Apt 5B',
        city='New York',
        postal_code='10001',
        country='US',
        status='processing',
        total_amount=total
    )
    
    # Add items
    for product in products:
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=1,
            price=product.price
        )
    
    print(f'🎉 Created order {order.order_number} for {user.email}')
    print(f'💰 Total: ${order.total_amount}')
    print(f'📦 Status: {order.status}')
else:
    print('❌ No products found')
