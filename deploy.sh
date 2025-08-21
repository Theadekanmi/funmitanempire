#!/bin/bash
cd /var/www/funmitan
git pull origin main
npm run build
pm2 restart funmitan
echo "Deployment complete!"
