## Server Setup Instructions

1. Server Requirements:
   - Ubuntu 20.04 or later
   - Node.js 18.x or later
   - Nginx
   - PM2 (for process management)

2. Install Dependencies:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

3. Create Server Directory:
```bash
mkdir -p /var/www/songbirdstrategies
cd /var/www/songbirdstrategies
```

4. Set Up Environment Variables:
Create `/var/www/songbirdstrategies/songbird-server/.env`:
```
PORT=3001
OPENAI_API_KEY=your_openai_key
FRONTEND_URL=https://songbirdstrategies.io
```

5. Start Server with PM2:
```bash
cd /var/www/songbirdstrategies/songbird-server
npm install
npm run build
pm2 start dist/index.js --name songbird-api
pm2 save
pm2 startup
```

## Nginx Configuration

1. Create Nginx Configuration:
Create `/etc/nginx/sites-available/songbirdstrategies.io`:
```nginx
# API Configuration
server {
    listen 80;
    server_name api.songbirdstrategies.io;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' 'https://songbirdstrategies.io';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://songbirdstrategies.io';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }

    # SSL configuration
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/api.songbirdstrategies.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.songbirdstrategies.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# Frontend Configuration
server {
    listen 80;
    server_name songbirdstrategies.io www.songbirdstrategies.io;

    root /var/www/songbirdstrategies/frontend/.next/static;
    index index.html;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # SSL configuration
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/songbirdstrategies.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/songbirdstrategies.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

2. Enable Sites and Restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/songbirdstrategies.io /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

3. Set Up SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d songbirdstrategies.io -d www.songbirdstrategies.io -d api.songbirdstrategies.io
```

## Deployment Instructions

1. Deploy Frontend:
```bash
cd /var/www/songbirdstrategies/frontend
npm install
npm run build
pm2 start npm --name songbird-frontend -- start
pm2 save
```

2. Update Environment Variables:
Update `/var/www/songbirdstrategies/frontend/.env`:
```
NEXT_PUBLIC_API_URL=https://api.songbirdstrategies.io
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

3. Verify Deployment:
- Frontend: https://songbirdstrategies.io
- API: https://api.songbirdstrategies.io/health