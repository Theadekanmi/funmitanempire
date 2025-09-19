#!/bin/bash

echo "🔧 Funmitan Empire Maintenance Mode"
echo "==================================="
echo ""

echo "1. Checking PM2 status..."
pm2 status
echo ""

echo "2. Checking disk space..."
df -h /var/www/funmitan
echo ""

echo "3. Checking memory usage..."
free -h
echo ""

echo "4. Checking recent errors..."
echo "Backend errors (last 10):"
tail -10 /root/.pm2/logs/django-backend-error.log 2>/dev/null | grep ERROR || echo "No recent errors ✅"
echo ""

echo "5. Checking cron jobs..."
crontab -l | grep funmitan
echo ""

echo "6. Checking log files..."
ls -la /var/log/*funmitan* 2>/dev/null || echo "No monitoring logs yet"
echo ""

echo "✅ Maintenance check complete"
