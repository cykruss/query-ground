# Query Ground

[![Deploy to GitHub Pages](https://github.com/cykruss/query-ground/actions/workflows/deploy.yml/badge.svg)](https://github.com/cykruss/query-ground/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Your playground for mastering data queries. Learn SQL and data querying through interactive, hands-on practice. Built for ML engineers.

🔗 **[Live Demo](https://cykruss.github.io/query-ground/)** | 📚 **[Documentation](#features)** | 🤝 **[Contributing](CONTRIBUTING.md)**

---

## ✨ Features

###  **Interactive SQL Console**
- **In-Browser Execution**: Run real SQL queries using DuckDB-WASM (PostgreSQL-compatible)
- **Monaco Editor**: Full VS Code editing experience with syntax highlighting, IntelliSense, and auto-completion
- **Instant Feedback**: See query results immediately in formatted tables
- **Pre-loaded Datasets**: Sample `users` and `orders` tables ready to query

### 📖 **Comprehensive Curriculum**
Structured learning path covering:
- **Fundamentals**: SELECT, DISTINCT, ORDER BY, LIMIT
- **Filtering**: WHERE clauses, operators, date filtering
- **Aggregation**: GROUP BY, HAVING, aggregate functions
- **Joins**: INNER, LEFT, RIGHT, self-joins
- **Subqueries**: Correlated and uncorrelated subqueries
- **Window Functions**: ROW_NUMBER, RANK, LAG, moving averages
- **Advanced Topics**: CTEs, recursive queries, JSON operations
- **ML Focus**: Feature engineering, time-series analysis, data quality

### 🎯 **ML Engineering Focus**
- Real-world examples relevant to data science and ML pipelines
- Feature engineering patterns
- RFM (Recency, Frequency, Monetary) analysis
- Time-series transformations
- Data quality validation techniques
- Anomaly detection with SQL

### 💡 **Learning Features**
- **43+ Practice Problems**: Graded by difficulty (Easy, Medium, Hard)
- **Detailed Explanations**: Understand the "why" behind each query
- **Try It Buttons**: One-click query loading for instant experimentation
- **Sample Results**: See expected output for validation
- **Progressive Difficulty**: Build skills from basics to advanced

---

## 🚀 Quick Start

### Online (Recommended)
Simply visit the [live demo](https://cykruss.github.io/query-ground/) and start learning!

### Local Development

1. **Clone the repository**
   ```bash
   git clone git@github.com:cykruss/query-ground.git
   cd query-ground
   ```

2. **Start a local server**
   
   **Python:**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Node.js:**
   ```bash
   npx http-server -p 8000
   ```
   
   **VS Code:**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 📁 Project Structure

```
sql/
├── index.html              # Landing page
├── css/
│   └── styles.css         # Global styles
├── js/
│   ├── common.js          # Shared utilities
│   ├── problem-renderer.js # Dynamic problem loading
│   └── sql-executor.js    # DuckDB integration & Monaco editor
├── pages/                 # Topic pages
│   ├── fundamentals.html
│   ├── filtering.html
│   ├── aggregation.html
│   ├── joins.html
│   ├── subqueries.html
│   ├── window-functions.html
│   ├── advanced.html
│   └── ml-focus.html
├── data/                  # Practice problems (JSON)
│   ├── fundamentals.json
│   ├── filtering.json
│   └── ...
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Pages deployment
```

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **SQL Engine**: [DuckDB-WASM](https://github.com/duckdb/duckdb-wasm) (PostgreSQL-compatible)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VS Code's editor)
- **Syntax Highlighting**: [Prism.js](https://prismjs.com/)
- **Fonts**: Inter, Fira Code (via Google Fonts)
- **Deployment**: GitHub Pages (automated via GitHub Actions)

---

## 🎓 Usage

### For Learners

1. **Navigate Topics**: Use the sidebar to explore different SQL concepts
2. **Read Examples**: Study the teaching content and example queries
3. **Try Queries**: Click "Try it" buttons to load queries into the console
4. **Experiment**: Modify queries and see results instantly
5. **Practice**: Solve problems at the bottom of each page
6. **Reset Database**: Use the 🔄 Reset DB button to restore sample data

### For Educators

This tutorial is perfect for:
- **Team Training**: Share the GitHub Pages link with your team
- **Workshops**: Use as a hands-on workshop companion
- **Self-Paced Learning**: Learners can progress at their own speed
- **Assessment**: Use practice problems for skill evaluation

**Customization Ideas:**
- Fork the repo and add your own datasets
- Customize problems in the JSON files
- Add company-specific examples
- Translate content to other languages

---

## 📊 Features for ML Engineers

### Feature Engineering Examples
```sql
-- Create RFM features
SELECT 
    user_id,
    COUNT(*) AS frequency,
    SUM(amount) AS monetary,
    CURRENT_DATE - MAX(order_date) AS recency
FROM orders
GROUP BY user_id;
```

### Time-Series Analysis
```sql
-- Moving average for trend analysis
SELECT 
    order_date,
    amount,
    AVG(amount) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM orders;
```

### Anomaly Detection
```sql
-- Z-score for outlier detection
SELECT 
    user_id,
    amount,
    (amount - AVG(amount) OVER ()) / 
        STDDEV(amount) OVER () AS z_score
FROM orders;
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- 🐛 Report bugs or issues
- ✨ Suggest new features or topics
- 📝 Improve documentation
- 🧩 Add new practice problems
- 🌍 Translate content
- 🎨 Enhance UI/UX

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [DuckDB](https://duckdb.org/) - Amazing in-browser SQL engine
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code's editing experience
- [Prism.js](https://prismjs.com/) - Beautiful syntax highlighting
- ML community for inspiration and feedback

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/cykruss/query-ground/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cykruss/query-ground/discussions)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

<p align="center">
  Made with ❤️ for the ML community
</p>
