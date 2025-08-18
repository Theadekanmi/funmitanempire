from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    current_price = serializers.ReadOnlyField()
    on_sale = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'description', 
                  'price', 'sale_price', 'current_price', 'on_sale',
                  'image', 'stock_quantity', 'is_featured', 'is_active',
                  'created_at', 'updated_at']
