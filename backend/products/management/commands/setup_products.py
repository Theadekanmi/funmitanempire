from django.core.management.base import BaseCommand
from django.core.files import File
from django.core.files.images import ImageFile
from products.models import Category, Product
import os
from pathlib import Path
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Set up products with real images from organized folders'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be created without actually creating products',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        
        # Define your product categories
        categories_data = {
            'women': {
                'name': 'Women',
                'description': 'Elegant and stylish fashion for women of all ages',
                'image_folder': 'women'
            },
            'men': {
                'name': 'Men',
                'description': 'Sophisticated and modern fashion for men',
                'image_folder': 'men'
            },
            'teens': {
                'name': 'Teens',
                'description': 'Trendy and fashionable clothing for teenagers',
                'image_folder': 'teens'
            },
            'gele': {
                'name': 'Gele & Headwraps',
                'description': 'Traditional and modern headwraps and gele',
                'image_folder': 'gele'
            },
            'fabrics': {
                'name': 'Fabrics & Materials',
                'description': 'Premium quality fabrics and materials for custom designs',
                'image_folder': 'fabrics'
            }
        }
        
        # Sample product data with better descriptions
        sample_products = {
            'women': [
                {
                    'name': 'Elegant Evening Dress',
                    'description': 'A stunning evening dress perfect for special occasions. Features elegant design with premium fabric.',
                    'price': 89.99,
                    'stock': 15
                },
                {
                    'name': 'Casual Summer Blouse',
                    'description': 'Comfortable and stylish summer blouse made from breathable cotton. Perfect for everyday wear.',
                    'price': 45.99,
                    'stock': 25
                },
                {
                    'name': 'Designer Handbag',
                    'description': 'Luxury designer handbag with premium leather and elegant design. Perfect accessory for any outfit.',
                    'price': 129.99,
                    'stock': 10
                },
                {
                    'name': 'Silk Scarf Collection',
                    'description': 'Beautiful silk scarves in various colors and patterns. Lightweight and perfect for any season.',
                    'price': 35.99,
                    'stock': 30
                }
            ],
            'men': [
                {
                    'name': 'Classic Business Suit',
                    'description': 'Professional business suit perfect for formal occasions. Made from premium wool blend.',
                    'price': 199.99,
                    'stock': 12
                },
                {
                    'name': 'Casual Cotton Shirt',
                    'description': 'Comfortable casual shirt made from 100% cotton. Perfect for everyday wear and casual events.',
                    'price': 39.99,
                    'stock': 35
                },
                {
                    'name': 'Premium Leather Belt',
                    'description': 'High-quality leather belt with classic buckle design. Perfect accessory for any outfit.',
                    'price': 49.99,
                    'stock': 20
                },
                {
                    'name': 'Designer Watch',
                    'description': 'Elegant designer watch with premium materials and sophisticated design.',
                    'price': 299.99,
                    'stock': 8
                }
            ],
            'teens': [
                {
                    'name': 'Trendy Graphic Tee',
                    'description': 'Cool graphic t-shirt with modern designs. Made from comfortable cotton blend.',
                    'price': 29.99,
                    'stock': 40
                },
                {
                    'name': 'Denim Jacket',
                    'description': 'Classic denim jacket perfect for layering. Durable and stylish for everyday wear.',
                    'price': 69.99,
                    'stock': 22
                },
                {
                    'name': 'Sneakers Collection',
                    'description': 'Comfortable and stylish sneakers perfect for casual wear and light activities.',
                    'price': 79.99,
                    'stock': 18
                },
                {
                    'name': 'Backpack Set',
                    'description': 'Practical and stylish backpack perfect for school or everyday use.',
                    'price': 55.99,
                    'stock': 25
                }
            ],
            'gele': [
                {
                    'name': 'Traditional Gele Set',
                    'description': 'Beautiful traditional gele headwrap made from premium fabric. Perfect for special occasions.',
                    'price': 45.99,
                    'stock': 20
                },
                {
                    'name': 'Premium Silk Gele',
                    'description': 'Luxury silk gele with elegant patterns. Lightweight and perfect for formal events.',
                    'price': 65.99,
                    'stock': 15
                },
                {
                    'name': 'Aso Oke Collection',
                    'description': 'Traditional Aso Oke gele made from handwoven fabric. Unique and cultural designs.',
                    'price': 85.99,
                    'stock': 12
                },
                {
                    'name': 'Embroidered Gele',
                    'description': 'Beautiful embroidered gele with intricate designs. Perfect for weddings and celebrations.',
                    'price': 75.99,
                    'stock': 18
                }
            ],
            'fabrics': [
                {
                    'name': 'Ankara Print Fabric',
                    'description': 'Vibrant Ankara print fabric perfect for custom designs. High-quality cotton blend.',
                    'price': 15.99,
                    'stock': 100
                },
                {
                    'name': 'Silk Blend Material',
                    'description': 'Premium silk blend fabric for luxury garments. Smooth texture and elegant drape.',
                    'price': 25.99,
                    'stock': 75
                },
                {
                    'name': 'Cotton Batik Print',
                    'description': 'Traditional batik print cotton fabric. Perfect for casual and formal wear.',
                    'price': 12.99,
                    'stock': 120
                },
                {
                    'name': 'Lace Fabric Premium',
                    'description': 'High-quality lace fabric for elegant designs. Perfect for special occasion garments.',
                    'price': 35.99,
                    'stock': 50
                }
            ]
        }
        
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No products will be created'))
        
        # Create categories and products
        for category_slug, category_data in categories_data.items():
            self.stdout.write(f"\n📁 Processing category: {category_data['name']}")
            
            # Create or get category
            category, created = Category.objects.get_or_create(
                slug=category_slug,
                defaults={
                    'name': category_data['name'],
                    'description': category_data['description']
                }
            )
            
            if created:
                self.stdout.write(f"✅ Created category: {category.name}")
            else:
                self.stdout.write(f"ℹ️  Category exists: {category.name}")
            
            # Get images from the category folder
            image_folder = Path(f"media/products/{category_data['image_folder']}")
            if not image_folder.exists():
                self.stdout.write(f"⚠️  Image folder not found: {image_folder}")
                continue
            
            # Get all image files
            image_files = []
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.heic']:
                image_files.extend(image_folder.glob(ext))
            
            self.stdout.write(f"📸 Found {len(image_files)} images in {category_data['image_folder']}")
            
            # Create products
            for i, product_data in enumerate(sample_products.get(category_slug, [])):
                if i < len(image_files):
                    image_file = image_files[i]
                    
                    if dry_run:
                        self.stdout.write(f"  📦 Would create: {product_data['name']} with image: {image_file.name}")
                    else:
                        # Create product
                        product, created = Product.objects.get_or_create(
                            slug=slugify(product_data['name']),
                            defaults={
                                'name': product_data['name'],
                                'category': category,
                                'description': product_data['description'],
                                'price': product_data['price'],
                                'stock_quantity': product_data['stock'],
                                'is_featured': i < 2,  # First 2 products are featured
                                'is_active': True
                            }
                        )
                        
                        if created:
                            # Add image to product
                            with open(image_file, 'rb') as f:
                                product.image.save(image_file.name, File(f), save=True)
                            
                            self.stdout.write(f"  ✅ Created: {product.name} (£{product.price})")
                        else:
                            self.stdout.write(f"  ℹ️  Product exists: {product.name}")
                else:
                    self.stdout.write(f"  ⚠️  No more images for: {product_data['name']}")
        
        if not dry_run:
            self.stdout.write(self.style.SUCCESS('\n🎉 Products setup completed!'))
        else:
            self.stdout.write(self.style.WARNING('\n🔍 Dry run completed. Use --dry-run to see what would be created.'))
