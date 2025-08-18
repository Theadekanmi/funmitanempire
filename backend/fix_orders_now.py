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
import uuid

User = get_user_model()

def main():
    print("🔍 Checking current state...")
    
    # Get the user
    try:
        user = User.objects.get(email='ashleyriley475@gmail.com')
        print(f"✅ Found user: {user.email}")
    except User.DoesNotExist:
        print("❌ User not found: ashleyriley475@gmail.com")
        return
    
    # Check existing orders
    existing_orders = Order.objects.filter(user=user)
    print(f"📦 Existing orders: {existing_orders.count()}")
    for order in existing_orders:
        print(f"  - Order {order.order_number}: {order.status} - £{order.total_amount}")
    
    # Get a product to add to order
    products = Product.objects.all()[:3]
    if not products:
        print("❌ No products found - creating a dummy product")
        from products.models import Category
        category, _ = Category.objects.get_or_create(name="Test Category", defaults={'slug': 'test'})
        product = Product.objects.create(
            name="Test Product",
            slug="test-product",
            category=category,
            price=Decimal('25.99'),
            stock_quantity=10
        )
        products = [product]
    
    # Create a new order
    try:
        order = Order.objects.create(
            user=user,
            order_number=f"ORD{uuid.uuid4().hex[:8].upper()}",
            full_name="Ashley Riley",
            email=user.email,
            phone="+447123456789",
            address="123 Test Street, Apartment 4B",
            city="Manchester",
            postal_code="M1 1AA",
            country="GB",
            total_amount=Decimal('79.97'),
            status='processing'
        )
        
        # Add items to the order
        for i, product in enumerate(products):
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=i + 1,
                price=product.price
            )
        
        print(f"✅ Created order {order.order_number}")
        print(f"✅ Order details:")
        print(f"   - ID: {order.id}")
        print(f"   - Number: {order.order_number}")
        print(f"   - User: {order.user.email}")
        print(f"   - Status: {order.status}")
        print(f"   - Total: £{order.total_amount}")
        print(f"   - Items: {order.items.count()}")
        
        # Test the API directly
        print("\n🧪 Testing API...")
        from rest_framework.test import APIClient
        from rest_framework_simplejwt.tokens import RefreshToken
        
        client = APIClient()
        refresh = RefreshToken.for_user(user)
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        
        response = client.get('/api/v1/orders/my_orders/')
        print(f"✅ API Response Status: {response.status_code}")
        print(f"✅ API Response Data: {len(response.data)} orders returned")
        
    except Exception as e:
        print(f"❌ Error creating order: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
