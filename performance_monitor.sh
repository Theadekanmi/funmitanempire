#!/bin/bash

echo "=== Performance Monitor ==="
echo "Date: $(date)"
echo ""

# Check response times
echo "�� Response Times:"
echo -n "Frontend: "
curl -s -o /dev/null -w "%{time_total}s" https://funmitanempire.uk/ && echo ""

echo -n "API: "
curl -s -o /dev/null -w "%{time_total}s" https://funmitanempire.uk/api/v1/products/ && echo ""

echo -n "PayPal Endpoint: "
curl -s -o /dev/null -w "%{time_total}s" https://funmitanempire.uk/api/v1/payments/create-order/ && echo ""

echo ""

# Check active connections
echo "�� Active Connections:"
netstat -an | grep :443 | wc -l | xargs echo "HTTPS connections:"
netstat -an | grep :3001 | wc -l | xargs echo "Frontend connections:"
netstat -an | grep :8001 | wc -l | xargs echo "Backend connections:"

echo ""

# Check error rates
echo "📊 Error Rates (last 24h):"
grep -c "ERROR" /root/.pm2/logs/django-backend-error.log 2>/dev/null | xargs echo "Backend errors:" || echo "Backend errors: 0"
grep -c "ERROR" /root/.pm2/logs/frontend-error.log 2>/dev/null | xargs echo "Frontend errors:" || echo "Frontend errors: 0"

echo ""
echo "=== Performance Check Complete ==="
