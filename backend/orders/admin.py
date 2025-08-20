from django.contrib import admin
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import path
from .models import Cart, CartItem, Order, OrderItem, Wishlist, Contact, Newsletter


def send_reply_email(contact, reply_message):
    """Send reply email to customer"""
    try:
        subject = f'Re: {contact.subject} - Funmitan Empire Limited'
        message = f"""
Dear {contact.name},

Thank you for contacting Funmitan Empire Limited.

{reply_message}

If you have any further questions, please don't hesitate to contact us.

Best regards,
Funmitan Empire Limited Team
funmitanempire@gmail.com

---
Original Message:
Subject: {contact.subject}
Message: {contact.message}
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [contact.email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Failed to send reply: {str(e)}")
        return False


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_key', 'created_at')
    list_filter = ('created_at',)
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('product', 'quantity', 'price', 'size', 'color')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'total_amount', 'tracking_number', 'created_at')
    list_filter = ('status', 'carrier', 'created_at', 'shipped_at')
    search_fields = ('order_number', 'user__email', 'full_name', 'email', 'tracking_number')
    list_editable = ('status',)
    readonly_fields = ('order_number', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
    actions = ['mark_as_shipped']
    
    fieldsets = (
        ('Order Info', {
            'fields': ('order_number', 'user', 'status', 'total_amount', 'notes')
        }),
        ('Shipping Info', {
            'fields': ('full_name', 'email', 'phone', 'address', 'city', 'postal_code', 'country')
        }),
        ('Tracking Info', {
            'fields': ('tracking_number', 'carrier', 'shipped_at', 'estimated_delivery')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def mark_as_shipped(self, request, queryset):
        """Custom action to mark orders as shipped and send tracking emails"""
        from django.utils import timezone
        
        print(f"🔍 Admin action called with {queryset.count()} orders")
        
        updated_count = 0
        for order in queryset:
            print(f"📦 Processing order {order.order_number} - Current status: {order.status}")
            
            # Always update orders, regardless of current status
            old_status = order.status
            order.status = 'shipped'
            if not order.shipped_at:
                order.shipped_at = timezone.now()
            # If no tracking number, set a default one
            if not order.tracking_number:
                order.tracking_number = f"DH{order.id:08d}GB"
            if not order.carrier:
                order.carrier = "DHL"
            order.save()
            updated_count += 1
            
            print(f"✅ Updated order {order.order_number} from {old_status} to {order.status}")
            
            # Send styled HTML tracking email to customer
            try:
                
                subject = f"Your Order #{order.order_number} Has Shipped! 🚚"
                
                # Render HTML email template
                print(f"🔍 Rendering shipping notification template for order {order.order_number}")
                html_message = render_to_string('emails/shipping_notification.html', {
                    'order': order,
                    'track_url': f"{settings.FRONTEND_URL}/track-order?order={order.order_number}",
                    'unsubscribe_url': f"{settings.FRONTEND_URL}/unsubscribe?email={order.email}"
                })
                print(f"✅ HTML template rendered successfully, length: {len(html_message)} characters")
                
                # Create plain text version
                plain_message = strip_tags(html_message)
                print(f"✅ Plain text version created, length: {len(plain_message)} characters")
                
                # Send email with both HTML and plain text versions
                email = EmailMultiAlternatives(
                    subject=subject,
                    body=plain_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[order.email]
                )
                email.attach_alternative(html_message, "text/html")
                email.send()
                
                print(f"✅ Styled tracking email sent to {order.email} for order {order.order_number}")
                
            except Exception as e:
                print(f"❌ Failed to send tracking email for order {order.order_number}: {str(e)}")
                print(f"❌ Email error details: {repr(e)}")
        
        self.message_user(request, f'Successfully marked {updated_count} orders as shipped and sent tracking emails.')
    
    mark_as_shipped.short_description = "Mark selected orders as shipped and send tracking emails"


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'product__name')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'replied')
    list_filter = ('replied', 'created_at')
    search_fields = ('name', 'email', 'subject')
    list_editable = ('replied',)
    readonly_fields = ('created_at',)
    
    fieldsets = (
        ('Contact Info', {
            'fields': ('name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('replied', 'created_at')
        }),
    )
    
    actions = ['reply_to_messages']
    
    def reply_to_messages(self, request, queryset):
        """Custom action to reply to selected messages"""
        if 'apply' in request.POST:
            # Process the form submission
            reply_message = request.POST.get('reply_message')
            subject = request.POST.get('subject', 'Reply from Funmitan Empire')
            
            if reply_message:
                success_count = 0
                for contact in queryset:
                    if send_reply_email(contact, reply_message):
                        contact.replied = True
                        contact.save()
                        success_count += 1
                
                self.message_user(request, f'Successfully sent replies to {success_count} messages.')
                return None
            else:
                self.message_user(request, 'Please enter a reply message.', level='ERROR')
        
        # Show reply form
        from django.contrib.admin.helpers import ACTION_CHECKBOX_NAME
        context = {
            'title': 'Reply to Contact Messages',
            'contacts': queryset,
            'action_checkbox_name': ACTION_CHECKBOX_NAME,
            'action': 'reply_to_messages',
            'opts': self.model._meta,
        }
        return render(request, 'admin/reply_form.html', context)
    
    reply_to_messages.short_description = "Reply to selected messages"


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', 'is_active')
    list_filter = ('is_active', 'subscribed_at')
    search_fields = ('email',)
    list_editable = ('is_active',)
    readonly_fields = ('subscribed_at',)