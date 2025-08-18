from django.db import models
from django.conf import settings
from products.models import Product
import uuid


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Cart {self.id}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=20, blank=True)
    color = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    
    @property
    def total_price(self):
        return self.product.current_price * self.quantity


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    order_number = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    
    # Shipping info
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    
    # Order info
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    
    # Tracking info
    tracking_number = models.CharField(max_length=100, blank=True)
    carrier = models.CharField(max_length=50, blank=True)  # DHL, Royal Mail, etc.
    shipped_at = models.DateTimeField(null=True, blank=True)
    estimated_delivery = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if not self.order_number:
            self.order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)
        
        # Note: Order confirmation email is now sent manually after items are created
        # This ensures totals are calculated before sending the email
    
    def calculate_shipping_cost(self):
        """Calculate shipping cost based on postcode and subtotal"""
        # Manchester postcodes: M1-M99 - Always FREE
        if self.postal_code.upper().startswith('M'):
            return 0
        
        # UK mainland postcodes - FREE over £50
        uk_mainland_postcodes = [
            'B', 'BR', 'CB', 'CM', 'CO', 'CR', 'CV', 'DA', 'E', 'EC', 'EN', 'HA', 'HP', 'IG', 'KT',
            'LU', 'MK', 'N', 'NW', 'OX', 'RG', 'RM', 'SE', 'SG', 'SL', 'SM', 'SS', 'SW', 'TN',
            'TW', 'UB', 'W', 'WC', 'WD', 'AL', 'PE', 'NG', 'LE', 'DE', 'S', 'DN', 'LN', 'HU',
            'YO', 'LS', 'BD', 'HG', 'DL', 'TS', 'NE', 'SR', 'DH', 'CA', 'LA', 'PR', 'FY', 'BB',
            'BL', 'OL', 'SK', 'WA', 'CW', 'ST', 'WS', 'DY', 'WV', 'TF', 'SY', 'LD',
            'HR', 'GL', 'SN', 'BA', 'BS', 'TA', 'EX', 'PL', 'TQ', 'DT', 'BH', 'SO', 'PO', 'GU',
            'RH', 'BN', 'CF', 'SA', 'NP', 'G', 'ML', 'EH', 'KY', 'FK', 'DD'
        ]
        
        postcode_prefix = self.postal_code.upper()[:2].strip()
        if not postcode_prefix:
            postcode_prefix = self.postal_code.upper()[:1].strip()
        
        # Check if UK mainland
        is_uk_mainland = any(postcode_prefix.startswith(prefix) for prefix in uk_mainland_postcodes)
        
        from decimal import Decimal
        
        if is_uk_mainland:
            # FREE for UK mainland over £50
            return Decimal('0') if self.subtotal >= Decimal('50') else Decimal('5.99')
        
        # Remote UK areas (Scottish Highlands, Northern Ireland, etc.)
        remote_postcodes = ['AB', 'IV', 'KW', 'PA', 'PH', 'HS', 'ZE', 'KA', 'DG', 'BT', 'IM', 'JE', 'GY', 'TR']
        if any(postcode_prefix.startswith(prefix) for prefix in remote_postcodes):
            return Decimal('8.99')  # Remote UK areas
        
        # International (non-UK)
        return Decimal('15.99')  # International shipping
    
    def calculate_subtotal(self):
        """Calculate subtotal from order items"""
        from decimal import Decimal
        total = sum(item.total_price for item in self.items.all())
        return Decimal(str(total)) if total else Decimal('0')
    
    def update_totals(self):
        """Update subtotal, shipping, and total amounts"""
        print(f"🔍 update_totals called for order {self.order_number}")
        
        self.subtotal = self.calculate_subtotal()
        print(f"   - Subtotal calculated: £{self.subtotal}")
        
        self.shipping_cost = self.calculate_shipping_cost()
        print(f"   - Shipping cost calculated: £{self.shipping_cost}")
        
        self.total_amount = self.subtotal + self.shipping_cost
        print(f"   - Total amount calculated: £{self.total_amount}")
        
        print(f"   - Order items count: {self.items.count()}")
        for item in self.items.all():
            print(f"     * {item.product.name} x{item.quantity} @ £{item.price} = £{item.total_price}")
    
    def send_order_confirmation_email(self):
        """Send order confirmation email to customer"""
        try:
            from django.core.mail import EmailMultiAlternatives
            from django.template.loader import render_to_string
            from django.conf import settings
            
            subject = f"Order Confirmation - #{self.order_number}"
            
            # Plain text message
            text_message = f"""
Dear {self.full_name},

Thank you for your order! We've received your order and it's being processed.

Order Details:
Order Number: {self.order_number}
Order Date: {self.created_at.strftime('%Y-%m-%d %H:%M')}
Total Amount: £{self.total_amount}

Shipping Address:
{self.address}
{self.city}, {self.postal_code}
{self.country}

We'll send you another email with tracking information once your order ships.

Thank you for choosing Funmitan Empire!

Best regards,
The Funmitan Empire Team
"""
            
            # Render HTML template
            html_content = render_to_string('emails/order_confirmation.html', {
                'order': self,
                'track_url': f"{settings.FRONTEND_URL}/track-order",
                'unsubscribe_url': f"{settings.FRONTEND_URL}/unsubscribe?email={self.email}"
            })
            
            # Create email message
            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[self.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
        except Exception as e:
            print(f"Failed to send order confirmation email: {e}")
    
    def __str__(self):
        return self.order_number


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    size = models.CharField(max_length=20, blank=True)
    color = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    
    @property
    def total_price(self):
        if self.price is not None and self.quantity is not None:
            return self.price * self.quantity
        from decimal import Decimal
        return Decimal('0')


class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlists')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'product')
    
    def __str__(self):
        return f"{self.user.username} - {self.product.name}"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    replied = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.email