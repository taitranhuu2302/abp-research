// ABP Framework Presentation App
class ABPPresentation {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = window.presentationData.slides;
        this.totalSlides = this.slides.length;
        this.isDark = false;
        this.init();
    }

    init() {
        this.createSlides();
        this.createDotPagination();
        this.setupNavigation();
        this.setupKeyboardNavigation();
        this.setupDarkMode();
        this.setupFullscreen();
        this.updateSlideIndicator();
        this.highlightCode();
    }

    createSlides() {
        const slideContainer = document.querySelector('.slide-container');
        slideContainer.innerHTML = '';
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slide${index === 0 ? ' active' : ''}`;
            slideElement.id = slide.id;
            slideElement.innerHTML = `
                <div class="slide-header">
                    <h1 class="slide-title">${slide.title}</h1>
                    <p class="slide-subtitle">${slide.subtitle}</p>
                </div>
                <div class="slide-content">
                    ${slide.content}
                </div>
            `;
            slideContainer.appendChild(slideElement);
        });
    }

    createDotPagination() {
        const dotContainer = document.getElementById('dot-pagination');
        dotContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-slide', i);
            dot.title = `Slide ${i + 1}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            dotContainer.appendChild(dot);
        }
    }

    setupNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }

    setupDarkMode() {
        const darkBtn = document.getElementById('darkmode-toggle');
        const setDark = (dark) => {
            document.body.classList.toggle('dark', dark);
            this.isDark = dark;
        };
        // Initial: check prefers-color-scheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(prefersDark);
        darkBtn.addEventListener('click', () => setDark(!this.isDark));
    }

    setupFullscreen() {
        const fullscreenBtn = document.getElementById('fullscreen-toggle');
        
        // Check if screenfull is available
        if (typeof screenfull !== 'undefined' && screenfull.isEnabled) {
            fullscreenBtn.addEventListener('click', () => {
                if (screenfull.isFullscreen) {
                    screenfull.exit();
                } else {
                    screenfull.request();
                }
            });
            
            // Update button state when fullscreen changes
            screenfull.on('change', () => {
                document.body.classList.toggle('fullscreen', screenfull.isFullscreen);
            });
        } else {
            // Fallback to CSS fullscreen if screenfull not available
            fullscreenBtn.addEventListener('click', () => {
                document.body.classList.toggle('fullscreen');
            });
            
            // Hide button if fullscreen not supported
            fullscreenBtn.style.display = 'none';
        }
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        this.currentSlideIndex = index;
        this.updateDotPagination();
        this.updateSlideIndicator();
        this.updateNavBtnState();
        this.highlightCode();
    }

    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.goToSlide(this.currentSlideIndex - 1);
        }
    }

    nextSlide() {
        if (this.currentSlideIndex < this.totalSlides - 1) {
            this.goToSlide(this.currentSlideIndex + 1);
        }
    }

    updateDotPagination() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlideIndex);
        });
    }

    updateSlideIndicator() {
        const currentSlideSpan = document.getElementById('current-slide');
        const totalSlidesSpan = document.getElementById('total-slides');
        currentSlideSpan.textContent = this.currentSlideIndex + 1;
        totalSlidesSpan.textContent = this.totalSlides;
    }

    updateNavBtnState() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        prevBtn.disabled = this.currentSlideIndex === 0;
        nextBtn.disabled = this.currentSlideIndex === this.totalSlides - 1;
    }

    highlightCode() {
        if (window.Prism) {
            Prism.highlightAll();
        }
        // Add copy button to code blocks
        document.querySelectorAll('.code-block').forEach(block => {
            if (!block.querySelector('.copy-btn')) {
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.textContent = 'Copy';
                btn.onclick = () => {
                    const code = block.querySelector('code');
                    if (code) {
                        navigator.clipboard.writeText(code.textContent);
                        btn.textContent = 'Copied!';
                        setTimeout(() => btn.textContent = 'Copy', 1200);
                    }
                };
                block.appendChild(btn);
            }
        });
    }
}

// Initialize the presentation
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new ABPPresentation();
}); 