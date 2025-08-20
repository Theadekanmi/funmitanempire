"""
URL configuration for ecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from products.views import CategoryViewSet, ProductViewSet
from accounts import views as accounts_views
from orders import views as orders_views

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

api_v1_patterns = [
    # Auth
    path('auth/register/', accounts_views.register, name='register'),
    path('auth/login/', accounts_views.login, name='login'),
    path('auth/logout/', accounts_views.logout, name='logout'),

    # Profile
    path('profile/', accounts_views.profile, name='profile'),
    path('profile/update/', accounts_views.update_profile, name='update_profile'),
    
    # Email Verification
    path('auth/verify-email/', accounts_views.verify_email, name='verify_email'),
    
    # Password Reset
    path('auth/password-reset/', accounts_views.password_reset_request, name='password_reset_request'),
    path('auth/password-reset-confirm/', accounts_views.password_reset_confirm, name='password_reset_confirm'),
    path('auth/resend-verification/', accounts_views.resend_verification, name='resend_verification'),

    # Products & Categories via router
    path('', include(router.urls)),

    # Cart
    path('cart/my_cart/', orders_views.my_cart, name='my_cart'),
    path('cart/add_item/', orders_views.add_to_cart, name='add_to_cart'),
    path('cart/update_item/', orders_views.update_cart_item, name='update_cart_item'),
    path('cart/remove_item/', orders_views.remove_from_cart, name='remove_from_cart'),
    path('cart/clear_cart/', orders_views.clear_cart, name='clear_cart'),

    # Orders
    path('orders/create_from_cart/', orders_views.create_order_from_cart, name='create_order_from_cart'),
    path('orders/my_orders/', orders_views.my_orders, name='my_orders'),
    path('orders/<str:order_number>/track/', orders_views.track_order, name='track_order'),
    path('orders/<str:order_number>/paid/', orders_views.mark_order_paid, name='mark_order_paid'),

    # Wishlist
    path('wishlist/my_wishlist/', orders_views.my_wishlist, name='my_wishlist'),
    path('wishlist/add_to_wishlist/', orders_views.add_to_wishlist, name='add_to_wishlist'),
    path('wishlist/remove_from_wishlist/', orders_views.remove_from_wishlist, name='remove_from_wishlist'),

    # Contact & Newsletter
    path('contact/', orders_views.contact, name='contact'),
    path('newsletter/subscribe/', orders_views.newsletter_subscribe, name='newsletter_subscribe'),
    path('newsletter/unsubscribe/', orders_views.newsletter_unsubscribe, name='newsletter_unsubscribe'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include((api_v1_patterns, 'api'), namespace='v1')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
