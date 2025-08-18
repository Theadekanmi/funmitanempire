import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from products.models import Category, Product
from django.utils.text import slugify

def create_teens_properly():
    print("Creating teens category with all unique images...")
    
    # Get or create teens category
    teens_category, created = Category.objects.get_or_create(
        slug='teens',
        defaults={
            'name': 'Teens',
            'description': 'Fashion and accessories for teenagers'
        }
    )
    
    # All unique images from teens folder
    teens_images = [
        'IMG_6837.HEIC',  # Will convert to JPG
        'IMG_6805.HEIC',  # Will convert to JPG
        'IMG_6803.HEIC',  # Will convert to JPG
        'IMG_0979.JPG',   # Already JPG
        'IMG_0971.JPG',   # Already JPG
        'IMG_0970.JPG',   # Already JPG
        'IMG_0969.JPG'    # Already JPG
    ]
    
    # Create products for each unique image
    for i, image_name in enumerate(teens_images):
        product_name = f"Teen Fashion Item {i+1:02d}"
        slug = slugify(f"teen-fashion-item-{i+1:02d}")
        
        # For HEIC files, we'll use a placeholder JPG for now
        # In production, you should convert HEIC to JPG
        if image_name.endswith('.HEIC'):
            # Use a working JPG image instead of HEIC
            working_image = f"products/teens/IMG_097{i+1}.JPG" if i < 3 else f"products/teens/IMG_096{i+1}.JPG"
            print(f"  ⚠️  HEIC file {image_name} - using {working_image} instead")
            image_path = working_image
        else:
            image_path = f"products/teens/{image_name}"
        
        product = Product.objects.create(
            name=product_name,
            slug=slug,
            category=teens_category,
            description=f"Trendy fashion item for teens. Cool and stylish design.",
            price=39.99 + (i * 3),
            stock_quantity=18,
            is_featured=i < 2,  # First 2 are featured as requested
            is_active=True,
            image=image_path
        )
        print(f"  ✅ Created: {product.name} - Featured: {product.is_featured} - Image: {image_path}")
    
    print(f"\n🎉 Teens products created!")
    print(f"📊 Total teen products: {Product.objects.filter(category__slug='teens').count()}")
    print(f"⭐ Featured teen products: {Product.objects.filter(category__slug='teens', is_featured=True).count()}")

if __name__ == '__main__':
    create_teens_properly()
