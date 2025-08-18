# Django Product Management - My Notes

## How My Images Are Organized

I keep my product images organized like this:
```
backend/media/products/
├── women/          # Women's fashion items
├── men/            # Men's fashion items  
├── teens/          # Teen fashion items
├── gele/           # Gele & Headwraps
├── fabrics/        # Fabrics & Materials
└── trendingnow/    # Trending products
```

## How I Set Up Products with Real Images

### Step 1: Run the Setup Command
```bash
cd backend
python manage.py setup_products
```

### Step 2: Test First (Dry Run)
```bash
python manage.py setup_products --dry-run
```

## How I'll Update Products After Hosting

### Option 1: Django Admin Panel (Easiest for me)

1. **Access Admin Panel**
   - Go to: `mystore.com/admin`
   - Login with my admin credentials

2. **Manage Categories**
   - Go to: Products → Categories
   - Add/Edit/Delete categories
   - Upload category images

3. **Manage Products**
   - Go to: Products → Products
   - Add new products
   - Edit existing products
   - Upload new images
   - Update prices and descriptions
   - Manage stock quantities

4. **Bulk Operations**
   - Select multiple products
   - Bulk edit status, prices, or categories
   - Bulk delete products

### Option 2: API Endpoints (If I need to programmatically add products)

1. **Product API Endpoints**
   ```
   GET    /api/v1/products/          # List all products
   POST   /api/v1/products/          # Create new product
   GET    /api/v1/products/{id}/     # Get specific product
   PUT    /api/v1/products/{id}/     # Update product
   DELETE /api/v1/products/{id}/     # Delete product
   ```

2. **Category API Endpoints**
   ```
   GET    /api/v1/categories/        # List all categories
   POST   /api/v1/categories/        # Create new category
   GET    /api/v1/categories/{id}/   # Get specific category
   PUT    /api/v1/categories/{id}/   # Update category
   DELETE /api/v1/categories/{id}/   # Delete category
   ```

### Option 3: Database Management (Advanced - only if needed)

1. **Direct Database Access**
   - Use Django shell: `python manage.py shell`
   - Import models and create/update products programmatically

2. **CSV Import/Export**
   - Export products to CSV
   - Edit in Excel/Google Sheets
   - Import back to database

3. **Bulk Image Upload**
   - Upload images to media folder
   - Update database records to reference new images

## Image Management - What I Need to Remember

### Image Requirements
- **Format**: JPG, PNG, HEIC (will be converted)
- **Size**: Recommended 800x800px minimum
- **File Size**: Keep under 2MB for web performance
- **Naming**: Use descriptive names (e.g., `elegant-evening-dress.jpg`)

### Image Organization
- Keep images organized by category
- Use consistent naming conventions
- Archive old images instead of deleting
