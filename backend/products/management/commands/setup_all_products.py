from django.core.management.base import BaseCommand
from django.core.files import File
from products.models import Category, Product
from pathlib import Path
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Create products for ALL images and set correct featured products'

    def handle(self, *args, **options):
        # First, clear all existing products
        self.stdout.write("🧹 Clearing existing products...")
        Product.objects.all().delete()
        Category.objects.all().delete()
        
        # Create categories
        categories = {
            'women': 'Women',
            'men': 'Men', 
            'teens': 'Teens',
            'gele': 'Gele & Headwraps',
            'fabrics': 'Fabrics & Materials'
        }
        
        created_categories = {}
        for slug, name in categories.items():
            category = Category.objects.create(
                slug=slug,
                name=name,
                description=f'Fashion and accessories for {name.lower()}'
            )
            created_categories[slug] = category
            self.stdout.write(f"✅ Created category: {name}")
        
        # Create products for ALL women images
        self.stdout.write("\n👗 Creating products for ALL women images...")
        women_images = list(Path('media/products/women').glob('*.jpg')) + \
                      list(Path('media/products/women').glob('*.jpeg')) + \
                      list(Path('media/products/women').glob('*.png')) + \
                      list(Path('media/products/women').glob('*.heic'))
        
        women_products = []
        for i, img in enumerate(women_images):
            product_name = f"Women's Fashion Item {i+1:02d}"
            product = Product.objects.create(
                name=product_name,
                slug=slugify(f"womens-fashion-item-{i+1:02d}"),
                category=created_categories['women'],
                description=f"Beautiful fashion item for women. Premium quality and stylish design.",
                price=49.99 + (i * 5),  # Varying prices
                stock_quantity=20,
                is_featured=i < 10,  # First 10 are featured
                is_active=True
            )
            
            # Add image
            with open(img, 'rb') as f:
                product.image.save(img.name, File(f), save=True)
            
            women_products.append(product)
            self.stdout.write(f"  ✅ Created: {product.name} (£{product.price}) - Featured: {product.is_featured}")
        
        # Create products for men (1 featured)
        self.stdout.write("\n👔 Creating men's products...")
        men_images = list(Path('media/products/men').glob('*.jpg')) + \
                    list(Path('media/products/men').glob('*.jpeg')) + \
                    list(Path('media/products/men').glob('*.png')) + \
                    list(Path('media/products/men').glob('*.heic'))
        
        for i, img in enumerate(men_images):
            product_name = f"Men's Fashion Item {i+1:02d}"
            product = Product.objects.create(
                name=product_name,
                slug=slugify(f"mens-fashion-item-{i+1:02d}"),
                category=created_categories['men'],
                description=f"Sophisticated fashion item for men. Premium quality and modern design.",
                price=79.99 + (i * 10),
                stock_quantity=15,
                is_featured=i == 0,  # Only first one is featured
                is_active=True
            )
            
            with open(img, 'rb') as f:
                product.image.save(img.name, File(f), save=True)
            
            self.stdout.write(f"  ✅ Created: {product.name} (£{product.price}) - Featured: {product.is_featured}")
        
        # Create products for teens (2 featured)
        self.stdout.write("\n👧 Creating teens' products...")
        teen_images = list(Path('media/products/teens').glob('*.jpg')) + \
                     list(Path('media/products/teens').glob('*.jpeg')) + \
                     list(Path('media/products/teens').glob('*.png')) + \
                     list(Path('media/products/teens').glob('*.heic'))
        
        for i, img in enumerate(teen_images):
            product_name = f"Teen Fashion Item {i+1:02d}"
            product = Product.objects.create(
                name=product_name,
                slug=slugify(f"teen-fashion-item-{i+1:02d}"),
                category=created_categories['teens'],
                description=f"Trendy fashion item for teenagers. Cool and comfortable design.",
                price=29.99 + (i * 8),
                stock_quantity=25,
                is_featured=i < 2,  # First 2 are featured
                is_active=True
            )
            
            with open(img, 'rb') as f:
                product.image.save(img.name, File(f), save=True)
            
            self.stdout.write(f"  ✅ Created: {product.name} (£{product.price}) - Featured: {product.is_featured}")
        
        # Create products for gele (2 featured)
        self.stdout.write("\n👑 Creating gele products...")
        gele_images = list(Path('media/products/gele').glob('*.jpg')) + \
                     list(Path('media/products/gele').glob('*.jpeg')) + \
                     list(Path('media/products/gele').glob('*.png')) + \
                     list(Path('media/products/gele').glob('*.heic'))
        
        for i, img in enumerate(gele_images):
            product_name = f"Gele Collection {i+1:02d}"
            product = Product.objects.create(
                name=product_name,
                slug=slugify(f"gele-collection-{i+1:02d}"),
                category=created_categories['gele'],
                description=f"Beautiful traditional gele headwrap. Perfect for special occasions.",
                price=45.99 + (i * 15),
                stock_quantity=18,
                is_featured=i < 2,  # First 2 are featured
                is_active=True
            )
            
            with open(img, 'rb') as f:
                product.image.save(img.name, File(f), save=True)
            
            self.stdout.write(f"  ✅ Created: {product.name} (£{product.price}) - Featured: {product.is_featured}")
        
        # Create products for fabrics (1 featured)
        self.stdout.write("\n🧵 Creating fabric products...")
        fabric_images = list(Path('media/products/fabrics').glob('*.jpg')) + \
                       list(Path('media/products/fabrics').glob('*.jpeg')) + \
                       list(Path('media/products/fabrics').glob('*.png')) + \
                       list(Path('media/products/fabrics').glob('*.heic'))
        
        for i, img in enumerate(fabric_images):
            product_name = f"Premium Fabric {i+1:02d}"
            product = Product.objects.create(
                name=product_name,
                slug=slugify(f"premium-fabric-{i+1:02d}"),
                category=created_categories['fabrics'],
                description=f"High-quality fabric for custom designs. Perfect for sewing projects.",
                price=15.99 + (i * 5),
                stock_quantity=100,
                is_featured=i == 0,  # Only first one is featured
                is_active=True
            )
            
            with open(img, 'rb') as f:
                product.image.save(img.name, File(f), save=True)
            
            self.stdout.write(f"  ✅ Created: {product.name} (£{product.price}) - Featured: {product.is_featured}")
        
        # Summary
        total_products = Product.objects.count()
        featured_products = Product.objects.filter(is_featured=True).count()
        
        self.stdout.write(self.style.SUCCESS(f"\n🎉 Setup completed!"))
        self.stdout.write(f"📊 Total products created: {total_products}")
        self.stdout.write(f"⭐ Featured products: {featured_products}")
        self.stdout.write(f"👗 Women products: {len(women_products)}")
        self.stdout.write(f"👔 Men products: {Product.objects.filter(category__slug='men').count()}")
        self.stdout.write(f"👧 Teens products: {Product.objects.filter(category__slug='teens').count()}")
        self.stdout.write(f"👑 Gele products: {Product.objects.filter(category__slug='gele').count()}")
        self.stdout.write(f"🧵 Fabric products: {Product.objects.filter(category__slug='fabrics').count()}")
