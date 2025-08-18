#!/usr/bin/env python
import os
import django
import sys

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth import get_user_model
from products.models import Category, Product

User = get_user_model()

def create_sample_data():
    print("Creating sample data...")
    
    # Create superuser
    if not User.objects.filter(email='admin@funmitanempire.com').exists():
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@funmitanempire.com',
            password='admin123'
        )
        print(f"✅ Created admin user: {admin.email}")
    
    # Create categories that match your frontend
    categories_data = [
        {'name': 'Women', 'slug': 'women', 'description': 'Fashion for women'},
        {'name': 'Men', 'slug': 'men', 'description': 'Fashion for men'},
        {'name': 'Teens', 'slug': 'teens', 'description': 'Fashion for teenagers'},
        {'name': 'Fabrics', 'slug': 'fabrics', 'description': 'Premium fabrics'},
        {'name': 'Gele', 'slug': 'gele', 'description': 'Traditional gele'},
    ]
    
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={
                'name': cat_data['name'],
                'description': cat_data['description']
            }
        )
        if created:
            print(f"✅ Created category: {category.name}")
    
    # Create sample products
    products_data = [
        # Women's products
        {'name': 'Elegant Evening Dress', 'category': 'women', 'price': 89.99, 'sale_price': 69.99, 'featured': True},
        {'name': 'Casual Summer Blouse', 'category': 'women', 'price': 34.99, 'featured': True},
        {'name': 'Designer Handbag', 'category': 'women', 'price': 129.99},
        {'name': 'Silk Scarf Collection', 'category': 'women', 'price': 24.99, 'sale_price': 19.99},
        
        # Men's products  
        {'name': 'Classic Business Suit', 'category': 'men', 'price': 299.99, 'featured': True},
        {'name': 'Casual Cotton Shirt', 'category': 'men', 'price': 39.99},
        {'name': 'Premium Leather Belt', 'category': 'men', 'price': 49.99, 'sale_price': 39.99},
        {'name': 'Designer Watch', 'category': 'men', 'price': 199.99, 'featured': True},
        
        # Teens products
        {'name': 'Trendy Graphic Tee', 'category': 'teens', 'price': 19.99, 'featured': True},
        {'name': 'Denim Jacket', 'category': 'teens', 'price': 59.99, 'sale_price': 44.99},
        {'name': 'Sneakers Collection', 'category': 'teens', 'price': 79.99},
        {'name': 'Backpack Set', 'category': 'teens', 'price': 34.99},
        
        # Fabrics
        {'name': 'Ankara Print Fabric', 'category': 'fabrics', 'price': 15.99, 'featured': True},
        {'name': 'Silk Blend Material', 'category': 'fabrics', 'price': 29.99},
        {'name': 'Cotton Batik Print', 'category': 'fabrics', 'price': 12.99, 'sale_price': 9.99},
        {'name': 'Lace Fabric Premium', 'category': 'fabrics', 'price': 39.99},
        
        # Gele
        {'name': 'Traditional Gele Set', 'category': 'gele', 'price': 24.99, 'featured': True},
        {'name': 'Premium Silk Gele', 'category': 'gele', 'price': 49.99, 'sale_price': 39.99},
        {'name': 'Aso Oke Collection', 'category': 'gele', 'price': 34.99},
        {'name': 'Embroidered Gele', 'category': 'gele', 'price': 44.99},
    ]
    
    for prod_data in products_data:
        category = Category.objects.get(slug=prod_data['category'])
        
        product, created = Product.objects.get_or_create(
            name=prod_data['name'],
            defaults={
                'category': category,
                'description': f"Premium quality {prod_data['name'].lower()} from Funmitan Empire Limited. Crafted with attention to detail and style.",
                'price': prod_data['price'],
                'sale_price': prod_data.get('sale_price'),
                'stock_quantity': 50,
                'is_featured': prod_data.get('featured', False),
                'is_active': True
            }
        )
        if created:
            print(f"✅ Created product: {product.name} (£{product.current_price})")
    
    print("\n🎉 Sample data created successfully!")
    print("📊 Summary:")
    print(f"   - Categories: {Category.objects.count()}")
    print(f"   - Products: {Product.objects.count()}")
    print(f"   - Featured Products: {Product.objects.filter(is_featured=True).count()}")
    print(f"   - Products on Sale: {Product.objects.exclude(sale_price__isnull=True).count()}")

if __name__ == '__main__':
    create_sample_data()
