#!/usr/bin/env python
import os
import sys
import django
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from products.models import Category, Product
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
import shutil

def create_trending_categories():
    print("Creating trending categories...")
    
    # Create trending categories
    trending_categories = [
        {
            'name': 'Trending Women',
            'slug': 'trending-women',
            'description': 'Trending fashion items for women'
        },
        {
            'name': 'Trending Men',
            'slug': 'trending-men', 
            'description': 'Trending fashion items for men'
        },
        {
            'name': 'Trending Teens',
            'slug': 'trending-teens',
            'description': 'Trending fashion items for teens'
        },
        {
            'name': 'Trending Fabrics',
            'slug': 'trending-fabrics',
            'description': 'Trending fabric materials'
        },
        {
            'name': 'Trending Gele',
            'slug': 'trending-gele',
            'description': 'Trending gele and headwraps'
        },
        {
            'name': 'Sales & Offers',
            'slug': 'sales-offers',
            'description': 'Special sales and promotional items'
        }
    ]
    
    created_categories = {}
    
    for cat_data in trending_categories:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={
                'name': cat_data['name'],
                'description': cat_data['description']
            }
        )
        created_categories[cat_data['slug']] = category
        if created:
            print(f"✅ Created category: {category.name}")
        else:
            print(f"ℹ️  Category already exists: {category.name}")
    
    return created_categories

def create_trending_products(categories):
    print("\nCreating trending products...")
    
    # Get trending images
    trending_images_dir = 'media/products/trendingnow'
    if not os.path.exists(trending_images_dir):
        print(f"❌ Trending images directory not found: {trending_images_dir}")
        return
    
    trending_images = [f for f in os.listdir(trending_images_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    print(f"Found {len(trending_images)} trending images")
    
    # Create products for each category
    products_per_category = 5  # 5 products per category
    image_index = 0
    
    for slug, category in categories.items():
        if slug == 'sales-offers':
            continue  # Skip sales category for now
            
        print(f"\nCreating products for {category.name}...")
        
        for i in range(products_per_category):
            if image_index >= len(trending_images):
                print("⚠️  Ran out of images, stopping...")
                break
                
            image_name = trending_images[image_index]
            image_path = os.path.join(trending_images_dir, image_name)
            
            # Create product name
            category_short = category.name.replace('Trending ', '').lower()
            product_name = f"Trending {category_short.title()} Item {i + 1}"
            
            # Create product
            product, created = Product.objects.get_or_create(
                name=product_name,
                category=category,
                defaults={
                    'slug': f"trending-{category_short}-{i + 1}",
                    'description': f"Trending {category_short} fashion item. Premium quality and stylish design.",
                    'price': Decimal('149.99'),
                    'stock_quantity': 15,
                    'is_featured': True,  # Make trending products featured
                    'is_active': True
                }
            )
            
            if created:
                # Set the image
                with open(image_path, 'rb') as img_file:
                    product.image.save(image_name, File(img_file), save=True)
                print(f"✅ Created: {product.name} with image {image_name}")
            else:
                print(f"ℹ️  Product already exists: {product.name}")
            
            image_index += 1
    
    # Create some sales products
    print(f"\nCreating sales products...")
    sales_category = categories.get('sales-offers')
    if sales_category:
        for i in range(3):  # 3 sales products
            if image_index >= len(trending_images):
                break
                
            image_name = trending_images[image_index]
            image_path = os.path.join(trending_images_dir, image_name)
            
            product_name = f"Sale Item {i + 1}"
            
            product, created = Product.objects.get_or_create(
                name=product_name,
                category=sales_category,
                defaults={
                    'slug': f"sale-item-{i + 1}",
                    'description': f"Special sale item with discounted price. Limited time offer!",
                    'price': Decimal('199.99'),
                    'sale_price': Decimal('129.99'),  # 35% discount
                    'stock_quantity': 10,
                    'is_featured': True,
                    'is_active': True
                }
            )
            
            if created:
                with open(image_path, 'rb') as img_file:
                    product.image.save(image_name, File(img_file), save=True)
                print(f"✅ Created: {product.name} with image {image_name}")
            else:
                print(f"ℹ️  Product already exists: {product.name}")
            
            image_index += 1

def main():
    print("🚀 Setting up trending categories and products...")
    
    try:
        # Create categories
        categories = create_trending_categories()
        
        # Create products
        create_trending_products(categories)
        
        print("\n🎉 Trending categories and products setup complete!")
        
        # Show summary
        print("\n📊 Summary:")
        for slug, category in categories.items():
            product_count = Product.objects.filter(category=category).count()
            featured_count = Product.objects.filter(category=category, is_featured=True).count()
            print(f"- {category.name}: {product_count} products ({featured_count} featured)")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
