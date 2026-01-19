// Common JavaScript utilities for SQL Mastery Tutorial

// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const burger = document.querySelector('.burger');
    sidebar.classList.toggle('expanded');
    burger.classList.toggle('active');
}

// Reference panel toggle functionality
function toggleReference() {
    const panel = document.getElementById('reference-panel');
    const main = document.querySelector('.main');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        main.classList.add('has-reference');
    } else {
        main.classList.remove('has-reference');
    }
}

// Reference panel toggle functionality
function toggleReference() {
    const panel = document.getElementById('reference-panel');
    const main = document.querySelector('.main');
    
    if (panel) {
        panel.classList.toggle('collapsed');
        
        // Update main margin
        if (panel.classList.contains('collapsed')) {
            main.classList.remove('reference-expanded');
            main.style.marginRight = '0';
        } else {
            main.classList.add('reference-expanded');
            main.style.marginRight = '350px';
        }
    }
}

// Navigation between sections (for single-page layouts)
function showSection(index) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById('section-' + index);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Set active nav item
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems[index]) {
        navItems[index].classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard navigation (Arrow keys)
document.addEventListener('DOMContentLoaded', () => {
    // Only enable keyboard navigation on single-page layouts
    const sections = document.querySelectorAll('.section');
    if (sections.length > 1) {
        let currentSection = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentSection > 0) {
                currentSection--;
                showSection(currentSection);
            } else if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
                currentSection++;
                showSection(currentSection);
            }
        });
    }
});

// Initialize Prism.js for syntax highlighting (if loaded)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});
