#!/bin/bash

BACKUP_DIR="/var/backups/funmitan"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

echo "Starting backup: $DATE"

# Backup database
echo "Backing up database..."
cd /var/www/funmitan/backend
python3 manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission > $BACKUP_DIR/database_$DATE.json

# Backup media files
echo "Backing up media files..."
tar -czf $BACKUP_DIR/media_$DATE.tar.gz -C /var/www/funmitan/backend media/

# Backup configuration
echo "Backing up configuration..."
tar -czf $BACKUP_DIR/config_$DATE.tar.gz /etc/nginx/sites-available/funmitanempire.uk /var/www/funmitan/backend/.env /var/www/funmitan/backend/ecosystem.config.js

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "*.json" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
