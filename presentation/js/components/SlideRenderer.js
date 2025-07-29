class SlideRenderer {
    constructor() {
        this.currentSlide = 0;
        this.slides = slidesData.slides;
        this.slideWrapper = document.getElementById('slideWrapper');
    }

    // Render slide based on type
    renderSlide(slideIndex) {
        const slide = this.slides[slideIndex];
        if (!slide) return;

        this.slideWrapper.innerHTML = '';
        
        switch (slide.type) {
            case 'title':
                this.renderTitleSlide(slide);
                break;
            case 'content':
                this.renderContentSlide(slide);
                break;
            case 'architecture':
                this.renderArchitectureSlide(slide);
                break;
            case 'features':
                this.renderFeaturesSlide(slide);
                break;
            case 'two-column':
                this.renderTwoColumnSlide(slide);
                break;
            case 'three-column':
                this.renderThreeColumnSlide(slide);
                break;
            case 'code':
                this.renderCodeSlide(slide);
                break;
            case 'comparison':
                this.renderComparisonSlide(slide);
                break;
            case 'pros-cons':
                this.renderProsConsSlide(slide);
                break;
            case 'list':
                this.renderListSlide(slide);
                break;
            default:
                this.renderDefaultSlide(slide);
        }

        // Add slide class and make it active
        const slideElement = this.slideWrapper.firstElementChild;
        if (slideElement) {
            slideElement.classList.add('slide', 'active');
        }
    }

    // Title slide
    renderTitleSlide(slide) {
        const html = `
            <div class="slide-title">
                <h1>${slide.title}</h1>
                <div class="subtitle">${slide.subtitle}</div>
                <div class="author">${slidesData.author}</div>
                ${slide.content.description ? `<p class="mt-6">${slide.content.description}</p>` : ''}
                ${slide.content.version ? `<div class="badge badge-primary mt-4">${slide.content.version}</div>` : ''}
                ${this.renderFeaturesList(slide.content.features)}
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Content slide
    renderContentSlide(slide) {
        let sectionsHtml = '';
        
        if (slide.content.sections) {
            sectionsHtml = slide.content.sections.map(section => `
                <div class="mb-6">
                    <h3>${section.title}</h3>
                    <p class="mb-4">${section.description}</p>
                    ${section.points ? this.renderPointsList(section.points) : ''}
                </div>
            `).join('');
        }

        const html = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
                ${sectionsHtml}
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Architecture slide
    renderArchitectureSlide(slide) {
        const layersHtml = slide.content.layers.map(layer => `
            <div class="layer">
                <h4><i class="${layer.icon}"></i> ${layer.name}</h4>
                <p>${layer.description}</p>
            </div>
        `).join('');

        const html = `
            <div class="slide-architecture">
                <h2>${slide.title}</h2>
                <div class="architecture-diagram">
                    ${layersHtml}
                </div>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Features slide
    renderFeaturesSlide(slide) {
        const featuresHtml = slide.content.features.map(feature => `
            <div class="feature-card">
                <div class="icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            </div>
        `).join('');

        const html = `
            <div class="slide-features">
                <h2>${slide.title}</h2>
                <div class="feature-grid">
                    ${featuresHtml}
                </div>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Two column slide
    renderTwoColumnSlide(slide) {
        const leftItems = slide.content.left.items.map(item => `<li>${item}</li>`).join('');
        const rightItems = slide.content.right.items.map(item => `<li>${item}</li>`).join('');

        const html = `
            <div class="slide-two-column">
                <div class="column column-left">
                    <h3>${slide.content.left.title}</h3>
                    <ul class="list-disc pl-6">
                        ${leftItems}
                    </ul>
                </div>
                <div class="column column-right">
                    <h3>${slide.content.right.title}</h3>
                    <ul class="list-disc pl-6">
                        ${rightItems}
                    </ul>
                </div>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Three column slide
    renderThreeColumnSlide(slide) {
        const columnsHtml = slide.content.columns.map(column => `
            <div class="column">
                <h4>${column.title}</h4>
                <p>${column.description}</p>
            </div>
        `).join('');

        const html = `
            <div class="slide-three-column">
                <h2>${slide.title}</h2>
                ${columnsHtml}
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Code slide
    renderCodeSlide(slide) {
        const html = `
            <div class="slide-code">
                <h2>${slide.title}</h2>
                <div class="code-container">
                    <div class="code-header">
                        <span class="language">${slide.content.language}</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="code-content">
                        <pre><code>${this.escapeHtml(slide.content.code)}</code></pre>
                    </div>
                </div>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
        
        // Initialize syntax highlighting
        if (window.hljs) {
            hljs.highlightAll();
        }
    }

    // Comparison slide
    renderComparisonSlide(slide) {
        const headersHtml = slide.content.headers.map(header => `<th>${header}</th>`).join('');
        const rowsHtml = slide.content.rows.map(row => `
            <tr>
                ${row.map((cell, index) => 
                    `<td class="${index === 0 ? 'font-weight-bold' : ''}">${cell}</td>`
                ).join('')}
            </tr>
        `).join('');

        const html = `
            <div class="slide-comparison">
                <h2>${slide.title}</h2>
                <table class="comparison-table">
                    <thead>
                        <tr>${headersHtml}</tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Pros and Cons slide
    renderProsConsSlide(slide) {
        const prosHtml = slide.content.pros.map(pro => `<li>${pro}</li>`).join('');
        const consHtml = slide.content.cons.map(con => `<li>${con}</li>`).join('');

        const html = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <div class="pros-cons">
                    <div class="pros">
                        <h3><i class="fas fa-check-circle"></i> Ưu điểm</h3>
                        <ul>${prosHtml}</ul>
                    </div>
                    <div class="cons">
                        <h3><i class="fas fa-times-circle"></i> Nhược điểm</h3>
                        <ul>${consHtml}</ul>
                    </div>
                </div>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // List slide
    renderListSlide(slide) {
        const suitableHtml = slide.content.suitable.map(item => `
            <div class="list-item">
                <div class="icon">
                    <i class="fas fa-check text-success"></i>
                </div>
                <div class="content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        const notSuitableHtml = slide.content.notSuitable.map(item => `
            <div class="list-item">
                <div class="icon">
                    <i class="fas fa-times text-danger"></i>
                </div>
                <div class="content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        const html = `
            <div class="slide-list">
                <h2>${slide.title}</h2>
                <div class="list-container">
                    <h3 class="text-success mb-4"><i class="fas fa-thumbs-up"></i> Phù hợp cho:</h3>
                    ${suitableHtml}
                    <h3 class="text-danger mb-4 mt-6"><i class="fas fa-thumbs-down"></i> Không phù hợp cho:</h3>
                    ${notSuitableHtml}
                </div>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Default slide
    renderDefaultSlide(slide) {
        const html = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.content || 'No content available'}</p>
            </div>
        `;
        this.slideWrapper.innerHTML = html;
    }

    // Helper methods
    renderFeaturesList(features) {
        if (!features || features.length === 0) return '';
        
        const featuresHtml = features.map(feature => `<li>${feature}</li>`).join('');
        return `
            <ul class="feature-list mt-6">
                ${featuresHtml}
            </ul>
        `;
    }

    renderPointsList(points) {
        if (!points || points.length === 0) return '';
        
        const pointsHtml = points.map(point => `<li>${point}</li>`).join('');
        return `
            <ul class="list-disc pl-6">
                ${pointsHtml}
            </ul>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Navigation methods
    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.renderSlide(this.currentSlide);
            this.updateNavigation();
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.renderSlide(this.currentSlide);
            this.updateNavigation();
        }
    }

    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.slides.length) {
            this.currentSlide = slideIndex;
            this.renderSlide(this.currentSlide);
            this.updateNavigation();
        }
    }

    updateNavigation() {
        // Update slide counter
        const counter = document.getElementById('slideCounter');
        if (counter) {
            counter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
        }

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.slides.length - 1;
        }

        // Update dots
        this.updateDots();
    }

    updateDots() {
        const dotsContainer = document.querySelector('.slide-dots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === this.currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Initialize
    init() {
        this.renderSlide(0);
        this.updateNavigation();
        this.updateDots();
    }
}

// Global function for copying code
function copyCode(button) {
    const codeElement = button.closest('.code-container').querySelector('code');
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        
        icon.className = 'fas fa-check';
        button.style.color = '#10b981';
        
        setTimeout(() => {
            icon.className = originalClass;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
    });
} 