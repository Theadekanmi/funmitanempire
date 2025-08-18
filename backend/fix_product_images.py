#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from products.models import Product
from products.serializers import ProductSerializer

def fix_product_images():
    print("🔧 Fixing Product Images Issue...")
    
    # Check products
    products = Product.objects.all()[:5]  # Check first 5
    
    for product in products:
        print(f"\n📦 Product: {product.name}")
        print(f"   Category: {product.category.name}")
        print(f"   Image field: {product.image}")
        
        if product.image:
            print(f"   Image URL: {product.image.url}")
            print(f"   Image name: {product.image.name}")
        else:
            print("   ❌ No image!")
    
    # Test serializer output
    print(f"\n🔍 Testing API Serializer Output:")
    product = products.first()
    serializer = ProductSerializer(product)
    data = serializer.data
    
    print(f"   API Response Image: {data.get('image')}")
    print(f"   API Response Name: {data.get('name')}")
    print(f"   API Response Category: {data.get('category')}")
    
    print(f"\n📊 Total products: {Product.objects.count()}")
    print(f"📊 Products with images: {Product.objects.exclude(image='').count()}")
    
    # Check if media files exist
    import os
    media_dir = os.path.join(os.path.dirname(__file__), 'media', 'products')
    print(f"\n📁 Media directory: {media_dir}")
    print(f"📁 Media directory exists: {os.path.exists(media_dir)}")
    
    if os.path.exists(media_dir):
        files = os.listdir(media_dir)
        print(f"📁 Files in media/products: {len(files)}")
        for f in files[:5]:  # Show first 5 files
            print(f"   - {f}")

if __name__ == '__main__':
    fix_product_images()
