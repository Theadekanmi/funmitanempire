module.exports = {
  apps : [{
    name: 'backend',
    script: 'python',
    args: 'manage.py runserver 0.0.0.0:8001',
    cwd: '/var/www/funmitan/backend',
    env: {
      NODE_ENV: 'production',
      PAYPAL_CLIENT_ID: 'AQBtovYnxj_Trrc4QcaA_VfIPy1Lpg3iB8NLKD9iRtSIBodiJdH248JrMpFKHk9zY8k-Qb0iSQ9FOFAW',
      PAYPAL_CLIENT_SECRET: 'ELL6Y5ayHHADpsrp527MqRm9_t6GB-CNz3ymqjbUqRuf052JhWWFMmiDobVfGelFc80TAmTd56UbQEiX',
      PAYPAL_MODE: 'live',
      SECRET_KEY: '0lJGKGTAHdGCmZQA8h51hxCbRKt8iiwUooZIDjkXT80lyzKCy2X6aLyUka0wpxCoZV4',
      DEBUG: 'False'
    }
  }]
};
