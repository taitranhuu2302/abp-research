class CodeHighlighter {
    constructor() {
        this.isLoaded = false;
        this.init();
    }

    init() {
        this.loadPrismJS();
    }

    loadPrismJS() {
        // Load Prism.js CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
        document.head.appendChild(cssLink);

        // Load Prism.js script
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
        script.onload = () => {
            this.loadLanguageSupport();
        };
        document.head.appendChild(script);
    }

    loadLanguageSupport() {
        const languages = ['csharp', 'javascript', 'json', 'xml', 'html', 'css', 'bash'];
        
        languages.forEach(lang => {
            const script = document.createElement('script');
            script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
            document.head.appendChild(script);
        });

        // Mark as loaded after a short delay to ensure all scripts are loaded
        setTimeout(() => {
            this.isLoaded = true;
            this.highlightAll();
        }, 1000);
    }

    highlightAll() {
        if (!this.isLoaded || !window.Prism) return;

        // Find all code blocks and highlight them
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            this.highlightElement(block);
        });
    }

    highlightElement(element) {
        if (!this.isLoaded || !window.Prism) return;

        // Determine language from class or parent element
        let language = this.detectLanguage(element);
        
        // Add language class if not present
        if (language && !element.classList.contains(`language-${language}`)) {
            element.classList.add(`language-${language}`);
        }

        // Highlight the code
        window.Prism.highlightElement(element);
    }

    detectLanguage(element) {
        // Check for language class
        const classMatch = element.className.match(/language-(\w+)/);
        if (classMatch) {
            return classMatch[1];
        }

        // Check parent element for language class
        const parent = element.parentElement;
        if (parent) {
            const parentClassMatch = parent.className.match(/language-(\w+)/);
            if (parentClassMatch) {
                return parentClassMatch[1];
            }
        }

        // Default language detection based on content
        const text = element.textContent || '';
        
        if (text.includes('public class') || text.includes('using System') || text.includes('namespace')) {
            return 'csharp';
        }
        
        if (text.includes('function') || text.includes('const') || text.includes('let ')) {
            return 'javascript';
        }
        
        if (text.includes('{') && text.includes('"') && text.includes(':')) {
            return 'json';
        }
        
        if (text.includes('<html') || text.includes('<div') || text.includes('<!DOCTYPE')) {
            return 'html';
        }
        
        if (text.includes('{') && text.includes(';') && text.includes(':')) {
            return 'css';
        }

        return 'text'; // Default fallback
    }

    // Add line numbers to code blocks
    addLineNumbers(codeElement) {
        if (!codeElement) return;

        const lines = codeElement.textContent.split('\n');
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        
        lines.forEach((_, index) => {
            const lineNumber = document.createElement('span');
            lineNumber.textContent = index + 1;
            lineNumbers.appendChild(lineNumber);
        });

        // Insert line numbers before the code
        codeElement.parentElement.insertBefore(lineNumbers, codeElement);
        
        // Add line-numbers class to pre element
        codeElement.parentElement.classList.add('line-numbers');
    }

    // Copy code functionality
    setupCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyCode(button);
            });
        });
    }

    copyCode(button) {
        const codeContainer = button.closest('.code-container');
        const codeElement = codeContainer.querySelector('code');
        const text = codeElement.textContent;

        navigator.clipboard.writeText(text).then(() => {
            this.showCopySuccess(button);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            this.showCopyError(button);
        });
    }

    showCopySuccess(button) {
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        
        icon.className = 'fas fa-check';
        button.style.color = '#10b981';
        button.title = 'Copied!';
        
        setTimeout(() => {
            icon.className = originalClass;
            button.style.color = '';
            button.title = 'Copy code';
        }, 2000);
    }

    showCopyError(button) {
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        
        icon.className = 'fas fa-times';
        button.style.color = '#ef4444';
        button.title = 'Copy failed';
        
        setTimeout(() => {
            icon.className = originalClass;
            button.style.color = '';
            button.title = 'Copy code';
        }, 2000);
    }

    // Add syntax highlighting styles
    addCustomStyles() {
        if (document.getElementById('custom-code-styles')) return;

        const style = document.createElement('style');
        style.id = 'custom-code-styles';
        style.textContent = `
            .code-container {
                position: relative;
                margin: 1rem 0;
            }
            
            .code-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                background: #2d3748;
                border-bottom: 1px solid #4a5568;
                border-radius: 0.5rem 0.5rem 0 0;
            }
            
            .language {
                color: #a0aec0;
                font-size: 0.875rem;
                font-weight: 500;
                text-transform: uppercase;
            }
            
            .copy-btn {
                background: none;
                border: none;
                color: #a0aec0;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: all 0.2s;
            }
            
            .copy-btn:hover {
                background: #4a5568;
                color: #ffffff;
            }
            
            .code-content {
                background: #1a202c;
                border-radius: 0 0 0.5rem 0.5rem;
                overflow-x: auto;
            }
            
            .code-content pre {
                margin: 0;
                padding: 1rem;
                font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                font-size: 0.875rem;
                line-height: 1.6;
            }
            
            .code-content code {
                background: none;
                padding: 0;
                border-radius: 0;
                font-size: inherit;
            }
            
            /* Prism.js customizations */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata {
                color: #718096;
            }
            
            .token.punctuation {
                color: #e2e8f0;
            }
            
            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
                color: #90cdf4;
            }
            
            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
                color: #9ae6b4;
            }
            
            .token.operator,
            .token.entity,
            .token.url,
            .language-css .token.string,
            .style .token.string {
                color: #f6ad55;
            }
            
            .token.atrule,
            .token.attr-value,
            .token.keyword {
                color: #f687b3;
            }
            
            .token.function,
            .token.class-name {
                color: #fbb6ce;
            }
            
            .token.regex,
            .token.important,
            .token.variable {
                color: #fed7d7;
            }
            
            .token.important,
            .token.bold {
                font-weight: bold;
            }
            
            .token.italic {
                font-style: italic;
            }
            
            .token.entity {
                cursor: help;
            }
            
            /* Line numbers */
            .line-numbers {
                counter-reset: linenumber;
            }
            
            .line-numbers .line-numbers-rows {
                position: absolute;
                pointer-events: none;
                top: 0;
                left: 0;
                width: 3em;
                letter-spacing: -1px;
                border-right: 1px solid #4a5568;
                user-select: none;
            }
            
            .line-numbers-rows > span {
                display: block;
                counter-increment: linenumber;
            }
            
            .line-numbers-rows > span:before {
                content: counter(linenumber);
                color: #718096;
                display: block;
                padding-right: 0.8em;
                text-align: right;
            }
            
            .line-numbers .code-content {
                padding-left: 3.8em;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize highlighting for new content
    initForNewContent() {
        this.addCustomStyles();
        this.highlightAll();
        this.setupCopyButtons();
    }
} 