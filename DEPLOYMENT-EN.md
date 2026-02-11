# 🚀 Deployment Guide

Deploy your retro portfolio to the web!

> **Note:** A comprehensive French version exists in [DEPLOYMENT.md](DEPLOYMENT.md) covering advanced private config setups.

---

## 📋 Deployment Options

| Platform | Difficulty | Cost | Best For |
|----------|-----------|------|----------|
| GitHub Pages | Easy | Free | Most users ⭐ |
| Netlify | Easy | Free | Advanced features |
| Vercel | Medium | Free | Next.js integration |
| Custom Server | Hard | Varies | Full control |

---

## 🌟 GitHub Pages (Recommended)

### Prerequisites

- [x] Portfolio working locally
- [x] GitHub repo created and pushed

### Step 1: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top navigation)
3. Scroll down or click **Pages** (left sidebar)
4. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will build your site (1-2 minutes)
- Look for green checkmark
- Your site will be live at:
  ```
  https://YOUR_USERNAME.github.io/REPO_NAME/
  ```

### Step 3: Custom Domain (Optional)

1. Buy domain (e.g., from Namecheap, Google Domains)
2. Add `CNAME` file to your repo:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
3. Configure DNS at your domain provider:
   ```
   Type: CNAME
   Name: @ (or www)
   Value: YOUR_USERNAME.github.io
   ```
4. In GitHub repo settings → Pages:
   - Enter your domain
   - Check "Enforce HTTPS"

---

## 🚀 Netlify

### Why Netlify?

- Build previews for pull requests
- Form handling
- Serverless functions
- Better custom domain management

### Deployment Steps

1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your portfolio repo
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Click "Deploy site"

### Custom Domain on Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

---

## ⚡ Vercel

### Deployment Steps

1. Sign up at [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Click "Deploy"

Vercel auto-detects static sites and deploys instantly.

---

## 🔒 Private Configuration Setup

If you want to keep your content **private** while the code is **public**:

### Architecture

```
Public Repo (Code)              Private Repo (Content)
─────────────────               ──────────────────────
retro-portfolio/                my-portfolio-config/
├── index.html                  ├── config/
├── admin.html                  ├── data/
├── js/                         ├── lang/
└── config-source.json          └── .env
    (points to private repo)
```

### Setup Steps

1. **Create two repos:**
   - Public: Template code
   - Private: Your content

2. **Configure `config-source.json`:**
   ```json
   {
     "mode": "remote",
     "remote": {
       "enabled": true,
       "repo": "username/my-portfolio-config",
       "branch": "main",
       "baseUrl": "https://username.github.io/my-portfolio-config/"
     }
   }
   ```

3. **Deploy content repo to GitHub Pages:**
   - Enable Pages on private repo
   - GitHub Pages works for private repos (with GitHub Pro)

4. **Deploy code repo:**
   - Will fetch config/data from private repo at runtime

### Benefits

- ✅ Share template publicly
- ✅ Keep personal content private
- ✅ Update code and content independently

### See Also

- **[PRIVATE-CONFIG-SETUP.md](PRIVATE-CONFIG-SETUP.md)** (French) - Detailed private config guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** (French) - Comprehensive deployment options

---

## 🔧 Backend Deployment

### Important Notes

- **Admin panel requires backend** (`admin_api.py`)
- **Static site works without backend**
- Backend needed only for content management

### Backend Options

#### Option 1: Keep Backend Local

**Recommended for most users!**

- Deploy static site to GitHub Pages/Netlify/Vercel
- Run `admin_api.py` locally when adding content
- Upload to Cloudinary manually or via admin panel
- Update JSON files, push to GitHub

#### Option 2: Deploy Backend

**For advanced users only!**

Platform options:
- **Heroku**: Python app deployment
- **Railway.app**: Modern Python hosting
- **PythonAnywhere**: Free tier available
- **Your own server**: VPS with Python

Requirements:
- Install dependencies: `pip install -r requirements.txt`
- Set environment variables (CLOUDINARY credentials)
- Run `admin_api.py`
- Enable CORS for your frontend domain

**Note:** Most users don't need backend deployed - manage content locally!

---

## 🌐 Environment Variables

### For Static Deployment

No environment variables needed! Your `.env` file stays local.

### For Backend Deployment

Set these on your hosting platform:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Never commit `.env` to git!**

---

## ✅ Post-Deployment Checklist

After deploying:

- [ ] Visit your live URL
- [ ] Test all pages load
- [ ] Check images display
- [ ] Test audio player (if applicable)
- [ ] Test language switching
- [ ] Test theme switching
- [ ] Check mobile responsiveness
- [ ] Verify custom domain (if configured)
- [ ] Check HTTPS is enabled

---

## 🐛 Common Deployment Issues

### Images Not Loading

**Problem:** CORS or wrong URLs

**Solution:**
- Check Cloudinary URLs in `data/*.json`
- Ensure URLs are absolute: `https://res.cloudinary.com/...`
- Check Cloudinary dashboard for uploaded files

### 404 on GitHub Pages

**Problem:** Wrong base path

**Solution:**
- Check repo is public
- Verify Pages is enabled on `main` branch
- Wait 2-3 minutes for initial deployment
- Check `https://username.github.io/repo-name/` (include repo name!)

### Custom Domain Not Working

**Problem:** DNS not configured

**Solution:**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Use `dig yourdomain.com` to verify
- Make sure `CNAME` file exists in repo

### Admin Panel 404 on Deployed Site

**This is normal!**

- Admin panel requires backend (`admin_api.py`)
- Only works locally unless you deploy backend
- Most users manage content locally, deploy static site

---

## 🎓 Best Practices

1. **Test locally first**
   ```bash
   python3 -m http.server 8000
   ```

2. **Use branches for experiments**
   ```bash
   git checkout -b experiment
   # Make changes
   # Test before merging to main
   ```

3. **Enable HTTPS** - Always use HTTPS for security

4. **Monitor deployments** - Check build logs if something breaks

5. **Keep backups** - Your git history is your backup!

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

Need help? Open an issue on [GitHub](https://github.com/mtldev514/retro-portfolio/issues)!
