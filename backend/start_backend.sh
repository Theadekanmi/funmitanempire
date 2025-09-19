#!/bin/bash
export PAYPAL_CLIENT_ID="AQBtovYnxj_Trrc4QcaA_VfIPy1Lpg3iB8NLKD9iRtSIBodiJdH248JrMpFKHk9zY8k-Qb0iSQ9FOFAW"
export PAYPAL_CLIENT_SECRET="ELL6Y5ayHHADpsrp527MqRm9_t6GB-CNz3ymqjbUqRuf052JhWWFMmiDobVfGelFc80TAmTd56UbQEiX"
export PAYPAL_MODE="live"
export SECRET_KEY="0lJGKGTAHdGCmZQA8h51hxCbRKt8iiwUooZIDjkXT80lyzKCy2X6aLyUka0wpxCoZV4"
export PAYPAL_WEBHOOK_ID="9145334871911082N"
cd /var/www/funmitan/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8001
