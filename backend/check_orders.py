import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from orders.models import Order

print("Checking all orders...")
orders = Order.objects.all()

for order in orders:
    print(f"Order {order.order_number}:")
    print(f"  Status: {order.status}")
    print(f"  Tracking: {order.tracking_number or 'NONE'}")
    print(f"  Carrier: {order.carrier or 'NONE'}")
    print(f"  Email: {order.email}")
    print()

print(f"Total orders: {orders.count()}")

