class ProgressBar {
    constructor(slideRenderer) {
        this.slideRenderer = slideRenderer;
        this.progressBar = document.getElementById('progressBar');
        this.slideCounter = document.getElementById('slideCounter');
        this.init();
    }

    init() {
        this.updateProgress();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for slide changes
        document.addEventListener('slideChanged', () => {
            this.updateProgress();
        });

        // Add click handler to progress bar for quick navigation
        if (this.progressBar) {
            this.progressBar.addEventListener('click', (e) => {
                this.handleProgressBarClick(e);
            });
        }
    }

    updateProgress() {
        const currentSlide = this.slideRenderer.currentSlide;
        const totalSlides = this.slideRenderer.slides.length;
        const progress = ((currentSlide + 1) / totalSlides) * 100;

        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
            
            // Add smooth transition
            this.progressBar.style.transition = 'width 0.3s ease-in-out';
        }

        if (this.slideCounter) {
            this.slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }

        // Update progress bar color based on progress
        this.updateProgressColor(progress);
    }

    updateProgressColor(progress) {
        if (!this.progressBar) return;

        let color;
        if (progress < 25) {
            color = 'linear-gradient(90deg, #ef4444, #f87171)'; // Red
        } else if (progress < 50) {
            color = 'linear-gradient(90deg, #f97316, #fb923c)'; // Orange
        } else if (progress < 75) {
            color = 'linear-gradient(90deg, #eab308, #facc15)'; // Yellow
        } else {
            color = 'linear-gradient(90deg, #10b981, #34d399)'; // Green
        }

        this.progressBar.style.background = color;
    }

    handleProgressBarClick(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        const clickPercentage = (clickX / progressBarWidth) * 100;
        
        // Calculate which slide to jump to
        const totalSlides = this.slideRenderer.slides.length;
        const targetSlide = Math.floor((clickPercentage / 100) * totalSlides);
        
        // Ensure we don't go out of bounds
        const safeSlide = Math.max(0, Math.min(targetSlide, totalSlides - 1));
        
        this.slideRenderer.goToSlide(safeSlide);
    }

    // Show progress in a more detailed way
    showDetailedProgress() {
        const currentSlide = this.slideRenderer.currentSlide;
        const totalSlides = this.slideRenderer.slides.length;
        const progress = ((currentSlide + 1) / totalSlides) * 100;

        // Create detailed progress modal
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Presentation Progress</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="progress-stats">
                        <div class="stat-item">
                            <span class="stat-label">Current Slide:</span>
                            <span class="stat-value">${currentSlide + 1}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Total Slides:</span>
                            <span class="stat-value">${totalSlides}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Progress:</span>
                            <span class="stat-value">${progress.toFixed(1)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Remaining:</span>
                            <span class="stat-value">${totalSlides - (currentSlide + 1)} slides</span>
                        </div>
                    </div>
                    <div class="progress-visual">
                        <div class="progress-bar-detailed">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="progress-labels">
                            <span>Start</span>
                            <span>End</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles for detailed progress
        if (!document.getElementById('detailed-progress-styles')) {
            const style = document.createElement('style');
            style.id = 'detailed-progress-styles';
            style.textContent = `
                .progress-stats {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                
                .stat-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    background: var(--gray-50);
                    border-radius: var(--radius-lg);
                }
                
                .stat-label {
                    font-weight: 500;
                    color: var(--gray-700);
                }
                
                .stat-value {
                    font-weight: 600;
                    color: var(--primary-color);
                }
                
                .progress-visual {
                    margin-top: 1rem;
                }
                
                .progress-bar-detailed {
                    width: 100%;
                    height: 12px;
                    background: var(--gray-200);
                    border-radius: var(--radius-full);
                    overflow: hidden;
                    margin-bottom: 0.5rem;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                    border-radius: var(--radius-full);
                    transition: width 0.3s ease-in-out;
                }
                
                .progress-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: var(--font-size-sm);
                    color: var(--gray-600);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Animate progress bar
    animateProgress() {
        if (!this.progressBar) return;

        // Add animation class
        this.progressBar.classList.add('progress-animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.progressBar.classList.remove('progress-animate');
        }, 500);
    }

    // Show progress toast notification
    showProgressToast() {
        const currentSlide = this.slideRenderer.currentSlide;
        const totalSlides = this.slideRenderer.slides.length;
        const progress = ((currentSlide + 1) / totalSlides) * 100;

        const toast = document.createElement('div');
        toast.className = 'progress-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="toast-text">
                    <div class="toast-title">Progress Update</div>
                    <div class="toast-message">Slide ${currentSlide + 1} of ${totalSlides} (${progress.toFixed(1)}%)</div>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Add styles for toast
        if (!document.getElementById('progress-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'progress-toast-styles';
            style.textContent = `
                .progress-toast {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--white);
                    border: 1px solid var(--gray-200);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                    padding: 1rem;
                    z-index: 2000;
                    animation: slideInRight 0.3s ease-out;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .toast-icon {
                    width: 40px;
                    height: 40px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--white);
                }
                
                .toast-text {
                    flex: 1;
                }
                
                .toast-title {
                    font-weight: 600;
                    color: var(--gray-900);
                    margin-bottom: 0.25rem;
                }
                
                .toast-message {
                    font-size: var(--font-size-sm);
                    color: var(--gray-600);
                }
            `;
            document.head.appendChild(style);
        }

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Get progress statistics
    getProgressStats() {
        const currentSlide = this.slideRenderer.currentSlide;
        const totalSlides = this.slideRenderer.slides.length;
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        const remaining = totalSlides - (currentSlide + 1);

        return {
            currentSlide: currentSlide + 1,
            totalSlides,
            progress: progress.toFixed(1),
            remaining,
            isComplete: currentSlide === totalSlides - 1,
            isFirst: currentSlide === 0
        };
    }

    // Reset progress
    resetProgress() {
        this.slideRenderer.goToSlide(0);
        this.updateProgress();
    }

    // Jump to specific percentage
    jumpToPercentage(percentage) {
        const totalSlides = this.slideRenderer.slides.length;
        const targetSlide = Math.floor((percentage / 100) * totalSlides);
        const safeSlide = Math.max(0, Math.min(targetSlide, totalSlides - 1));
        
        this.slideRenderer.goToSlide(safeSlide);
    }
} 