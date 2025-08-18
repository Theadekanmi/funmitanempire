from django.core.management.base import BaseCommand
from django.core.files import File
from products.models import Product
from pathlib import Path


class Command(BaseCommand):
    help = 'Fix product images by properly setting them with actual image files'

    def handle(self, *args, **options):
        self.stdout.write("🔧 Fixing product images...")
        
        # Fix women products
        women_products = Product.objects.filter(category__slug='women')
        self.stdout.write(f"👗 Fixing {women_products.count()} women products...")
        
        for product in women_products:
            # Extract filename from current image path
            if product.image:
                filename = product.image.name.split('/')[-1]
                image_path = Path(f"media/products/women/{filename}")
                
                if image_path.exists():
                    with open(image_path, 'rb') as f:
                        product.image.save(filename, File(f), save=True)
                    self.stdout.write(f"  ✅ Fixed: {product.name}")
                else:
                    self.stdout.write(f"  ❌ Image not found: {filename}")
        
        # Fix men products
        men_products = Product.objects.filter(category__slug='men')
        self.stdout.write(f"\n👔 Fixing {men_products.count()} men products...")
        
        for product in men_products:
            if product.image:
                filename = product.image.name.split('/')[-1]
                image_path = Path(f"media/products/men/{filename}")
                
                if image_path.exists():
                    with open(image_path, 'rb') as f:
                        product.image.save(filename, File(f), save=True)
                    self.stdout.write(f"  ✅ Fixed: {product.name}")
                else:
                    self.stdout.write(f"  ❌ Image not found: {filename}")
        
        # Fix teens products
        teen_products = Product.objects.filter(category__slug='teens')
        self.stdout.write(f"\n👧 Fixing {teen_products.count()} teens products...")
        
        for product in teen_products:
            if product.image:
                filename = product.image.name.split('/')[-1]
                image_path = Path(f"media/products/teens/{filename}")
                
                if image_path.exists():
                    with open(image_path, 'rb') as f:
                        product.image.save(filename, File(f), save=True)
                    self.stdout.write(f"  ✅ Fixed: {product.name}")
                else:
                    self.stdout.write(f"  ❌ Image not found: {filename}")
        
        # Fix gele products
        gele_products = Product.objects.filter(category__slug='gele')
        self.stdout.write(f"\n👑 Fixing {gele_products.count()} gele products...")
        
        for product in gele_products:
            if product.image:
                filename = product.image.name.split('/')[-1]
                image_path = Path(f"media/products/gele/{filename}")
                
                if image_path.exists():
                    with open(image_path, 'rb') as f:
                        product.image.save(filename, File(f), save=True)
                    self.stdout.write(f"  ✅ Fixed: {product.name}")
                else:
                    self.stdout.write(f"  ❌ Image not found: {filename}")
        
        # Fix fabric products
        fabric_products = Product.objects.filter(category__slug='fabrics')
        self.stdout.write(f"\n🧵 Fixing {fabric_products.count()} fabric products...")
        
        for product in fabric_products:
            if product.image:
                filename = product.image.name.split('/')[-1]
                image_path = Path(f"media/products/fabrics/{filename}")
                
                if image_path.exists():
                    with open(image_path, 'rb') as f:
                        product.image.save(filename, File(f), save=True)
                    self.stdout.write(f"  ✅ Fixed: {product.name}")
                else:
                    self.stdout.write(f"  ❌ Image not found: {filename}")
        
        self.stdout.write(self.style.SUCCESS("\n🎉 Image fixing completed!"))
        
        # Check featured products
        featured_products = Product.objects.filter(is_featured=True)
        self.stdout.write(f"\n🏠 Featured Products Summary:")
        self.stdout.write(f"  👗 Women: {Product.objects.filter(category__slug='women', is_featured=True).count()}")
        self.stdout.write(f"  👔 Men: {Product.objects.filter(category__slug='men', is_featured=True).count()}")
        self.stdout.write(f"  👑 Gele: {Product.objects.filter(category__slug='gele', is_featured=True).count()}")
        self.stdout.write(f"  🧵 Fabrics: {Product.objects.filter(category__slug='fabrics', is_featured=True).count()}")
        self.stdout.write(f"  👧 Teens: {Product.objects.filter(category__slug='teens', is_featured=True).count()}")
