// Problem Renderer - Dynamically loads and renders problems from JSON

class ProblemRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
        }
    }

    async loadProblems(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`Failed to load problems: ${response.statusText}`);
            }
            const data = await response.json();
            this.renderProblems(data.problems);
        } catch (error) {
            console.error('Error loading problems:', error);
            this.container.innerHTML = `
                <div class="info-box" style="border-left-color: #ff006e;">
                    <div class="info-box-title">⚠️ Error Loading Problems</div>
                    <p>Could not load practice problems. Please check the console for details.</p>
                </div>
            `;
        }
    }

    renderProblems(problems) {
        if (!problems || problems.length === 0) {
            this.container.innerHTML = '<p>No problems available.</p>';
            return;
        }

        this.container.innerHTML = problems.map(problem => this.renderProblem(problem)).join('');
        
        // Re-highlight code blocks with Prism if available
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    renderProblem(problem) {
        const difficultyClass = problem.difficulty.toLowerCase();
        const difficultySymbol = {
            'easy': '✓',
            'medium': '◉',
            'hard': '★'
        }[difficultyClass] || '•';

        // Render result table if available
        let resultHtml = '';
        if (problem.result && problem.result.length > 0) {
            const columns = Object.keys(problem.result[0]);
            resultHtml = `
                <div class="query-result">
                    <div class="query-result-title">Query Result:</div>
                    <table class="result-table">
                        <thead>
                            <tr>
                                ${columns.map(col => `<th>${this.escapeHtml(col)}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${problem.result.map(row => `
                                <tr>
                                    ${columns.map(col => `<td>${this.escapeHtml(String(row[col]))}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        return `
            <div class="card problem-card">
                <span class="problem-difficulty ${difficultyClass}">
                    ${difficultySymbol} ${problem.difficulty}
                </span>
                <h3 class="problem-title">
                    ${problem.icon ? `<span class="card-icon">${problem.icon}</span>` : ''}
                    ${problem.title}
                </h3>
                <div class="problem-description">
                    <p><strong>Problem:</strong> ${problem.description}</p>
                </div>
                <div class="problem-solution">
                    <pre><code class="language-sql">${this.escapeHtml(problem.solution)}</code></pre>
                </div>
                ${resultHtml}
                ${problem.explanation ? `
                    <div class="problem-explanation">
                        <strong>Why this works:</strong> ${problem.explanation}
                    </div>
                ` : ''}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
    const problemsContainer = document.getElementById('problems-container');
    if (problemsContainer && problemsContainer.dataset.jsonPath) {
        const renderer = new ProblemRenderer('problems-container');
        renderer.loadProblems(problemsContainer.dataset.jsonPath);
    }
});
