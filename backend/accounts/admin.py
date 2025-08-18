from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile


class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'email_verified', 'registration_ip', 'last_login_ip', 'is_staff')
    list_filter = ('email_verified', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'username', 'first_name', 'last_name', 'registration_ip', 'last_login_ip')
    ordering = ('email',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile Info', {
            'fields': ('phone_number', 'date_of_birth', 'email_verified', 'email_verification_token')
        }),
        ('Address Info', {
            'fields': ('address', 'city', 'postal_code', 'country')
        }),
        ('IP Tracking', {
            'fields': ('registration_ip', 'last_login_ip')
        }),
    )


# Register the User model with our custom admin
admin.site.register(User, UserAdmin)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email')
    readonly_fields = ('created_at', 'updated_at')