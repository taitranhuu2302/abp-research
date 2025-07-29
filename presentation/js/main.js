// Main Application Class
class ABPPresentation {
    constructor() {
        this.slideRenderer = null;
        this.navigation = null;
        this.progressBar = null;
        this.codeHighlighter = null;
        this.animations = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            // Show loading screen
            this.showLoading();

            // Initialize components
            await this.initializeComponents();

            // Setup event listeners
            this.setupEventListeners();

            // Hide loading screen
            this.hideLoading();

            // Mark as initialized
            this.isInitialized = true;

            console.log('ABP Framework Presentation initialized successfully');
        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            this.showError('Failed to initialize presentation. Please refresh the page.');
        }
    }

    async initializeComponents() {
        // Initialize SlideRenderer
        this.slideRenderer = new SlideRenderer();
        this.slideRenderer.init();

        // Initialize Navigation
        this.navigation = new Navigation(this.slideRenderer);
        this.navigation.setupFullscreenListeners();

        // Initialize ProgressBar
        this.progressBar = new ProgressBar(this.slideRenderer);

        // Initialize CodeHighlighter
        this.codeHighlighter = new CodeHighlighter();

        // Initialize Animations
        this.animations = new Animations();

        // Wait for code highlighter to load
        await this.waitForCodeHighlighter();

        // Initialize code highlighting for initial content
        this.codeHighlighter.initForNewContent();
    }

    async waitForCodeHighlighter() {
        return new Promise((resolve) => {
            const checkLoaded = () => {
                if (this.codeHighlighter.isLoaded) {
                    resolve();
                } else {
                    setTimeout(checkLoaded, 100);
                }
            };
            checkLoaded();
        });
    }

    setupEventListeners() {
        // Listen for slide changes
        document.addEventListener('slideChanged', () => {
            this.onSlideChange();
        });

        // Listen for window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        // Listen for visibility change (for auto-save)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.navigation.saveState();
            }
        });

        // Listen for beforeunload (for auto-save)
        window.addEventListener('beforeunload', () => {
            this.navigation.saveState();
        });

        // Load saved state
        this.navigation.loadState();

        // Add keyboard shortcuts info
        this.addKeyboardShortcutsInfo();
    }

    onSlideChange() {
        // Update progress bar
        this.progressBar.updateProgress();

        // Animate slide content
        const currentSlide = document.querySelector('.slide.active');
        if (currentSlide) {
            this.animations.animateSlideContent(currentSlide);
        }

        // Initialize code highlighting for new content
        setTimeout(() => {
            this.codeHighlighter.initForNewContent();
        }, 100);

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('slideChanged', {
            detail: {
                currentSlide: this.slideRenderer.currentSlide,
                totalSlides: this.slideRenderer.slides.length
            }
        }));
    }

    onWindowResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Recalculate any layout-dependent elements
            this.updateLayout();
        }, 250);
    }

    updateLayout() {
        // Update any layout-dependent components
        if (this.progressBar) {
            this.progressBar.updateProgress();
        }
    }

    showLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="location.reload()">Reload Page</button>
            </div>
        `;

        // Add error styles
        if (!document.getElementById('error-styles')) {
            const style = document.createElement('style');
            style.id = 'error-styles';
            style.textContent = `
                .error-message {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                
                .error-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    max-width: 400px;
                }
                
                .error-content i {
                    font-size: 3rem;
                    color: #ef4444;
                    margin-bottom: 1rem;
                }
                
                .error-content p {
                    margin-bottom: 1rem;
                    color: #374151;
                }
                
                .error-content button {
                    background: #ef4444;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(errorDiv);
    }

    addKeyboardShortcutsInfo() {
        // Add keyboard shortcuts modal
        const shortcutsBtn = document.createElement('button');
        shortcutsBtn.className = 'nav-btn';
        shortcutsBtn.innerHTML = '<i class="fas fa-keyboard"></i>';
        shortcutsBtn.title = 'Keyboard Shortcuts';
        shortcutsBtn.onclick = () => this.showKeyboardShortcuts();

        // Insert before fullscreen button
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn && fullscreenBtn.parentNode) {
            fullscreenBtn.parentNode.insertBefore(shortcutsBtn, fullscreenBtn);
        }
    }

    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Keyboard Shortcuts</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="shortcuts-grid">
                        <div class="shortcut-item">
                            <span class="shortcut-key">← / Page Up</span>
                            <span class="shortcut-desc">Previous slide</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">→ / Page Down / Space</span>
                            <span class="shortcut-desc">Next slide</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Home</span>
                            <span class="shortcut-desc">First slide</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">End</span>
                            <span class="shortcut-desc">Last slide</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">F / Ctrl+F</span>
                            <span class="shortcut-desc">Toggle fullscreen</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Esc</span>
                            <span class="shortcut-desc">Exit fullscreen</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add shortcuts styles
        if (!document.getElementById('shortcuts-styles')) {
            const style = document.createElement('style');
            style.id = 'shortcuts-styles';
            style.textContent = `
                .shortcuts-grid {
                    display: grid;
                    gap: 1rem;
                }
                
                .shortcut-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    background: var(--gray-50);
                    border-radius: var(--radius-lg);
                }
                
                .shortcut-key {
                    background: var(--gray-200);
                    padding: 0.25rem 0.5rem;
                    border-radius: var(--radius-sm);
                    font-family: monospace;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .shortcut-desc {
                    color: var(--gray-700);
                    font-size: 0.875rem;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Public API methods
    getCurrentSlide() {
        return this.slideRenderer ? this.slideRenderer.currentSlide : 0;
    }

    getTotalSlides() {
        return this.slideRenderer ? this.slideRenderer.slides.length : 0;
    }

    goToSlide(slideIndex) {
        if (this.slideRenderer) {
            this.slideRenderer.goToSlide(slideIndex);
        }
    }

    nextSlide() {
        if (this.slideRenderer) {
            this.slideRenderer.nextSlide();
        }
    }

    prevSlide() {
        if (this.slideRenderer) {
            this.slideRenderer.prevSlide();
        }
    }

    toggleFullscreen() {
        if (this.navigation) {
            this.navigation.toggleFullscreen();
        }
    }

    // Cleanup method
    cleanup() {
        if (this.animations) {
            this.animations.cleanup();
        }
        if (this.navigation) {
            this.navigation.saveState();
        }
    }
}

// Global instance
let presentation;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        presentation = new ABPPresentation();
        await presentation.init();
    } catch (error) {
        console.error('Failed to initialize presentation:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (presentation) {
        presentation.cleanup();
    }
});

// Export for global access
window.ABPPresentation = ABPPresentation;
window.presentation = presentation;

// Global utility functions
window.showSlideOverview = () => {
    if (presentation && presentation.navigation) {
        presentation.navigation.showSlideOverview();
    }
};

window.showProgressDetails = () => {
    if (presentation && presentation.progressBar) {
        presentation.progressBar.showDetailedProgress();
    }
};

window.showProgressToast = () => {
    if (presentation && presentation.progressBar) {
        presentation.progressBar.showProgressToast();
    }
};

// Debug functions (remove in production)
window.debugPresentation = () => {
    if (presentation) {
        console.log('Presentation Debug Info:', {
            currentSlide: presentation.getCurrentSlide(),
            totalSlides: presentation.getTotalSlides(),
            isInitialized: presentation.isInitialized,
            slideRenderer: presentation.slideRenderer,
            navigation: presentation.navigation,
            progressBar: presentation.progressBar,
            codeHighlighter: presentation.codeHighlighter,
            animations: presentation.animations
        });
    }
};

// Performance monitoring
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Presentation loaded in ${loadTime}ms`);
    });
} 