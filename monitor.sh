#!/bin/bash

echo "=== Funmitan Empire E-commerce Health Check ==="
echo "Date: $(date)"
echo ""

# Check PM2 processes
echo "�� PM2 Process Status:"
pm2 status
echo ""

# Check if services are responding
echo "🌐 Service Health Checks:"
echo -n "Frontend (port 3001): "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/ && echo " ✅" || echo " ❌"

echo -n "Backend API (port 8001): "
curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/api/v1/products/ && echo " ✅" || echo " ❌"

echo -n "Live Website: "
curl -s -o /dev/null -w "%{http_code}" https://funmitanempire.uk/ && echo " ✅" || echo " ❌"

echo -n "PayPal Endpoint: "
curl -s -o /dev/null -w "%{http_code}" https://funmitanempire.uk/api/v1/payments/create-order/ && echo " ✅" || echo " ❌"

echo ""

# Check disk space
echo "�� Disk Usage:"
df -h /var/www/funmitan
echo ""

# Check memory usage
echo "🧠 Memory Usage:"
free -h
echo ""

# Check recent logs for errors
echo "📋 Recent Backend Errors (last 5):"
pm2 logs django-backend --lines 5 --err 2>/dev/null | grep -i error || echo "No recent errors ✅"
echo ""

echo "�� Recent Frontend Errors (last 5):"
pm2 logs frontend --lines 5 --err 2>/dev/null | grep -i error || echo "No recent errors ✅"
echo ""

echo "=== Health Check Complete ==="
