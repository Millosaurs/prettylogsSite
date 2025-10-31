# Deployment Guide

This guide covers deploying the PrettyLogs website to various platforms.

## Build Configuration

The site is built using React Router v7 with server-side rendering support.

### Environment Variables

No environment variables are required for basic deployment.

## Deployment Options

### 1. Vercel (Recommended)

Vercel has native support for React Router v7.

**Steps:**

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Vercel will auto-detect React Router
4. Deploy!

**Custom Configuration** (if needed):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build/client",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 2. Netlify

**netlify.toml:**

```toml
[build]
  command = "npm run build"
  publish = "build/client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Docker

A Dockerfile is included in the project.

```bash
# Build image
docker build -t prettylogs-website .

# Run container
docker run -p 3000:3000 prettylogs-website
```

**Docker Compose:**

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### 4. Static Hosting (GitHub Pages, Cloudflare Pages)

For static-only deployment:

1. Update `react-router.config.ts` to set `ssr: false`
2. Build: `npm run build`
3. Deploy `build/client` directory

### 5. Node.js Server

For self-hosted deployment:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

**PM2 Configuration:**

```json
{
  "apps": [{
    "name": "prettylogs-website",
    "script": "./build/server/index.js",
    "instances": "max",
    "exec_mode": "cluster",
    "env": {
      "NODE_ENV": "production",
      "PORT": 3000
    }
  }]
}
```

Start with PM2:

```bash
pm2 start ecosystem.config.json
```

### 6. Fly.io

**fly.toml:**

```toml
app = "prettylogs-website"
primary_region = "iad"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

Deploy:

```bash
fly launch
fly deploy
```

### 7. Railway

1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Deploy!

## Pre-Deployment Checklist

- [ ] Update package.json version
- [ ] Run `npm run build` locally to verify
- [ ] Test production build: `npm start`
- [ ] Check all links are working
- [ ] Verify meta tags for SEO
- [ ] Test responsive design
- [ ] Add real screenshots (replace placeholders)
- [ ] Update GitHub repository URL if forked
- [ ] Configure custom domain (if applicable)
- [ ] Set up analytics (optional)
- [ ] Configure error monitoring (optional)

## Performance Optimization

### 1. Enable Compression

Most platforms enable gzip/brotli automatically. For Node.js:

```javascript
import compression from 'compression';
app.use(compression());
```

### 2. Add Caching Headers

Configure your hosting platform to cache static assets:

```
Cache-Control: public, max-age=31536000, immutable
```

### 3. CDN Integration

Consider using a CDN for static assets:
- Cloudflare
- AWS CloudFront
- Fastly

### 4. Image Optimization

If adding screenshots:
- Use WebP format
- Optimize with tools like Sharp or ImageOptim
- Consider lazy loading

## Monitoring

### Recommended Tools

- **Uptime**: UptimeRobot, Pingdom
- **Analytics**: Plausible, Simple Analytics (privacy-friendly)
- **Error Tracking**: Sentry
- **Performance**: Lighthouse CI, WebPageTest

### Health Check Endpoint

Add a health check route for monitoring:

```typescript
// app/routes/health.tsx
export async function loader() {
  return new Response("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
```

## SSL/TLS

Most platforms provide free SSL certificates automatically:
- Vercel: Automatic
- Netlify: Automatic
- Fly.io: Automatic
- Railway: Automatic

For self-hosted, use Let's Encrypt with certbot.

## Custom Domain

1. Add domain in hosting platform dashboard
2. Update DNS records:
   - **A Record**: Point to platform IP
   - **CNAME**: Point www to main domain
3. Wait for DNS propagation (up to 48 hours)
4. Enable SSL certificate

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf node_modules .react-router
npm install
npm run build
```

### Runtime Errors

Check server logs:
- Vercel: Vercel dashboard → Logs
- Railway: Railway dashboard → Deployments
- Docker: `docker logs <container-id>`

### 404 Errors

Ensure proper redirects are configured for single-page application routing.

## Rolling Back

Most platforms support instant rollback:
- Vercel: Deployments → Previous deployment → Promote
- Netlify: Deploys → Previous deploy → Publish deploy
- Railway: Deployments → Previous deployment → Redeploy

## Support

For deployment issues:
- [React Router Deployment Docs](https://reactrouter.com/start/framework/deployment)
- [Platform-specific documentation](#deployment-options)
- [GitHub Issues](https://github.com/Millosaurs/prettylogs/issues)

---

**Last Updated**: October 2024