#!/bin/bash
# Script to add reference panel to all HTML pages

PAGES=(
    "filtering.html"
    "aggregation.html"
    "joins.html"
    "subqueries.html"
    "window-functions.html"
    "advanced.html"
    "ml-focus.html"
)

cd /Users/pravin.packia/code/sql/pages

for page in "${PAGES[@]}"; do
    echo "Processing $page..."
    
    # Check if reference panel already exists
    if grep -q "reference-panel" "$page"; then
        echo "  → Already has reference panel, skipping"
        continue
    fi
    
    # Create backup
    cp "$page" "$page.bak"
    
    # Add reference panel HTML before the main div
    # This uses a multi-line sed replacement
    sed -i '' '/<div class="main">/i\
    <!-- Reference Panel Toggle Button -->\
    <div class="reference-toggle" onclick="toggleReference()" title="Toggle Reference Tables">\
        📚\
    </div>\
    \
    <!-- Reference Panel -->\
    <div class="reference-panel" id="reference-panel">\
        <div class="reference-header">\
            <div class="reference-title">📋 Reference Tables</div>\
            <div class="reference-subtitle">Quick reference for sample data</div>\
        </div>\
        <div class="reference-content">\
            <div class="reference-table-section">\
                <div class="reference-table-title">\
                    <span>Table:</span> <code>users</code>\
                </div>\
                <table class="reference-table">\
                    <thead>\
                        <tr>\
                            <th>user_id</th>\
                            <th>name</th>\
                            <th>age</th>\
                            <th>country</th>\
                            <th>signup_date</th>\
                            <th>premium</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr><td>1</td><td>Alice</td><td>28</td><td>USA</td><td>2024-01-15</td><td>true</td></tr>\
                        <tr><td>2</td><td>Bob</td><td>34</td><td>UK</td><td>2024-02-20</td><td>false</td></tr>\
                        <tr><td>3</td><td>Charlie</td><td>25</td><td>USA</td><td>2024-03-10</td><td>true</td></tr>\
                        <tr><td>4</td><td>Diana</td><td>31</td><td>Canada</td><td>2024-01-22</td><td>true</td></tr>\
                        <tr><td>5</td><td>Eve</td><td>29</td><td>UK</td><td>2024-04-05</td><td>false</td></tr>\
                    </tbody>\
                </table>\
            </div>\
            \
            <div class="reference-table-section">\
                <div class="reference-table-title">\
                    <span>Table:</span> <code>orders</code>\
                </div>\
                <table class="reference-table">\
                    <thead>\
                        <tr>\
                            <th>order_id</th>\
                            <th>user_id</th>\
                            <th>product</th>\
                            <th>amount</th>\
                            <th>order_date</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr><td>101</td><td>1</td><td>Laptop</td><td>1200</td><td>2024-02-01</td></tr>\
                        <tr><td>102</td><td>1</td><td>Mouse</td><td>25</td><td>2024-02-15</td></tr>\
                        <tr><td>103</td><td>2</td><td>Keyboard</td><td>75</td><td>2024-03-01</td></tr>\
                        <tr><td>104</td><td>3</td><td>Monitor</td><td>350</td><td>2024-03-20</td></tr>\
                        <tr><td>105</td><td>3</td><td>Laptop</td><td>1500</td><td>2024-04-10</td></tr>\
                    </tbody>\
                </table>\
            </div>\
        </div>\
    </div>\
    \
' "$page"
    
    # Update main div to include reference classes
    sed -i '' 's/<div class="main">/<div class="main has-reference reference-expanded">/' "$page"
    
    echo "  → Done!"
done

echo "All pages updated!"
