#!/bin/bash

# SQL Mastery - GitHub Setup Script
# This script helps you set up the repository and deploy to GitHub Pages

set -e  # Exit on error

echo "🚀 SQL Mastery - GitHub Pages Setup"
echo "=================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " username
if [ -z "$username" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

# Confirm repository name
read -p "Repository name [sql]: " repo_name
repo_name=${repo_name:-sql}

echo ""
echo "📝 Summary:"
echo "  GitHub Username: $username"
echo "  Repository Name: $repo_name"
echo "  Deployment URL: https://$username.github.io/$repo_name/"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled"
    exit 1
fi

# Update README with actual username
echo "📝 Updating README.md with your username..."
sed -i.bak "s/YOUR_USERNAME/$username/g" README.md && rm README.md.bak

# Update index.html with GitHub link
echo "📝 Updating index.html with your username..."
sed -i.bak "s/YOUR_USERNAME/$username/g" index.html && rm index.html.bak

# Update DEPLOYMENT.md
echo "📝 Updating DEPLOYMENT.md..."
sed -i.bak "s/YOUR_USERNAME/$username/g" DEPLOYMENT.md && rm DEPLOYMENT.md.bak

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << 'EOF'
.DS_Store
Thumbs.db
.vscode/
.idea/
*.log
.env
node_modules/
EOF
fi

# Add all files
echo "📦 Staging files..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "feat: initial commit - SQL mastery platform for ML engineers" || echo "⚠️  No changes to commit"

# Add remote
echo "🔗 Adding remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$username/$repo_name.git"

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create the repository on GitHub:"
echo "   Visit: https://github.com/new"
echo "   Repository name: $repo_name"
echo "   Keep it public (required for free GitHub Pages)"
echo "   DON'T initialize with README (we already have one)"
echo ""
echo "2. Push your code:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   • Go to: https://github.com/$username/$repo_name/settings/pages"
echo "   • Source: Select 'GitHub Actions'"
echo "   • Save (deployment happens automatically)"
echo ""
echo "4. View your site (after ~2 minutes):"
echo "   https://$username.github.io/$repo_name/"
echo ""
echo "💡 Need help? Check DEPLOYMENT.md for detailed instructions"
echo ""
