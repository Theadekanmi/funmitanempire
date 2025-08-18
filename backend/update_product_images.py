#!/usr/bin/env python
import os
import django
import requests
from urllib.parse import urlparse

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from products.models import Product
from django.core.files.base import ContentFile

def add_sample_images():
    print("Adding sample images to products...")
    
    # Sample image URLs (you can replace with actual images)
    sample_images = {
        'fabrics': [
            'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80',  # Ankara fabric
            'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&q=80',  # Colorful fabrics
            'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=500&q=80',  # Traditional patterns
        ],
        'women': [
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80',  # Women's dress
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80',  # Elegant outfit
            'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80',    # Fashion
        ],
        'men': [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',  # Men's suit
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',  # Casual wear
        ],
        'teens': [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',  # Teen fashion
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80',  # Youth style
        ],
        'gele': [
            'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&q=80',  # Traditional gele
            'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80',  # African prints
        ]
    }
    
    products = Product.objects.all()
    
    for product in products:
        if not product.image:  # Only add image if product doesn't have one
            category_slug = product.category.slug
            
            if category_slug in sample_images:
                # Get random image for this category
                import random
                image_url = random.choice(sample_images[category_slug])
                
                try:
                    # Download image
                    response = requests.get(image_url, timeout=10)
                    if response.status_code == 200:
                        # Create filename
                        filename = f"{product.slug}.jpg"
                        
                        # Save image to product
                        product.image.save(
                            filename,
                            ContentFile(response.content),
                            save=True
                        )
                        print(f"✅ Added image to: {product.name}")
                    else:
                        print(f"❌ Failed to download image for: {product.name}")
                        
                except Exception as e:
                    print(f"❌ Error adding image to {product.name}: {str(e)}")
    
    print(f"\n🎉 Finished updating product images!")
    print(f"Products with images: {Product.objects.exclude(image='').count()}")

if __name__ == '__main__':
    add_sample_images()
