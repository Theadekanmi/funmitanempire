#!/usr/bin/env python
import os
import sys
import django
from datetime import datetime, timedelta
from decimal import Decimal

# Setup Django
sys.path.append(os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from accounts.models import User
from products.models import Product, Category
from orders.models import Order, OrderItem

def create_test_orders():
    """Create test orders for testing the order tracking system"""
    
    # Create or get test user
    test_user, created = User.objects.get_or_create(
        email='luckg6100@gmail.com',
        defaults={
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User',
            'email_verified': True
        }
    )
    
    if created:
        test_user.set_password('testpass123')
        test_user.save()
        print(f"✅ Created test user: {test_user.email}")
    else:
        print(f"✅ Using existing user: {test_user.email}")
    
    # Create or get test category
    category, created = Category.objects.get_or_create(
        name='Test Category',
        defaults={
            'slug': 'test-category',
            'description': 'Test category for orders'
        }
    )
    
    # Create or get test products
    products = []
    for i in range(3):
        product, created = Product.objects.get_or_create(
            name=f'Test Product {i+1}',
            defaults={
                'slug': f'test-product-{i+1}',
                'description': f'Description for test product {i+1}',
                'price': Decimal('25.99'),
                'category': category,
                'stock_quantity': 10,
                'is_active': True
            }
        )
        products.append(product)
        if created:
            print(f"✅ Created product: {product.name}")
    
    # Create test orders
    order_statuses = ['pending', 'processing', 'shipped', 'delivered']
    
    for i in range(4):
        order_number = f'ORD-TEST-{i+1:04d}'
        
        # Check if order already exists
        if Order.objects.filter(order_number=order_number).exists():
            print(f"⚠️ Order {order_number} already exists, skipping...")
            continue
        
        order = Order.objects.create(
            user=test_user,
            order_number=order_number,
            email=test_user.email,
            full_name=f'{test_user.first_name} {test_user.last_name}',
            phone='1234567890',
            address='123 Test Street',
            city='Test City',
            postal_code='T3ST 1NG',
            country='UK',
            status=order_statuses[i],
            total_amount=Decimal('57.97')
        )
        
        # Add tracking info for shipped/delivered orders
        if order.status in ['shipped', 'delivered']:
            order.tracking_number = f'TRK{order_number[-4:]}'
            order.carrier = 'Royal Mail'
            order.shipped_at = datetime.now() - timedelta(days=i)
            if order.status == 'delivered':
                order.estimated_delivery = (datetime.now() - timedelta(days=i-1)).date()
            else:
                order.estimated_delivery = (datetime.now() + timedelta(days=2)).date()
            order.save()
        
        # Add order items
        for j, product in enumerate(products[:2]):  # Add 2 products per order
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=j + 1,
                price=product.price
            )
        
        print(f"✅ Created order: {order.order_number} (Status: {order.status})")
    
    print(f"\n🎉 Test orders created successfully!")
    print(f"📧 Test user email: {test_user.email}")
    print(f"🔑 Test user password: testpass123")
    
    # Display created orders
    orders = Order.objects.filter(user=test_user).order_by('-created_at')
    print(f"\n📦 Orders for {test_user.email}:")
    for order in orders:
        print(f"  - {order.order_number}: {order.status} (£{order.total_amount})")
        if order.tracking_number:
            print(f"    📮 Tracking: {order.tracking_number} via {order.carrier}")

if __name__ == '__main__':
    create_test_orders()
