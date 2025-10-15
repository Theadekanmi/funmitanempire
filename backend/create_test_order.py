#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth import get_user_model
from orders.models import Order, OrderItem
from products.models import Product
from decimal import Decimal

User = get_user_model()

def create_test_order():
    try:
        # Get the user
        user = User.objects.first()  # Get any user instead of hardcoded email
        if not user:
            print("❌ No users found in database")
            return
        
        # Get a product (any product)
        product = Product.objects.first()
        if not product:
            print("❌ No products found")
            return
        
        # Create an order
        order = Order.objects.create(
            user=user,
            full_name=user.get_full_name() or "Ashley Riley",
            email=user.email,
            phone=user.phone_number or "+447123456789",
            address="123 Test Street",
            city="Manchester",
            postal_code="M1 1AA",
            country="GB",
            total_amount=Decimal('59.99'),
            status='processing'
        )
        
        # Create order item
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=2,
            price=Decimal('29.99')
        )
        
        print(f"✅ Created test order {order.order_number} for {user.email}")
        print(f"✅ Order total: £{order.total_amount}")
        
    except Exception as e:
        print(f"❌ Error creating test order: {e}")

if __name__ == '__main__':
    create_test_order()
