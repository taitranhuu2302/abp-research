class Navigation {
    constructor(slideRenderer) {
        this.slideRenderer = slideRenderer;
        this.isFullscreen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupKeyboardControls();
        this.setupTouchControls();
    }

    bindEvents() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.slideRenderer.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.slideRenderer.nextSlide());
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Update button states
        this.updateButtonStates();
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger navigation when typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    this.slideRenderer.prevSlide();
                    break;
                case 'ArrowRight':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    this.slideRenderer.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.slideRenderer.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.slideRenderer.goToSlide(this.slideRenderer.slides.length - 1);
                    break;
                case 'f':
                case 'F':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleFullscreen();
                    }
                    break;
                case 'Escape':
                    if (this.isFullscreen) {
                        e.preventDefault();
                        this.exitFullscreen();
                    }
                    break;
            }
        });
    }

    setupTouchControls() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            handleSwipe();
        };

        const handleSwipe = () => {
            const diffX = startX - endX;
            const diffY = startY - endY;
            const minSwipeDistance = 50;

            // Check if it's a horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.slideRenderer.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.slideRenderer.prevSlide();
                }
            }
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        const elem = document.documentElement;
        
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        this.isFullscreen = true;
        this.updateFullscreenButton();
        document.body.classList.add('fullscreen');
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        this.isFullscreen = false;
        this.updateFullscreenButton();
        document.body.classList.remove('fullscreen');
    }

    updateFullscreenButton() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            if (this.isFullscreen) {
                icon.className = 'fas fa-compress';
                fullscreenBtn.title = 'Exit Fullscreen';
            } else {
                icon.className = 'fas fa-expand';
                fullscreenBtn.title = 'Enter Fullscreen';
            }
        }
    }

    updateButtonStates() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.slideRenderer.currentSlide === 0;
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = this.slideRenderer.currentSlide === this.slideRenderer.slides.length - 1;
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        }
    }

    // Listen for fullscreen change events
    setupFullscreenListeners() {
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
            this.updateFullscreenButton();
            document.body.classList.toggle('fullscreen', this.isFullscreen);
        });

        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullscreen = !!document.webkitFullscreenElement;
            this.updateFullscreenButton();
            document.body.classList.toggle('fullscreen', this.isFullscreen);
        });

        document.addEventListener('msfullscreenchange', () => {
            this.isFullscreen = !!document.msFullscreenElement;
            this.updateFullscreenButton();
            document.body.classList.toggle('fullscreen', this.isFullscreen);
        });
    }

    // Auto-advance slides (optional feature)
    startAutoAdvance(interval = 30000) { // 30 seconds default
        this.autoAdvanceInterval = setInterval(() => {
            if (this.slideRenderer.currentSlide < this.slideRenderer.slides.length - 1) {
                this.slideRenderer.nextSlide();
            } else {
                this.stopAutoAdvance();
            }
        }, interval);
    }

    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }

    // Presentation timer
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimer() {
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        // You can add a timer display element to show this
        console.log(`Presentation time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    // Slide overview (thumbnail view)
    showSlideOverview() {
        const overview = document.createElement('div');
        overview.className = 'slide-overview';
        overview.innerHTML = `
            <div class="overview-header">
                <h3>Slide Overview</h3>
                <button class="close-overview" onclick="this.closest('.slide-overview').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="overview-grid">
                ${this.slideRenderer.slides.map((slide, index) => `
                    <div class="overview-slide ${index === this.slideRenderer.currentSlide ? 'active' : ''}" 
                         onclick="slideRenderer.goToSlide(${index}); this.closest('.slide-overview').remove();">
                        <div class="overview-slide-number">${index + 1}</div>
                        <div class="overview-slide-title">${slide.title}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(overview);
        
        // Add CSS for overview
        if (!document.getElementById('overview-styles')) {
            const style = document.createElement('style');
            style.id = 'overview-styles';
            style.textContent = `
                .slide-overview {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 3000;
                    display: flex;
                    flex-direction: column;
                    padding: 2rem;
                }
                
                .overview-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                    margin-bottom: 2rem;
                }
                
                .overview-header h3 {
                    margin: 0;
                }
                
                .close-overview {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                .overview-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1rem;
                    overflow-y: auto;
                    flex: 1;
                }
                
                .overview-slide {
                    background: white;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }
                
                .overview-slide:hover {
                    transform: scale(1.05);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                
                .overview-slide.active {
                    border-color: var(--primary-color);
                    background: var(--primary-color);
                    color: white;
                }
                
                .overview-slide-number {
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }
                
                .overview-slide-title {
                    font-size: 0.75rem;
                    line-height: 1.4;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Export presentation as PDF (basic implementation)
    exportAsPDF() {
        // This is a basic implementation
        // For a full PDF export, you'd want to use a library like jsPDF or html2pdf
        window.print();
    }

    // Save presentation state
    saveState() {
        const state = {
            currentSlide: this.slideRenderer.currentSlide,
            timestamp: Date.now()
        };
        localStorage.setItem('abp-presentation-state', JSON.stringify(state));
    }

    // Load presentation state
    loadState() {
        const saved = localStorage.getItem('abp-presentation-state');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                // Only restore if the saved state is from today
                const savedDate = new Date(state.timestamp);
                const today = new Date();
                if (savedDate.toDateString() === today.toDateString()) {
                    this.slideRenderer.goToSlide(state.currentSlide);
                }
            } catch (e) {
                console.error('Failed to load presentation state:', e);
            }
        }
    }
} 