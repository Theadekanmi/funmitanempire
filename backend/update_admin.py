#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def update_admin():
    print("Updating admin user...")
    
    # Delete old admin if exists
    User.objects.filter(email='admin@funmitanempire.com').delete()
    
    # Create new admin
    admin = User.objects.create_superuser(
        username='admin',
        email='funmitanempire@gmail.com',
        password='Funmitan@0809'
    )
    admin.first_name = 'Funmitan'
    admin.last_name = 'Empire'
    admin.save()
    
    print(f"✅ Admin user updated:")
    print(f"   Email: {admin.email}")
    print(f"   Password: Funmitan@0809")

if __name__ == '__main__':
    update_admin()
