class Animations {
    constructor() {
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupAnimationStyles();
        this.setupIntersectionObserver();
    }

    setupAnimationStyles() {
        if (document.getElementById('animation-styles')) return;

        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            /* Slide transitions */
            .slide-enter {
                opacity: 0;
                transform: translateX(50px);
            }
            
            .slide-enter-active {
                opacity: 1;
                transform: translateX(0);
                transition: all 0.5s ease-out;
            }
            
            .slide-exit {
                opacity: 1;
                transform: translateX(0);
            }
            
            .slide-exit-active {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.3s ease-in;
            }
            
            /* Fade animations */
            .fade-in {
                animation: fadeIn 0.6s ease-out;
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease-out;
            }
            
            .fade-in-down {
                animation: fadeInDown 0.6s ease-out;
            }
            
            .fade-in-left {
                animation: fadeInLeft 0.6s ease-out;
            }
            
            .fade-in-right {
                animation: fadeInRight 0.6s ease-out;
            }
            
            /* Scale animations */
            .scale-in {
                animation: scaleIn 0.5s ease-out;
            }
            
            .scale-in-up {
                animation: scaleInUp 0.5s ease-out;
            }
            
            /* Bounce animations */
            .bounce-in {
                animation: bounceIn 0.8s ease-out;
            }
            
            .bounce-in-up {
                animation: bounceInUp 0.8s ease-out;
            }
            
            /* Slide animations */
            .slide-in-up {
                animation: slideInUp 0.6s ease-out;
            }
            
            .slide-in-down {
                animation: slideInDown 0.6s ease-out;
            }
            
            .slide-in-left {
                animation: slideInLeft 0.6s ease-out;
            }
            
            .slide-in-right {
                animation: slideInRight 0.6s ease-out;
            }
            
            /* Stagger animations */
            .stagger-item {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .stagger-item.animate {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.4s ease-out;
            }
            
            /* Keyframes */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes scaleInUp {
                from {
                    opacity: 0;
                    transform: scale(0.8) translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes bounceInUp {
                0% {
                    opacity: 0;
                    transform: translateY(300px);
                }
                60% {
                    opacity: 1;
                    transform: translateY(-20px);
                }
                80% {
                    transform: translateY(10px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(100px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateY(-100px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            /* Hover animations */
            .hover-lift {
                transition: transform 0.2s ease-out;
            }
            
            .hover-lift:hover {
                transform: translateY(-4px);
            }
            
            .hover-scale {
                transition: transform 0.2s ease-out;
            }
            
            .hover-scale:hover {
                transform: scale(1.05);
            }
            
            .hover-glow {
                transition: box-shadow 0.2s ease-out;
            }
            
            .hover-glow:hover {
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            }
            
            /* Loading animations */
            .loading-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }
            
            .loading-bounce {
                animation: bounce 1s infinite;
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0, 0, 0);
                }
                40%, 43% {
                    transform: translate3d(0, -30px, 0);
                }
                70% {
                    transform: translate3d(0, -15px, 0);
                }
                90% {
                    transform: translate3d(0, -4px, 0);
                }
            }
            
            /* Progress animations */
            .progress-animate {
                animation: progressPulse 0.5s ease-out;
            }
            
            @keyframes progressPulse {
                0% {
                    transform: scaleX(1);
                }
                50% {
                    transform: scaleX(1.02);
                }
                100% {
                    transform: scaleX(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);
    }

    // Animate slide transition
    animateSlideTransition(fromSlide, toSlide, direction = 'next') {
        return new Promise((resolve) => {
            const slideContainer = document.querySelector('.slide-wrapper');
            
            // Add transition classes
            if (fromSlide) {
                fromSlide.classList.add('slide-exit');
            }
            
            if (toSlide) {
                toSlide.classList.add('slide-enter');
                toSlide.style.display = 'block';
            }
            
            // Trigger reflow
            slideContainer.offsetHeight;
            
            // Start animations
            if (fromSlide) {
                fromSlide.classList.add('slide-exit-active');
            }
            
            if (toSlide) {
                toSlide.classList.add('slide-enter-active');
            }
            
            // Clean up after animation
            setTimeout(() => {
                if (fromSlide) {
                    fromSlide.classList.remove('slide-exit', 'slide-exit-active');
                    fromSlide.style.display = 'none';
                }
                
                if (toSlide) {
                    toSlide.classList.remove('slide-enter', 'slide-enter-active');
                }
                
                resolve();
            }, 500);
        });
    }

    // Animate individual element
    animateElement(element, animation = 'fade-in', delay = 0) {
        if (!element) return;

        setTimeout(() => {
            element.classList.add(animation);
            
            // Remove animation class after completion
            const duration = this.getAnimationDuration(animation);
            setTimeout(() => {
                element.classList.remove(animation);
            }, duration);
        }, delay);
    }

    // Animate list of elements with stagger
    animateStagger(elements, animation = 'fade-in-up', staggerDelay = 100) {
        if (!elements || elements.length === 0) return;

        elements.forEach((element, index) => {
            const delay = index * staggerDelay;
            this.animateElement(element, animation, delay);
        });
    }

    // Animate feature cards
    animateFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        this.animateStagger(cards, 'scale-in-up', 150);
    }

    // Animate list items
    animateListItems() {
        const items = document.querySelectorAll('.list-item');
        this.animateStagger(items, 'fade-in-left', 100);
    }

    // Animate architecture layers
    animateArchitectureLayers() {
        const layers = document.querySelectorAll('.layer');
        this.animateStagger(layers, 'slide-in-up', 200);
    }

    // Animate comparison table rows
    animateTableRows() {
        const rows = document.querySelectorAll('.comparison-table tbody tr');
        this.animateStagger(rows, 'fade-in', 50);
    }

    // Animate progress bar
    animateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.classList.add('progress-animate');
            setTimeout(() => {
                progressBar.classList.remove('progress-animate');
            }, 500);
        }
    }

    // Add hover effects to interactive elements
    addHoverEffects() {
        const interactiveElements = document.querySelectorAll('.feature-card, .list-item, .btn, .card');
        
        interactiveElements.forEach(element => {
            element.classList.add('hover-lift', 'hover-glow');
        });
    }

    // Animate text typing effect
    typeText(element, text, speed = 50) {
        if (!element || !text) return;

        element.textContent = '';
        let index = 0;

        const typeNextChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeNextChar, speed);
            }
        };

        typeNextChar();
    }

    // Animate counter
    animateCounter(element, target, duration = 1000) {
        if (!element) return;

        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Get animation duration
    getAnimationDuration(animation) {
        const durations = {
            'fade-in': 600,
            'fade-in-up': 600,
            'fade-in-down': 600,
            'fade-in-left': 600,
            'fade-in-right': 600,
            'scale-in': 500,
            'scale-in-up': 500,
            'bounce-in': 800,
            'bounce-in-up': 800,
            'slide-in-up': 600,
            'slide-in-down': 600,
            'slide-in-left': 600,
            'slide-in-right': 600
        };

        return durations[animation] || 600;
    }

    // Observe element for animation
    observeElement(element) {
        if (this.observer && element) {
            this.observer.observe(element);
        }
    }

    // Unobserve element
    unobserveElement(element) {
        if (this.observer && element) {
            this.observer.unobserve(element);
        }
    }

    // Add loading animation
    addLoadingAnimation(element) {
        if (!element) return;

        element.classList.add('loading-pulse');
    }

    // Remove loading animation
    removeLoadingAnimation(element) {
        if (!element) return;

        element.classList.remove('loading-pulse');
    }

    // Animate slide content based on slide type
    animateSlideContent(slideElement) {
        if (!slideElement) return;

        // Add base animation
        slideElement.classList.add('fade-in');

        // Animate specific content based on slide type
        const slideType = this.getSlideType(slideElement);

        switch (slideType) {
            case 'features':
                setTimeout(() => this.animateFeatureCards(), 300);
                break;
            case 'list':
                setTimeout(() => this.animateListItems(), 300);
                break;
            case 'architecture':
                setTimeout(() => this.animateArchitectureLayers(), 300);
                break;
            case 'comparison':
                setTimeout(() => this.animateTableRows(), 300);
                break;
            case 'pros-cons':
                setTimeout(() => this.animateProsCons(), 300);
                break;
        }

        // Add hover effects
        setTimeout(() => this.addHoverEffects(), 600);
    }

    // Get slide type from element
    getSlideType(slideElement) {
        const classes = slideElement.className;
        
        if (classes.includes('slide-features')) return 'features';
        if (classes.includes('slide-list')) return 'list';
        if (classes.includes('slide-architecture')) return 'architecture';
        if (classes.includes('slide-comparison')) return 'comparison';
        if (classes.includes('pros-cons')) return 'pros-cons';
        
        return 'default';
    }

    // Animate pros and cons sections
    animateProsCons() {
        const pros = document.querySelector('.pros');
        const cons = document.querySelector('.cons');
        
        if (pros) this.animateElement(pros, 'slide-in-left', 100);
        if (cons) this.animateElement(cons, 'slide-in-right', 200);
    }

    // Clean up animations
    cleanup() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
} 