# VetGuard.io Website - Setup Instructions

Complete step-by-step guide to set up and deploy your production website.

## Part 1: Local Setup (10 minutes)

### Step 1: Prepare your computer

#### Install Node.js
1. Go to [nodejs.org](https://nodejs.org)
2. Download LTS version (18 or higher)
3. Install following the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Install Git
1. Go to [git-scm.com](https://git-scm.com)
2. Download and install
3. Verify installation:
   ```bash
   git --version
   ```

### Step 2: Create your project

1. **Create a folder**
   ```bash
   mkdir vetguard-website
   cd vetguard-website
   ```

2. **Copy all project files**
   - Copy the files provided to this folder:
     - `package.json`
     - `next.config.js`
     - `tailwind.config.js`
     - `tsconfig.json`
     - `postcss.config.js`
     - Folders: `app/`, `components/`, `public/`

3. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VetGuard website"
   ```

### Step 3: Install dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### Step 4: Run locally

```bash
npm run dev
```

You'll see output like:
```
> ready - started server on 0.0.0.0:3000
```

Open your browser to `http://localhost:3000` to see the site.

### Step 5: Verify everything works

Check:
- [ ] Homepage loads
- [ ] Navigation menu works
- [ ] All links are clickable
- [ ] Mobile view is responsive
- [ ] No console errors (F12 → Console)

---

## Part 2: Customize Your Content (15 minutes)

### Update company information

#### 1. Homepage metadata (app/layout.tsx)
```tsx
export const metadata: Metadata = {
  title: 'VetGuard — AI Billing Audit for Vet Clinics',
  description: 'Recover $2–5K/month in missed charges...',
  // Update these fields
}
```

#### 2. Navigation logo and links (components/Navigation.tsx)
```tsx
<Link href="/" className="flex items-center gap-2">
  <Shield className="w-6 h-6 text-blue-600" />
  <span className="font-bold text-lg">VetGuard</span> {/* Change name */}
</Link>

// Update these links:
<Link href="/features">Features</Link>
<Link href="/pricing">Pricing</Link>
// etc.
```

#### 3. Footer links (components/Footer.tsx)
- Update company name
- Update contact email
- Update social media links

### Update pricing (components/PricingPreview.tsx)

```tsx
const plans = [
  {
    name: 'Free trial',
    price: '$0',           // Update price
    period: 'for 2 weeks', // Update period
    features: [
      'Full functionality',
      // Add/remove features
    ],
  },
  // ... other plans
]
```

### Update testimonials (components/SocialProofSection.tsx)

```tsx
const testimonials = [
  {
    quote: 'Your actual customer quote here',
    author: 'Customer Name',
    clinic: 'Clinic Name, City State',
    rating: 5
  },
  // ... more testimonials
]
```

### Test your changes

After editing files:
1. Save the file (Ctrl+S or Cmd+S)
2. Go to `http://localhost:3000`
3. Refresh the page to see changes

---

## Part 3: Deploy to Production (5-10 minutes)

### Option A: Deploy to Vercel (Recommended - Free)

#### Step 1: Push to GitHub

1. **Create GitHub account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Create new repository**
   - Click "New repository"
   - Name it `vetguard-website`
   - Don't initialize with README
   - Click "Create repository"

3. **Push your code**
   ```bash
   git remote add origin https://github.com/yourusername/vetguard-website.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy on Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Use GitHub account to sign up

2. **Import your project**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure project**
   - Framework: Next.js (auto-selected)
   - Root directory: ./ (default)
   - Click "Deploy"

4. **Wait for deployment**
   - Vercel will build and deploy automatically
   - You'll see a "Congratulations" message
   - Your site is live at: `vetguard-website.vercel.app`

#### Step 3: Connect your domain

1. **In Vercel dashboard**
   - Go to "Settings"
   - Click "Domains"
   - Add domain: `vetguard.io`

2. **In Hostinger (your domain registrar)**
   - Go to domain settings
   - Click "DNS"
   - Look for "CNAME" or "A record" instructions from Vercel
   - Update your DNS settings

3. **Wait for DNS propagation**
   - Takes 5-48 hours
   - Check status with: `nslookup vetguard.io`

**Your site is now live at: https://vetguard.io** 🎉

---

### Option B: Deploy to Netlify (Alternative)

1. **Push to GitHub** (same as Vercel Step 1)

2. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Sign up"
   - Connect GitHub

3. **New site from Git**
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

4. **Connect domain**
   - Go to "Site settings"
   - Click "Domain management"
   - Add custom domain
   - Update DNS in Hostinger

---

### Option C: Deploy to your own server (Advanced)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#option-3-deploy-to-your-own-server) for detailed instructions.

---

## Part 4: Post-Deployment Checklist

After your site is live:

### Functionality
- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] All links work correctly
- [ ] Mobile view is responsive
- [ ] CTA buttons link to correct URLs

### Performance
- [ ] Page loads in <2 seconds
- [ ] No 404 errors in console
- [ ] No JavaScript errors
- [ ] Images load properly

### SEO
- [ ] Google can crawl site: `site:vetguard.io`
- [ ] Meta tags are correct (view page source)
- [ ] Open Graph tags work (test on Facebook)

### Security
- [ ] HTTPS is enabled (check padlock icon)
- [ ] No mixed content warnings
- [ ] Security headers are set

### Analytics
- [ ] Set up Google Analytics (optional)
- [ ] Add tracking code to `app/layout.tsx`
- [ ] Verify tracking is working

---

## Part 5: Next Steps

After deployment:

1. **Send cold emails**
   - Update email address in contact form
   - Add Calendly link to CTA buttons
   - Start reaching out to prospects

2. **Create landing page**
   - Create `/pricing` page with full pricing details
   - Create `/features` page with detailed features
   - Create `/about` page with your story

3. **Add blog content**
   - Create `/blog` section
   - Write SEO-focused articles
   - Helps with organic search traffic

4. **Set up analytics**
   - Google Analytics to track visitors
   - Hotjar to track user behavior
   - Google Search Console for SEO

5. **Get feedback**
   - Ask early customers to review the site
   - A/B test different headlines
   - Optimize conversion rates

---

## Troubleshooting

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### Development server won't start
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Start development server
npm run dev
```

### Vercel deployment fails
1. Check build logs in Vercel dashboard
2. Ensure all files were pushed to GitHub
3. Verify `package.json` has correct scripts
4. Clear Vercel cache and rebuild

### Domain not connecting
1. Wait 24-48 hours for DNS propagation
2. Check DNS records in Hostinger
3. Verify CNAME/A record points to correct IP
4. Use `nslookup vetguard.io` to test

### Styles not showing after deployment
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check CSS is loaded in network tab (F12)
4. Rebuild on Vercel

---

## Getting Help

### Documentation
- [Next.js docs](https://nextjs.org/docs)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Vercel docs](https://vercel.com/docs)

### Common Issues
- Check `README-PRODUCTION.md` for detailed info
- Check `DEPLOYMENT_GUIDE.md` for deployment help

### Support
- Email: hello@vetguard.io
- Create GitHub issue in your repository

---

**Ready?** Start with "Part 1: Local Setup" above! 🚀
