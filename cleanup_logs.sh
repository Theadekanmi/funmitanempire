#!/bin/bash

echo "=== Log Cleanup ==="
echo "Date: $(date)"
echo ""

# Clean old PM2 logs
echo "🧹 Cleaning PM2 logs..."
pm2 flush

# Clean system logs older than 7 days
echo "🧹 Cleaning system logs..."
find /var/log -name "*.log" -mtime +7 -delete 2>/dev/null
find /var/log -name "*.gz" -mtime +30 -delete 2>/dev/null

# Clean backup logs
echo "�� Cleaning backup logs..."
find /var/log -name "*funmitan*" -mtime +30 -delete 2>/dev/null

echo "✅ Log cleanup completed"
