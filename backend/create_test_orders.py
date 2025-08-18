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

def create_test_orders():
    print("Creating test orders...")
    
    # Get or create a test user
    admin_user, created = User.objects.get_or_create(
        email='funmitanempire@gmail.com',
        defaults={
            'username': 'admin',
            'first_name': 'Admin',
            'last_name': 'User',
            'is_staff': True,
            'is_superuser': True,
            'email_verified': True
        }
    )
    
    # Get some products
    products = Product.objects.all()[:3]
    if not products:
        print("No products found! Run create_sample_data.py first.")
        return
    
    # Create test orders
    test_orders_data = [
        {
            'full_name': 'Sarah Johnson',
            'email': 'sarah.johnson@email.com',
            'phone': '+44 20 7946 0958',
            'address': '15 Oxford Street',
            'city': 'London',
            'postal_code': 'W1D 1BS',
            'country': 'United Kingdom',
            'notes': 'Please handle with care - gift for my mother'
        },
        {
            'full_name': 'Michael Chen',
            'email': 'michael.chen@email.com', 
            'phone': '+44 161 123 4567',
            'address': '42 Deansgate',
            'city': 'Manchester',
            'postal_code': 'M3 2EG',
            'country': 'United Kingdom',
            'notes': 'Delivery preferred after 5pm'
        },
        {
            'full_name': 'Amara Okafor',
            'email': 'amara.okafor@email.com',
            'phone': '+44 121 555 0123',
            'address': '78 Bull Ring',
            'city': 'Birmingham',
            'postal_code': 'B5 4BP',
            'country': 'United Kingdom',
            'notes': 'Urgent delivery - needed for event this weekend'
        }
    ]
    
    for i, order_data in enumerate(test_orders_data):
        # Calculate total amount
        total_amount = Decimal('0.00')
        order_items = []
        
        for j, product in enumerate(products[:2]):  # Use first 2 products per order
            quantity = 1 if j == 0 else 2
            item_total = product.current_price * quantity
            total_amount += item_total
            order_items.append({
                'product': product,
                'quantity': quantity,
                'price': product.current_price
            })
        
        # Create order
        order = Order.objects.create(
            user=admin_user,
            full_name=order_data['full_name'],
            email=order_data['email'],
            phone=order_data['phone'],
            address=order_data['address'],
            city=order_data['city'],
            postal_code=order_data['postal_code'],
            country=order_data['country'],
            total_amount=total_amount,
            notes=order_data['notes'],
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
        
        print(f"✅ Created order {order.order_number} for {order.full_name}")
        print(f"   Total: £{order.total_amount}")
        print(f"   Items: {order.items.count()}")
        print()
    
    print(f"🎉 Successfully created {len(test_orders_data)} test orders!")
    print("\nYou can now:")
    print("1. Go to http://127.0.0.1:8000/admin/orders/order/")
    print("2. Add tracking numbers to orders")
    print("3. Test the 'Mark as shipped' action")
    print("4. Check email notifications")

if __name__ == '__main__':
    create_test_orders()

