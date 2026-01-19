# Contributing to SQL Mastery

First off, thank you for considering contributing to SQL Mastery! 🎉 It's people like you that make this project a great learning resource for the ML community.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## 🌟 How Can I Contribute?

### Reporting Bugs
- **Check existing issues** first to avoid duplicates
- Use the bug report template
- Include:
  - Clear description of the issue
  - Steps to reproduce
  - Expected vs actual behavior
  - Browser/OS information
  - Screenshots if applicable

### Suggesting Features
- **Check existing feature requests** first
- Explain the problem you're trying to solve
- Describe the solution you'd like
- Consider how it benefits ML engineers specifically

### Adding Content

#### New Practice Problems
1. Navigate to the appropriate JSON file in `/data/`
2. Follow the existing structure:
```json
{
  "difficulty": "Easy|Medium|Hard",
  "icon": "emoji",
  "title": "Problem Title",
  "description": "What should the student do?",
  "solution": "SELECT * FROM ...",
  "explanation": "Why this solution works"
}
```
3. Ensure queries work with DuckDB/PostgreSQL syntax
4. Test in the live console before submitting

#### New Topics
1. Create a new page in `/pages/`
2. Add corresponding JSON file in `/data/`
3. Update navigation in all pages
4. Add topic card to `index.html`
5. Follow existing HTML structure and styling

### Improving Documentation
- Fix typos and grammatical errors
- Improve explanations
- Add diagrams or visual aids
- Translate content to other languages

### Code Improvements
- Fix bugs
- Improve performance
- Enhance accessibility
- Add tests
- Refactor for better maintainability

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sql.git
   cd sql
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Start local server**
   ```bash
   python3 -m http.server 8000
   ```

4. **Make your changes**
   - Edit files
   - Test thoroughly
   - Ensure all queries work

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new window functions problem"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Submit!

## 🔄 Development Workflow

### Testing Your Changes

1. **Test locally**: Always test on a local server (not `file://`)
2. **Test queries**: Verify all SQL queries execute correctly
3. **Cross-browser**: Test in Chrome, Firefox, and Safari
4. **Mobile responsive**: Check on mobile devices
5. **Console errors**: Check browser console for errors

### File Structure Guidelines

```
sql/
├── css/          # Global styles only
├── js/           # Reusable JavaScript modules
├── pages/        # Individual topic pages
├── data/         # JSON problem files
└── .github/      # GitHub workflows and templates
```

**Rules:**
- Keep CSS in `/css/styles.css` (single source of truth)
- No inline styles in HTML
- JavaScript modules should be standalone
- JSON files must be valid and follow schema

## 🎨 Style Guidelines

### HTML
- Use semantic HTML5 elements
- Keep consistent indentation (2 spaces)
- Add comments for complex sections
- Use `data-*` attributes for JavaScript hooks

### CSS
- Follow existing naming conventions
- Use CSS variables for colors
- Mobile-first responsive design
- Keep specificity low

### JavaScript
- ES6+ syntax
- Use `const` and `let`, not `var`
- Async/await for promises
- Add JSDoc comments for functions
- Handle errors gracefully

### SQL
- Use uppercase for keywords (SELECT, FROM, WHERE)
- Lowercase for identifiers
- Meaningful aliases
- Comments for complex logic
- PostgreSQL-compatible syntax (DuckDB)

## 📝 Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(problems): add CTEs practice problems to advanced.json
fix(console): resolve Monaco editor initialization timing
docs(readme): update installation instructions
style(css): improve mobile responsiveness for sidebar
refactor(js): extract database initialization logic
```

## 🎯 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All queries tested in console
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Documentation updated
- [ ] Commit messages follow convention

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
How you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code tested locally
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Bug Reports

Use this template:

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

## 💡 Feature Requests

Use this template:

```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
Describe your solution

**Alternatives Considered**
Other approaches you thought about

**Additional Context**
Anything else relevant
```

## 📧 Questions?

- Open an issue with the `question` label
- Start a discussion in GitHub Discussions
- Check existing documentation first

## 🎉 Recognition

Contributors will be:
- Listed in the contributors section
- Credited in release notes
- Thanked in the community

Thank you for contributing! 🙏
