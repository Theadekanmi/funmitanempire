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

print("Creating order with your real email...")

# Get admin user and a product
admin_user = User.objects.get(email='funmitanempire@gmail.com')
product = Product.objects.first()

if not product:
    print("No products found!")
    exit()

# Create order with YOUR email
order = Order.objects.create(
    user=admin_user,
    full_name='Test Customer',
    email='luckg6100@gmail.com',  # YOUR REAL EMAIL
    phone='+44 123 456 7890',
    address='123 Test Street',
    city='London',
    postal_code='SW1A 1AA',
    country='United Kingdom',
    total_amount=Decimal('50.00'),
    notes='Test order for email verification',
    status='pending',
    # Add tracking info directly
    tracking_number='DH123456789GB',
    carrier='DHL'
)

# Create order item
OrderItem.objects.create(
    order=order,
    product=product,
    quantity=1,
    price=Decimal('50.00')
)

print(f"✅ Created order {order.order_number} with YOUR email: {order.email}")
print(f"✅ Tracking number: {order.tracking_number}")
print(f"✅ Carrier: {order.carrier}")
print(f"✅ Status: {order.status}")
print()
print("Now you can test the 'Mark as shipped' action and you'll receive the email!")

