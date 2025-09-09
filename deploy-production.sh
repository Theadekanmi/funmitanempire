#!/bin/bash

# Production Deployment Script for Funmitan Empire E-commerce
# Run this script on your production server via Putty

echo "🚀 Starting Production Deployment..."

# 1. Navigate to project directory
cd /path/to/your/project/funmitanempirelimited-ecommerce

# 2. Pull latest changes from Git
echo "📥 Pulling latest changes..."
git pull origin main

# 3. Backend Deployment
echo "🔧 Deploying Backend..."

# Navigate to backend directory
cd backend

# Install/update Python dependencies
pip install -r requirements.txt

# Set production environment variables
export DEBUG=False
export PAYPAL_MODE=live
export PAYPAL_CLIENT_ID=AQBtovYnxj_Trrc4QcaA_VfIPy1Lpg3iB8NLKD9iRtSIBodiJdH248JrMpFKHk9zY8k-Qb0iSQ9FOFAW
export PAYPAL_CLIENT_SECRET=ELL6Y5ayHHADpsrp527MqRm9_t6GB-CNz3ymqjbUqRuf052JhWWFMmiDobVfGelFc80TAmTd56UbQEiX
export PAYPAL_WEBHOOK_ID=9145334871911082N

# Run database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Restart backend service (adjust service name as needed)
sudo systemctl restart your-django-service
# OR if using supervisor:
# sudo supervisorctl restart your-django-app

echo "✅ Backend deployment completed!"

# 4. Frontend Deployment
echo "🎨 Deploying Frontend..."

# Navigate to frontend directory
cd ..

# Install/update Node.js dependencies
npm install

# Set production environment variables
export NEXT_PUBLIC_BACKEND_URL=https://funmitanempire.uk
export NEXT_PUBLIC_PAYPAL_CLIENT_ID=AQBtovYnxj_Trrc4QcaA_VfIPy1Lpg3iB8NLKD9iRtSIBodiJdH248JrMpFKHk9zY8k-Qb0iSQ9FOFAW
export NODE_ENV=production

# Build the frontend for production
npm run build

# Restart frontend service (adjust service name as needed)
sudo systemctl restart your-nextjs-service
# OR if using PM2:
# pm2 restart your-nextjs-app

echo "✅ Frontend deployment completed!"

# 5. Verify deployment
echo "🔍 Verifying deployment..."

# Check if services are running
sudo systemctl status your-django-service
sudo systemctl status your-nextjs-service

echo "🎉 Production deployment completed successfully!"
echo "🌐 Your site should now be live at: https://funmitanempire.uk"

