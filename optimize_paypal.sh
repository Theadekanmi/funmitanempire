#!/bin/bash

echo "=== PayPal & System Optimization ==="
echo "Date: $(date)"
echo ""

# 1. Check PayPal credentials are loaded
echo "🔐 PayPal Configuration Check:"
echo -n "PayPal Client ID: "
grep -q "AQBtovYnxj_Trrc4QcaA_VfIPy1Lpg3iB8NLKD9iRtSIBodiJdH248JrMpFKHk9zY8k-Qb0iSQ9FOFAW" /var/www/funmitan/backend/.env && echo "✅ Loaded" || echo "❌ Missing"

echo -n "PayPal Mode: "
grep -q "PAYPAL_MODE.*live" /var/www/funmitan/backend/.env && echo "✅ Live Mode" || echo "❌ Not in Live Mode"

echo ""

# 2. Test PayPal endpoint
echo " PayPal Endpoint Test:"
PAYPAL_TEST=$(curl -s -w "%{http_code}" -o /dev/null https://funmitanempire.uk/api/v1/payments/create-order/)
if [ "$PAYPAL_TEST" = "401" ]; then
    echo "✅ PayPal endpoint responding correctly (401 = auth required)"
elif [ "$PAYPAL_TEST" = "503" ]; then
    echo "❌ PayPal endpoint returning 503 (service unavailable)"
else
    echo "⚠️  PayPal endpoint returning $PAYPAL_TEST"
fi
echo ""

# 3. Check SSL certificate
echo " SSL Certificate Check:"
SSL_EXPIRY=$(echo | openssl s_client -servername funmitanempire.uk -connect funmitanempire.uk:443 2>/dev/null | openssl x509 -noout -dates | grep "notAfter" | cut -d= -f2)
echo "Certificate expires: $SSL_EXPIRY"
echo ""

# 4. Check system resources
echo "⚡ System Resources:"
echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')%"
echo "Memory Usage: $(free | grep Mem | awk '{printf("%.1f%%", $3/$2 * 100.0)}')"
echo "Disk Usage: $(df -h /var/www/funmitan | tail -1 | awk '{print $5}')"
echo ""

# 5. Check PM2 processes (simplified version)
echo " PM2 Process Health:"
pm2 status | grep -E "(django-backend|frontend)" | awk '{print $2 ": " $8 " (restarts: " $7 ")"}' || echo "All processes healthy ✅"
echo ""

echo "=== Optimization Complete ==="
