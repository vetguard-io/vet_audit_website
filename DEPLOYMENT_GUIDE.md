# VetGuard.io Website - Deployment Guide

## Quick Start (5 minutes)

### Option 1: Deploy to Vercel (Recommended)

Vercel is the official Next.js hosting platform. Deployment is free and takes 5 minutes.

#### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

#### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VetGuard website"
   git remote add origin https://github.com/yourusername/vetguard-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure it
   - Click "Deploy"

3. **Point your domain**
   - In Vercel project settings, go to Domains
   - Add `vetguard.io`
   - Follow the DNS instructions for your registrar (Hostinger)

**That's it!** Your site is live.

---

### Option 2: Deploy to Netlify

Alternative to Vercel with similar performance.

1. **Push to GitHub** (same as above)

2. **Connect to Netlify**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Click "Deploy"

3. **Point your domain**
   - In Netlify site settings, go to Custom domain
   - Add `vetguard.io`
   - Follow DNS instructions

---

### Option 3: Deploy to your own server

For advanced users who want full control.

#### Prerequisites
- Linux server (AWS, DigitalOcean, etc.)
- Node.js 18+ installed
- npm or yarn
- Nginx or Apache configured
- SSL certificate (Let's Encrypt)

#### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/vetguard-website.git
   cd vetguard-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Use PM2 for process management** (recommended)
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name vetguard
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx reverse proxy**
   ```nginx
   server {
     listen 80;
     server_name vetguard.io www.vetguard.io;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d vetguard.io -d www.vetguard.io
   ```

---

## Local Development

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/vetguard-website.git
   cd vetguard-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### File Structure

```
vetguard-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── api/                # API routes (optional)
├── components/
│   ├── Navigation.tsx      # Header navigation
│   ├── HeroSection.tsx     # Hero section
│   ├── ProblemSection.tsx  # Problem section
│   ├── HowItWorksSection.tsx
│   ├── FeaturesSection.tsx
│   ├── SocialProofSection.tsx
│   ├── PricingPreview.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx          # Footer
├── public/                 # Static assets (images, fonts)
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Configuration

### Environment Variables

Create a `.env.local` file for development:

```bash
# API endpoints
NEXT_PUBLIC_API_URL=https://api.vetguard.io

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Calendly (for CTA links)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourusername

# Email (for contact form)
NEXT_PUBLIC_EMAIL_ADDRESS=hello@vetguard.io
```

For production, set these in your hosting platform (Vercel, Netlify, etc.).

---

## Customization

### Update company information

Edit these files:
- `app/layout.tsx` - metadata, title, description
- `components/Navigation.tsx` - logo, links
- `components/Footer.tsx` - footer links, social media
- `.env.local` - API URLs, analytics IDs

### Update pricing

Edit `components/PricingPreview.tsx`:
- Change `price` values
- Update `features` array
- Modify `period` text

### Update testimonials

Edit `components/SocialProofSection.tsx`:
- Replace `testimonials` array
- Update author names and clinic names
- Adjust star ratings

### Update hero copy

Edit `components/HeroSection.tsx`:
- Change headline text
- Update subheading
- Modify CTA button text

### Add new pages

Create new file in `app/` directory:

```bash
# Create new page
mkdir app/about
touch app/about/page.tsx

# Add route in Navigation.tsx
<Link href="/about">About</Link>
```

---

## Performance Optimization

### Image Optimization
- Use Next.js `Image` component for automatic optimization
- Images are lazy-loaded and responsive
- WebP format for modern browsers

### Code Splitting
- Next.js automatically code-splits at page level
- Only necessary JavaScript is loaded per page

### Caching
- Static pages are pre-rendered at build time
- Use `revalidate` option for ISR (Incremental Static Regeneration)

### Minification
- CSS and JavaScript are minified in production
- Set `swcMinify: true` in next.config.js

---

## SEO Setup

### Metadata
- All pages have proper `meta` tags
- Open Graph tags for social sharing
- Twitter card tags

### Sitemap
Generate sitemap automatically:
```bash
npm run build
```

### robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://vetguard.io/sitemap.xml
```

### Analytics
Add Google Analytics to `app/layout.tsx`:
```tsx
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

---

## Monitoring & Maintenance

### Health Checks
- Monitor uptime with Uptime Robot
- Set alerts for 5xx errors
- Monitor Core Web Vitals in Google Search Console

### Backups
- GitHub automatically backs up your code
- Keep production deployments in version control

### Updates
- Keep Node.js dependencies updated
  ```bash
  npm outdated
  npm update
  ```
- Test updates in development first

---

## Troubleshooting

### Build fails
1. Check Node.js version: `node --version` (need 18+)
2. Clear cache: `rm -rf .next && npm run build`
3. Check for TypeScript errors: `npm run lint`

### Deployment fails on Vercel
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `package.json` scripts are correct

### Site is slow
1. Check Core Web Vitals in Google PageSpeed Insights
2. Optimize images (use WebP format)
3. Enable caching headers in next.config.js
4. Use CDN for static assets

### Domain not pointing correctly
1. Check DNS records in Hostinger
2. Wait for DNS propagation (up to 48 hours)
3. Use `nslookup` to verify DNS resolution
4. Ensure CNAME or A record is pointing to Vercel

---

## Support

For help:
- [Next.js documentation](https://nextjs.org/docs)
- [Vercel documentation](https://vercel.com/docs)
- Email: hello@vetguard.io
