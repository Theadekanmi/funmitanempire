import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from products.models import Category, Product
from django.utils.text import slugify

def create_all_women_products():
    print("Creating women category with ALL images, 10 featured...")
    
    # Get or create women category
    women_category, created = Category.objects.get_or_create(
        slug='women',
        defaults={
            'name': 'Women',
            'description': 'Fashion and accessories for women'
        }
    )
    
    # All women images (excluding MP4 videos)
    women_images = [
        'IMG_9377.jpg', 'IMG_9375.jpg', 'IMG_9381.jpg', 'IMG_9380.jpg', 'IMG_9383.jpg',
        'IMG_9379.jpg', 'IMG_9382.jpg', 'IMG_9378.jpg', 'IMG_8941.JPG', 'IMG_8937.JPG',
        'IMG_8936.JPG', 'IMG_8933.JPG', 'IMG_8930.JPG', 'IMG_8927.JPG', 'IMG_8926.JPG',
        'IMG_8924.JPG', 'IMG_8923.JPG', 'IMG_8922.JPG', 'IMG_8920.JPG', 'IMG_8915.JPG',
        'IMG_8914.JPG', 'IMG_8505.JPG', 'IMG_8399.JPG', 'IMG_8398.JPG', 'IMG_8395.JPG',
        'IMG_8394.JPG', 'IMG_7464.JPG', 'IMG_7462.JPG', 'IMG_6094.JPG', 'IMG_6093.JPG',
        'IMG_6092.JPG', 'IMG_6091.JPG', 'IMG_6090.JPG', 'IMG_6089.JPG', 'IMG_6088.JPG',
        'IMG_6087.JPG', 'IMG_6086.JPG', 'IMG_6085.JPG', 'IMG_6084.JPG', 'IMG_6083.JPG',
        'IMG_4767.JPG', 'IMG_2936.JPG', 'IMG_2935.JPG', 'IMG_2934.JPG', 'IMG_1828.JPG',
        'IMG_1592.JPG', 'IMG_1591.JPG', 'IMG_1590.JPG', 'IMG_1589.JPG', 'IMG_1588.JPG',
        'IMG_1587.JPG', 'IMG_1586.JPG', 'IMG_1585.JPG', 'IMG_1584.JPG', 'IMG_1570.JPG',
        'IMG_1569.JPG', 'IMG_1568.JPG', 'IMG_1567.JPG', 'IMG_1566.JPG', 'IMG_1565.JPG',
        'IMG_1564.JPG', 'IMG_1563.JPG', 'IMG_1562.JPG', 'IMG_1561.JPG', 'IMG_1560.JPG',
        'IMG_1559.JPG', 'IMG_1558.JPG', 'IMG_1557.JPG', 'IMG_1556.JPG', 'IMG_1554.JPG',
        'IMG_1545.JPG', 'IMG_1544.JPG', 'IMG_1543.JPG', 'IMG_1541.JPG', 'IMG_1540.JPG',
        'IMG_1538.JPG', 'IMG_1537.JPG', 'IMG_1536.JPG', 'IMG_1535.JPG', 'IMG_1534.JPG',
        'IMG_1533.JPG', 'IMG_1004.JPG', 'IMG_0999.JPG', 'IMG_0953.JPG', 'IMG_0952.JPG',
        'IMG_0951.JPG', 'IMG_0110.JPG'
    ]
    
    print(f"📸 Total images to upload: {len(women_images)}")
    
    # Create products for each image
    for i, image_name in enumerate(women_images):
        product_name = f"Women's Fashion Item {i+1:02d}"
        slug = slugify(f"womens-fashion-item-{i+1:02d}")
        
        image_path = f"products/women/{image_name}"
        
        # Only first 10 are featured
        is_featured = i < 10
        
        product = Product.objects.create(
            name=product_name,
            slug=slug,
            category=women_category,
            description=f"Beautiful fashion item for women. Premium quality and stylish design.",
            price=49.99 + (i * 2),
            stock_quantity=20,
            is_featured=is_featured,
            is_active=True,
            image=image_path
        )
        
        featured_status = "⭐ FEATURED" if is_featured else "📦 Regular"
        print(f"  ✅ Created: {product.name} - {featured_status} - Image: {image_path}")
    
    print(f"\n🎉 All women products created!")
    print(f"📊 Total women products: {Product.objects.filter(category__slug='women').count()}")
    print(f"⭐ Featured women products: {Product.objects.filter(category__slug='women', is_featured=True).count()}")

if __name__ == '__main__':
    create_all_women_products()
