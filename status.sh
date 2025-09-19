#!/bin/bash
echo "�� Funmitan Empire Quick Status"
echo "================================"
echo "PM2 Status:"
pm2 status
echo ""
echo "Website Status:"
curl -s -o /dev/null -w "Frontend: %{http_code}\n" https://funmitanempire.uk/
curl -s -o /dev/null -w "API: %{http_code}\n" https://funmitanempire.uk/api/v1/products/
curl -s -o /dev/null -w "PayPal: %{http_code}\n" https://funmitanempire.uk/api/v1/payments/create-order/
echo ""
echo "System Resources:"
echo "Memory: $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $3"/"$2" ("$5")"}')"
echo "================================"
