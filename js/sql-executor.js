// SQL Console Manager for in-browser SQL execution using DuckDB-WASM
class SQLConsole {
    constructor() {
        this.db = null;
        this.conn = null;
        this.isExpanded = false;
        this.editor = null;
    }

    async init() {
        try {
            // Load DuckDB-WASM bundles
            const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
            
            // Select bundle based on browser support
            const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
            
            // Instantiate worker
            const worker_url = URL.createObjectURL(
                new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' })
            );
            const worker = new Worker(worker_url);
            const logger = new duckdb.ConsoleLogger();
            
            // Initialize DuckDB
            this.db = new duckdb.AsyncDuckDB(logger, worker);
            await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);
            
            // Create connection
            this.conn = await this.db.connect();
            
            // Create and populate sample tables
            await this.setupSampleData();
            
            // Initialize CodeMirror editor
            this.initEditor();
            
            console.log('✅ DuckDB initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize DuckDB:', error);
            this.showError('Failed to load SQL engine. Please refresh the page.');
            return false;
        }
    }

    initEditor() {
        // Wait for Monaco to be available
        if (!window.monaco) {
            console.log('Monaco not ready yet, waiting...');
            setTimeout(() => this.initEditor(), 100);
            return;
        }
        
        const textarea = document.getElementById('sql-input');
        if (!textarea) {
            console.error('SQL input textarea not found');
            return;
        }
        
        try {
            // Create Monaco editor
            this.editor = monaco.editor.create(textarea.parentElement, {
                value: 'SELECT * FROM users;',
                language: 'sql',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: '"Fira Code", monospace',
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                readOnly: false,
                cursorStyle: 'line',
                wordWrap: 'on',
                padding: { top: 12, bottom: 12 },
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                acceptSuggestionOnEnter: 'on',
            });
            
            // Set editor height
            textarea.parentElement.style.height = '150px';
            
            // Hide the original textarea
            textarea.style.display = 'none';
            console.log('✅ Monaco editor initialized');
        } catch (error) {
            console.error('Failed to initialize Monaco:', error);
        }
    }

    async setupSampleData() {
        // Create users table with proper column naming
        await this.conn.query(`
            CREATE TABLE users (
                user_id INTEGER PRIMARY KEY,
                name VARCHAR,
                age INTEGER,
                country VARCHAR,
                salary DECIMAL(10,2),
                department VARCHAR,
                signup_date DATE,
                premium BOOLEAN,
                email VARCHAR
            );
        `);

        // Insert sample data for users
        await this.conn.query(`
            INSERT INTO users VALUES
                (1, 'Alice', 28, 'USA', 75000, 'Engineering', '2024-01-15', true, 'alice@example.com'),
                (2, 'Bob', 34, 'UK', 82000, 'Sales', '2024-02-20', false, 'bob@example.com'),
                (3, 'Charlie', 25, 'USA', 68000, 'Engineering', '2024-03-10', true, 'charlie@example.com'),
                (4, 'Diana', 31, 'Canada', 91000, 'Marketing', '2024-01-22', true, 'diana@example.com'),
                (5, 'Eve', 29, 'UK', 79000, 'Engineering', '2024-04-05', false, 'eve@example.com');
        `);

        // Create orders table
        await this.conn.query(`
            CREATE TABLE orders (
                order_id INTEGER PRIMARY KEY,
                user_id INTEGER,
                product VARCHAR,
                amount DECIMAL(10,2),
                order_date DATE,
                status VARCHAR
            );
        `);

        // Insert sample data for orders
        await this.conn.query(`
            INSERT INTO orders VALUES
                (101, 1, 'Laptop', 1200.00, '2024-02-01', 'Delivered'),
                (102, 1, 'Mouse', 25.00, '2024-02-15', 'Delivered'),
                (103, 2, 'Keyboard', 75.00, '2024-03-01', 'Shipped'),
                (104, 3, 'Monitor', 300.00, '2024-03-20', 'Processing'),
                (105, 2, 'Headphones', 150.00, '2024-01-16', 'Delivered'),
                (106, 4, 'Webcam', 80.00, '2024-01-18', 'Shipped'),
                (107, 5, 'Laptop', 1200.00, '2024-01-20', 'Delivered'),
                (108, 3, 'Mouse', 25.00, '2024-01-22', 'Processing');
        `);
    }

    async executeQuery(sql) {
        if (!this.conn) {
            return { error: 'Database not initialized. Please wait...' };
        }

        try {
            // Clean up the query
            const cleanSQL = sql.trim();
            if (!cleanSQL) {
                return { error: 'Please enter a SQL query.' };
            }

            // Execute query and get Arrow result
            const result = await this.conn.query(cleanSQL);
            
            // Convert Arrow table to plain JavaScript objects
            const rows = result.toArray().map(row => row.toJSON());
            
            if (rows.length === 0) {
                // Check if it was a DDL/DML statement
                if (/^(CREATE|INSERT|UPDATE|DELETE|DROP|ALTER)/i.test(cleanSQL)) {
                    return { 
                        success: true, 
                        message: 'Query executed successfully' 
                    };
                }
                return { 
                    success: true, 
                    message: 'Query returned 0 rows' 
                };
            }

            // Get column names from the first row
            const columns = Object.keys(rows[0]);
            const values = rows.map(row => Object.values(row));

            return { 
                success: true, 
                results: { columns, values } 
            };
        } catch (error) {
            return { 
                error: error.message || 'Query execution failed' 
            };
        }
    }

    renderResults(result, container) {
        if (result.error) {
            container.innerHTML = `
                <div style="padding: 16px; background: rgba(255, 82, 82, 0.1); border-left: 3px solid var(--error); border-radius: 4px;">
                    <div style="color: var(--error); font-weight: 600; margin-bottom: 8px;">❌ Error</div>
                    <div style="color: var(--text-secondary); font-family: 'Fira Code', monospace; font-size: 14px;">${this.escapeHtml(result.error)}</div>
                </div>
            `;
            return;
        }

        if (result.message) {
            container.innerHTML = `
                <div style="padding: 16px; background: rgba(102, 252, 241, 0.1); border-left: 3px solid var(--success); border-radius: 4px;">
                    <div style="color: var(--success); font-weight: 600;">✓ ${result.message}</div>
                </div>
            `;
            return;
        }

        // Render results as table
        const { columns, values } = result.results;
        
        let html = `
            <div style="margin-bottom: 8px; color: var(--text-secondary); font-size: 14px;">
                📊 ${values.length} row${values.length !== 1 ? 's' : ''} returned
            </div>
            <div style="overflow-x: auto;">
                <table class="result-table" style="margin: 0;">
                    <thead>
                        <tr>${columns.map(col => `<th>${this.escapeHtml(col)}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
        `;

        values.forEach(row => {
            html += '<tr>';
            row.forEach(cell => {
                const displayValue = cell === null ? '<span style="color: var(--text-tertiary); font-style: italic;">NULL</span>' : this.escapeHtml(String(cell));
                html += `<td>${displayValue}</td>`;
            });
            html += '</tr>';
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        const resultContainer = document.getElementById('sql-result');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div style="padding: 16px; background: rgba(255, 82, 82, 0.1); border-left: 3px solid var(--error); border-radius: 4px;">
                    <div style="color: var(--error); font-weight: 600; margin-bottom: 8px;">❌ Error</div>
                    <div style="color: var(--text-secondary);">${this.escapeHtml(message)}</div>
                </div>
            `;
        }
    }

    toggle() {
        const console = document.getElementById('sql-console');
        const main = document.querySelector('.main');
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            console.classList.add('expanded');
            if (main) main.classList.add('console-open');
        } else {
            console.classList.remove('expanded');
            if (main) main.classList.remove('console-open');
        }
    }

    insertQuery(query) {
        const console = document.getElementById('sql-console');
        
        // Set editor content if available, otherwise fallback to textarea
        if (this.editor) {
            this.editor.setValue(query);
            this.editor.focus();
        } else {
            const textarea = document.getElementById('sql-input');
            if (textarea) {
                textarea.value = query;
            }
        }
        
        // Only open console if it's not already expanded
        if (!this.isExpanded) {
            this.toggle();
        }
    }

    async reset() {
        // Close connection and database
        if (this.conn) {
            await this.conn.close();
        }
        if (this.db) {
            await this.db.terminate();
        }
        
        // Reinitialize database (but not editor)
        try {
            const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
            const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
            
            const worker_url = URL.createObjectURL(
                new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' })
            );
            const worker = new Worker(worker_url);
            const logger = new duckdb.ConsoleLogger();
            
            this.db = new duckdb.AsyncDuckDB(logger, worker);
            await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);
            this.conn = await this.db.connect();
            
            // Recreate sample data
            await this.setupSampleData();
        } catch (error) {
            console.error('❌ Failed to reset database:', error);
            this.showError('Failed to reset database. Please refresh the page.');
            return;
        }
        
        // Clear results and show success message
        const resultContainer = document.getElementById('sql-result');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div style="padding: 16px; background: rgba(102, 252, 241, 0.1); border-left: 3px solid var(--success); border-radius: 4px;">
                    <div style="color: var(--success); font-weight: 600; margin-bottom: 8px;">✓ Database Reset</div>
                    <div style="color: var(--text-secondary);">All tables have been restored to their original state.</div>
                </div>
            `;
        }
        
        // Clear the input
        if (this.editor) {
            this.editor.setValue('');
        } else {
            const textarea = document.getElementById('sql-input');
            if (textarea) {
                textarea.value = '';
            }
        }
    }

    async executeFromInput() {
        const resultContainer = document.getElementById('sql-result');
        if (!resultContainer) return;
        
        // Get query from editor or textarea
        let query;
        if (this.editor) {
            query = this.editor.getValue();
        } else {
            const textarea = document.getElementById('sql-input');
            if (!textarea) return;
            query = textarea.value;
        }
        
        const result = await this.executeQuery(query);
        this.renderResults(result, resultContainer);
    }
}

// Global instance
const sqlConsole = new SQLConsole();

// Initialize when libraries are loaded
function initializeSQL() {
    if (window.duckdb && window.monaco) {
        console.log('Libraries loaded, initializing SQL console...');
        sqlConsole.init().catch(err => {
            console.error('Failed to initialize SQL console:', err);
        });
    } else {
        console.log('Waiting for libraries to load...');
        setTimeout(initializeSQL, 100);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSQL);
} else {
    initializeSQL();
}

// Global functions for onclick handlers
function toggleSQLConsole() {
    sqlConsole.toggle();
}

async function executeSQLQuery() {
    await sqlConsole.executeFromInput();
}

function tryQuery(query) {
    sqlConsole.insertQuery(query);
}

async function resetDatabase() {
    await sqlConsole.reset();
}
