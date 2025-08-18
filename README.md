# Funmitan Empire E-commerce

My e-commerce site for African fashion, fabrics, and gele. Built with Next.js frontend and Django backend.

## What I Built

- **Frontend**: Next.js app with shopping cart, user accounts, and product browsing
- **Backend**: Django API for products, orders, and user management
- **Features**: Trending products, category browsing, search, cart, orders
- **Design**: Mobile-responsive with Tailwind CSS

## How to Run Locally

### Frontend
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
# API runs on http://127.0.0.1:8000
```

## What's Working

- ✅ Homepage with featured products
- ✅ Product categories (women, men, teens, fabrics, gele)
- ✅ Trending products page with pagination
- ✅ Shopping cart functionality
- ✅ User registration and login
- ✅ Order creation and management
- ✅ Product search and filtering
- ✅ Mobile responsive design

## Database

- **SQLite** for development (will switch to PostgreSQL for production)
- **Models**: Products, Categories, Users, Orders, Cart
- **Admin panel**: http://127.0.0.1:8000/admin

## Next Steps

- Deploy to Namecheap VPS
- Set up production database
- Configure domain and SSL
- Test everything works online

## Notes for Me

- All images are stored in `backend/media/products/`
- Trending products are in `trendingnow/` folder
- Cart uses localStorage for anonymous users
- Orders send confirmation emails automatically
- Shipping calculated based on UK postcodes (Manchester free, mainland £50+ free)
