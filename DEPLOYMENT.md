# GitHub Pages Deployment Guide

## Quick Start

### 1. Create GitHub Repository

```bash
cd /path/to/query-ground
git init
git add .
git commit -m "feat: initial commit - Query Ground platform"
git branch -M main
git remote add origin git@github.com:cykruss/query-ground.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Navigate to **Pages** (left sidebar under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   - That's it! The workflow will handle the rest

### 3. Verify Deployment

- After pushing, go to **Actions** tab to see the deployment workflow
- Once completed (green checkmark), your site will be live at:
  ```
  https://cykruss.github.io/query-ground/
  ```

## Automated Deployment

Every push to the `main` branch automatically triggers:
1. Checkout code
2. Upload to GitHub Pages artifact
3. Deploy to production

See `.github/workflows/deploy.yml` for details.

## Custom Domain (Optional)

### Add Custom Domain

1. In repository **Settings** → **Pages**
2. Enter your domain under "Custom domain"
3. Add DNS records at your domain provider:
   ```
   Type: CNAME
   Name: www (or subdomain)
   Value: YOUR_USERNAME.github.io
   ```
4. Enable "Enforce HTTPS" after DNS propagates

## Local Testing

Before pushing, test locally:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code
# Install "Live Server" extension
# Right-click index.html → Open with Live Server
```

Visit: `http://localhost:8000` (or port shown)

## Troubleshooting

### Deployment Failed
- Check **Actions** tab for error logs
- Ensure `index.html` exists in root
- Verify all file paths are relative (no `/` prefix)

### 404 Errors
- File paths are case-sensitive on GitHub Pages
- Check that all linked files exist
- Relative paths should not start with `/`

### Changes Not Showing
- GitHub Pages has ~5min cache
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Check if deployment workflow completed successfully

### Monaco Editor/DuckDB Not Loading
- These use CDN links - ensure they're accessible
- Check browser console (F12) for errors
- CDN sometimes has regional issues - refresh after a few minutes

## Update README

After first deployment:
1. Update badge URLs if needed
2. Add screenshots if desired
3. Customize content as needed

## Branch Protection (Recommended)

For team collaboration:

1. **Settings** → **Branches**
2. Add rule for `main`:
   - Require pull request before merging
   - Require status checks to pass
   - Require approvals: 1

## Analytics (Optional)

Add Google Analytics:

```html
<!-- Add to <head> in index.html and all pages/*.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Monitoring

- **GitHub Insights** → **Traffic**: See visitors, views, clones
- **Actions** tab: Monitor deployment history
- Set up email notifications: **Settings** → **Notifications**

## Need Help?

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Open an issue](https://github.com/cykruss/query-ground/issues)
