#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings
from orders.models import Contact

def create_reply_admin_view():
    """Create a custom admin view for replying to contact messages"""
    
    # Add to orders/admin.py
    admin_code = '''
from django.contrib import admin
from django.core.mail import send_mail
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
    readonly_fields = ('total_price',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'total_amount', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'user__email', 'full_name', 'email')
    list_editable = ('status',)
    readonly_fields = ('order_number', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Info', {
            'fields': ('order_number', 'user', 'status', 'total_amount', 'notes')
        }),
        ('Shipping Info', {
            'fields': ('full_name', 'email', 'phone', 'address', 'city', 'postal_code', 'country')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


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
        if request.POST.get('reply_message'):
            reply_message = request.POST.get('reply_message')
            success_count = 0
            
            for contact in queryset:
                if send_reply_email(contact, reply_message):
                    contact.replied = True
                    contact.save()
                    success_count += 1
            
            self.message_user(request, f'Successfully sent replies to {success_count} messages.')
            return HttpResponse('Replies sent successfully!')
        
        # Show reply form
        context = {
            'contacts': queryset,
            'action_checkbox_name': admin.ACTION_CHECKBOX_NAME,
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
'''
    
    print("Admin reply system code generated!")
    print("This will be added to orders/admin.py")
    return admin_code

if __name__ == '__main__':
    create_reply_admin_view()
