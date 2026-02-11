# 🔀 Setting Up a Separate Repo for Your Portfolio

If you cloned the template directly but want your portfolio in a separate repo, follow these steps.

---

## Current Situation

You have:
- ✅ Your portfolio working locally (`alex-a-montreal/`)
- ❌ Git origin pointing to the template repo
- ❌ Your changes would push to the main template (not what you want!)

You want:
- ✅ Your own GitHub repo for your portfolio
- ✅ Ability to pull template updates
- ✅ Your changes stay in your repo only

---

## 🎯 Solution: Two Options

### Option A: Keep Current Setup, Change Remote (Simpler)

Best if you've already customized a lot and don't want to redo setup.

#### Step 1: Create Your GitHub Repo

1. Go to GitHub.com
2. Click "New repository"
3. Name it: `alex-a-montreal` (or whatever you want)
4. **Don't** initialize with README/gitignore
5. Click "Create repository"

#### Step 2: Change Your Local Repo's Remote

```bash
cd /Users/alexcat/Developer/alex-a-montreal

# Remove old remote
git remote remove origin

# Add YOUR repo as origin
git remote add origin https://github.com/YOUR_USERNAME/alex-a-montreal.git

# Add template as upstream (for updates)
git remote add upstream https://github.com/yourusername/retro-portfolio.git

# Verify
git remote -v
# Should show:
# origin    https://github.com/YOUR_USERNAME/alex-a-montreal.git
# upstream  https://github.com/yourusername/retro-portfolio.git
```

#### Step 3: Push Your Portfolio

```bash
# Push your portfolio to YOUR repo
git push -u origin main

# Done! Your portfolio is now in your own repo
```

#### Step 4: Update in the Future

```bash
# Backup first
./scripts/backup-personal.sh

# Pull updates from template
git fetch upstream
git merge upstream/main

# Push to your repo
git push origin main
```

---

### Option B: Proper Submodule Setup (Cleanest)

Best for clean separation of code and content.

#### Step 1: Create Two GitHub Repos

1. **Code repo**: Fork `yourusername/retro-portfolio` on GitHub
   - Or use the existing template repo

2. **Content repo**: Create `alex-a-montreal` on GitHub
   - This will hold ONLY your data

#### Step 2: Set Up Proper Structure

```bash
# Go to parent directory
cd /Users/alexcat/Developer

# Backup your current data
cp -r alex-a-montreal/config alex-a-montreal-backup-config
cp -r alex-a-montreal/data alex-a-montreal-backup-data
cp -r alex-a-montreal/lang alex-a-montreal-backup-lang
cp alex-a-montreal/.env alex-a-montreal-backup.env

# Remove old directory
rm -rf alex-a-montreal

# Create new portfolio site properly
cd retro-portfolio
./create-site.sh alex-a-montreal

# Restore your data
cd ../alex-a-montreal
cp -r ../alex-a-montreal-backup-config/* config/
cp -r ../alex-a-montreal-backup-data/* data/
cp -r ../alex-a-montreal-backup-lang/* lang/
cp ../alex-a-montreal-backup.env .env
```

#### Step 3: Connect to Your GitHub Repo

```bash
# Change remote to YOUR repo
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/alex-a-montreal.git

# Push to your repo
git add .
git commit -m "My portfolio with proper submodule setup"
git push -u origin main
```

#### Step 4: Update in the Future (Super Clean!)

```bash
cd alex-a-montreal

# Update template
cd template
git pull origin main
cd ..

# Commit the update
git add template
git commit -m "Update template"
git push
```

With this setup:
- ✅ Template code is in `template/` (submodule)
- ✅ Your data is in `config/`, `data/`, `lang/`
- ✅ Updates are dead simple and safe
- ✅ Your changes NEVER affect the template

---

## 📊 Comparison

| Feature | Option A (Change Remote) | Option B (Submodule) |
|---------|-------------------------|----------------------|
| Setup time | 5 minutes | 10 minutes |
| Update safety | Good | Excellent |
| Separation | Same repo | Separate repos |
| Recommended for | Quick fix | Long-term use |

---

## 🆘 Which Should I Choose?

**Choose Option A if:**
- You want the quickest fix
- You've already customized everything
- You don't mind code and content in same repo

**Choose Option B if:**
- You want cleanest architecture
- You plan to keep portfolio long-term
- You want safest updates

---

## ✅ Verify Your Setup

After either option:

```bash
cd alex-a-montreal

# Check remotes
git remote -v

# Option A should show:
# origin    https://github.com/YOUR_USERNAME/alex-a-montreal.git
# upstream  https://github.com/yourusername/retro-portfolio.git

# Option B should show:
# origin    https://github.com/YOUR_USERNAME/alex-a-montreal.git

# And template/ should be a submodule:
git submodule status  # (Option B only)
```

---

## 🔄 After Setup

1. **Test locally:**
   ```bash
   python3 -m http.server 8000
   open http://localhost:8000
   ```

2. **Deploy to GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: main branch
   - Save

3. **Make changes:**
   ```bash
   # Edit your content
   nano config/app.json
   nano data/painting.json

   # Commit and push
   git add .
   git commit -m "Update portfolio"
   git push
   ```

---

## 🎓 Understanding Git Remotes

- **origin**: Your main repo (where you push your changes)
- **upstream**: The template repo (where you pull updates)
- **submodule**: A repo inside a repo (keeps code separate)

With Option A: You manage merging updates yourself
With Option B: Template is isolated in `template/` folder

---

Need help? Just ask!
