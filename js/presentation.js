// JavaScript para Modo Apresentação

class PresentationManager {
    constructor() {
        this.isActive = false;
        this.currentSlide = 1;
        this.totalSlides = 8;
        this.autoPlay = false;
        this.autoPlayInterval = null;
        this.slideTimer = null;
        this.progressIndicator = null;
        this.keyboardShortcuts = true;
        this.touchGestures = true;
        
        this.init();
    }

    init() {
        this.createProgressIndicator();
        this.setupKeyboardShortcuts();
        this.setupTouchGestures();
        this.createPresentationControls();
        this.setupAutoAdvance();
    }

    createProgressIndicator() {
        // Criar indicador de progresso
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-dots" id="progressDots"></div>
        `;

        progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1001;
            padding: 20px;
            background: linear-gradient(180deg, rgba(26, 0, 51, 0.9) 0%, transparent 100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(progressContainer);
        this.progressIndicator = progressContainer;

        // Criar dots para cada slide
        const dotsContainer = document.getElementById('progressDots');
        if (dotsContainer) {
            for (let i = 1; i <= this.totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'progress-dot';
                dot.dataset.slide = i;
                dot.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    margin: 0 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-block;
                `;

                dot.addEventListener('click', () => {
                    this.goToSlide(i);
                });

                dotsContainer.appendChild(dot);
            }
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this.isActive || !this.keyboardShortcuts) return;

            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.exitPresentation();
                    break;
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'p':
                case 'P':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
            }
        });
    }

    setupTouchGestures() {
        if (!this.touchGestures) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            if (!this.isActive) return;
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            if (!this.isActive) return;
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        this.handleSwipe = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > minSwipeDistance) {
                    this.nextSlide();
                } else if (deltaX < -minSwipeDistance) {
                    this.previousSlide();
                }
            }
        };
    }

    createPresentationControls() {
        // Criar controles flutuantes
        const controls = document.createElement('div');
        controls.className = 'presentation-controls';
        controls.innerHTML = `
            <button class="control-btn" id="autoPlayBtn" title="Auto Play (P)">
                <i class="fas fa-play"></i>
            </button>
            <button class="control-btn" id="fullscreenBtn" title="Fullscreen (F11)">
                <i class="fas fa-expand"></i>
            </button>
            <button class="control-btn" id="gridBtn" title="Grid View (G)">
                <i class="fas fa-th"></i>
            </button>
            <button class="control-btn" id="timerBtn" title="Toggle Timer (T)">
                <i class="fas fa-clock"></i>
            </button>
        `;

        controls.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1002;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(controls);

        // Adicionar eventos aos controles
        document.getElementById('autoPlayBtn').addEventListener('click', () => this.toggleAutoPlay());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('gridBtn').addEventListener('click', () => this.showGridView());
        document.getElementById('timerBtn').addEventListener('click', () => this.toggleTimer());
    }

    setupAutoAdvance() {
        // Configurar avanço automático baseado no tempo
        this.slideTimers = {
            1: 10000, // 10 segundos para slide 1
            2: 15000, // 15 segundos para slide 2
            3: 15000, // 15 segundos para slide 3
            4: 15000, // 15 segundos para slide 4
            5: 15000, // 15 segundos para slide 5 (Novo IA)
            6: 15000, // 15 segundos para slide 6 (Novo Benefícios)
            7: 15000, // 15 segundos para slide 7 (Novo Inglês)
            8: 20000  // 20 segundos para slide 8 (Exemplos de Código)
        };
    }

    enterPresentation() {
        this.isActive = true;
        this.currentSlide = 1;
        
        // Adicionar classe ao body
        document.body.classList.add('presentation-mode');
        
        // Criar zona de gatilho para mostrar o menu
        this.createTriggerZone();
        
        // Mostrar controles
        this.showControls();
        
        // Entrar em fullscreen
        this.requestFullscreen();
        
        // Mostrar primeiro slide
        this.showSlide(1);
        
        // Atualizar navegação
        this.updateNavigation();
        
        // Iniciar timer se auto-play estiver ativo
        if (this.autoPlay) {
            this.startAutoPlay();
        }

        // Disparar evento
        this.dispatchEvent('presentationStart');
    }

    exitPresentation() {
        this.isActive = false;
        this.autoPlay = false;
        
        // Parar auto-play
        this.stopAutoPlay();
        
        // Remover classe do body
        document.body.classList.remove('presentation-mode');
        
        // Remover zona de gatilho
        this.removeTriggerZone();
        
        // Esconder controles
        this.hideControls();
        
        // Sair do fullscreen
        this.exitFullscreen();
        
        // Resetar slides
        this.hideAllSlides();
        this.showSlide(1);
        
        // Disparar evento
        this.dispatchEvent('presentationEnd');
    }

    showSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        // Esconder slide atual
        this.hideAllSlides();
        
        // Mostrar novo slide
        const slide = document.getElementById(`slide${slideNumber}`);
        if (slide) {
            slide.classList.add('active');
            this.currentSlide = slideNumber;
            
            // Animar conteúdo
            this.animateSlideContent(slide);
            
            // Atualizar progresso
            this.updateProgress();
            
            // Reiniciar timer para auto-avanço
            if (this.autoPlay) {
                this.resetSlideTimer();
            }
        }
        
        // Atualizar navegação
        this.updateNavigation();
    }

    hideAllSlides() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => slide.classList.remove('active'));
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1);
        } else {
            // Se estiver no último slide, sair da apresentação
            if (this.autoPlay) {
                this.exitPresentation();
            }
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        this.showSlide(slideNumber);
    }

    animateSlideContent(slide) {
        const elements = slide.querySelectorAll('[data-animate]');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressDots = document.querySelectorAll('.progress-dot');
        
        if (progressFill) {
            const percentage = (this.currentSlide / this.totalSlides) * 100;
            progressFill.style.width = percentage + '%';
        }
        
        progressDots.forEach(dot => {
            if (parseInt(dot.dataset.slide) === this.currentSlide) {
                dot.style.background = 'var(--accent-light)';
                dot.style.transform = 'scale(1.2)';
            } else {
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
            }
        });
    }

    updateNavigation() {
        const currentSlideEl = document.getElementById('currentSlide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (currentSlideEl) {
            currentSlideEl.textContent = this.currentSlide;
        }
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
        
        // Adicionar event listeners aos botões
        if (prevBtn && !prevBtn.hasListener) {
            prevBtn.addEventListener('click', () => this.previousSlide());
            prevBtn.hasListener = true;
        }
        
        if (nextBtn && !nextBtn.hasListener) {
            nextBtn.addEventListener('click', () => this.nextSlide());
            nextBtn.hasListener = true;
        }
        
        const exitBtn = document.getElementById('exitPresentation');
        if (exitBtn && !exitBtn.hasListener) {
            exitBtn.addEventListener('click', () => this.exitPresentation());
            exitBtn.hasListener = true;
        }
    }

    toggleAutoPlay() {
        this.autoPlay = !this.autoPlay;
        const autoPlayBtn = document.getElementById('autoPlayBtn');
        
        if (autoPlayBtn) {
            if (this.autoPlay) {
                autoPlayBtn.style.background = 'var(--accent-light)';
                this.startAutoPlay();
            } else {
                autoPlayBtn.style.background = 'var(--card-bg)';
                this.stopAutoPlay();
            }
        }
    }

    startAutoPlay() {
        if (this.autoPlay) {
            const timer = this.slideTimers[this.currentSlide] || 10000;
            this.slideTimer = setTimeout(() => {
                this.nextSlide();
            }, timer);
        }
    }

    stopAutoPlay() {
        if (this.slideTimer) {
            clearTimeout(this.slideTimer);
            this.slideTimer = null;
        }
    }

    resetSlideTimer() {
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    showControls() {
        const controls = document.querySelector('.presentation-controls');
        const progress = this.progressIndicator;
        const nav = document.getElementById('presentationNav');
        
        if (controls) {
            controls.style.opacity = '1';
            controls.style.visibility = 'visible';
        }
        
        if (progress) {
            progress.style.opacity = '1';
            progress.style.visibility = 'visible';
        }
        
        if (nav) {
            nav.classList.add('active');
        }
    }

    hideControls() {
        const controls = document.querySelector('.presentation-controls');
        const progress = this.progressIndicator;
        const nav = document.getElementById('presentationNav');
        
        if (controls) {
            controls.style.opacity = '0';
            controls.style.visibility = 'hidden';
        }
        
        if (progress) {
            progress.style.opacity = '0';
            progress.style.visibility = 'hidden';
        }
        
        if (nav) {
            nav.classList.remove('active');
        }
    }

    createTriggerZone() {
        // Remover zona anterior se existir
        this.removeTriggerZone();
        
        // Criar zona de gatilho
        const triggerZone = document.createElement('div');
        triggerZone.className = 'presentation-nav-trigger-zone';
        triggerZone.id = 'presentationNavTrigger';
        document.body.appendChild(triggerZone);
        
        // Adicionar eventos de clique ao menu de navegacao
        const nav = document.getElementById('presentationNav');
        if (nav) {
            let clickCount = 0;
            let clickTimer = null;
            
            nav.addEventListener('click', (e) => {
                // Nao contar cliques nos botoes de acao
                if (e.target.closest('.nav-btn')) {
                    return;
                }
                
                clickCount++;
                
                if (clickCount === 1) {
                    // Primeiro clique: fixar o menu
                    clickTimer = setTimeout(() => {
                        if (clickCount === 1) {
                            nav.classList.toggle('pinned');
                        }
                        clickCount = 0;
                    }, 250);
                } else if (clickCount === 2) {
                    // Clique duplo: ocultar o menu
                    clearTimeout(clickTimer);
                    nav.classList.remove('pinned');
                    clickCount = 0;
                }
            });
        }
    }

    removeTriggerZone() {
        const triggerZone = document.getElementById('presentationNavTrigger');
        if (triggerZone) {
            triggerZone.remove();
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.requestFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    showGridView() {
        // Criar visualização em grade de todos os slides
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'grid-overlay';
        gridOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
            overflow-y: auto;
        `;
        
        // Criar thumbnails de slides
        for (let i = 1; i <= this.totalSlides; i++) {
            const slide = document.getElementById(`slide${i}`);
            if (slide) {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'slide-thumbnail';
                thumbnail.style.cssText = `
                    background: var(--card-bg);
                    border: 2px solid var(--border-color);
                    border-radius: 10px;
                    padding: 15px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                thumbnail.innerHTML = `
                    <h3 style="color: var(--text-primary); margin-bottom: 10px;">Slide ${i}</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">${slide.innerText.substring(0, 100)}...</p>
                `;
                
                thumbnail.addEventListener('click', () => {
                    this.goToSlide(i);
                    gridOverlay.remove();
                });
                
                thumbnail.addEventListener('mouseover', () => {
                    thumbnail.style.borderColor = 'var(--accent-light)';
                    thumbnail.style.transform = 'scale(1.05)';
                });
                
                thumbnail.addEventListener('mouseout', () => {
                    thumbnail.style.borderColor = 'var(--border-color)';
                    thumbnail.style.transform = 'scale(1)';
                });
                
                gridOverlay.appendChild(thumbnail);
            }
        }
        
        document.body.appendChild(gridOverlay);
        
        // Fechar ao clicar fora
        gridOverlay.addEventListener('click', (e) => {
            if (e.target === gridOverlay) {
                gridOverlay.remove();
            }
        });
    }

    toggleTimer() {
        if (this.presentationTimer) {
            this.stopPresentationTimer();
        } else {
            this.startPresentationTimer();
        }
    }

    startPresentationTimer() {
        const startTime = Date.now();
        
        this.presentationTimer = document.createElement('div');
        this.presentationTimer.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 10px 20px;
            border-radius: 25px;
            font-family: 'Space Mono', monospace;
            font-size: 14px;
            z-index: 1002;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(this.presentationTimer);

        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            this.presentationTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopPresentationTimer() {
        if (this.presentationTimer) {
            document.body.removeChild(this.presentationTimer);
            this.presentationTimer = null;
        }
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    dispatchEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                currentSlide: this.currentSlide,
                totalSlides: this.totalSlides,
                isActive: this.isActive
            }
        });
        
        document.dispatchEvent(event);
    }
}

// Adicionar estilos CSS para o modo apresentação
const presentationStyles = `
    .progress-container {
        backdrop-filter: blur(10px);
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin-bottom: 15px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
        transition: width 0.5s ease;
        border-radius: 2px;
    }

    .progress-dots {
        text-align: center;
    }

    .progress-dot {
        transition: all 0.3s ease;
    }

    .progress-dot:hover {
        background: var(--accent-light) !important;
        transform: scale(1.2) !important;
    }

    .presentation-controls {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .control-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .control-btn:hover {
        background: var(--accent-light);
        transform: scale(1.1);
    }

    .control-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .grid-overlay {
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .slide-thumbnail {
        transition: all 0.3s ease;
    }

    .slide-thumbnail:hover {
        box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
    }

    @media (max-width: 768px) {
        .presentation-controls {
            bottom: 80px;
            right: 10px;
        }

        .control-btn {
            width: 40px;
            height: 40px;
            font-size: 0.9rem;
        }

        .slide-thumbnail {
            width: 150px;
            height: 120px;
            margin: 5px;
        }
    }
`;

// Adicionar estilos ao documento
const presentationStyleSheet = document.createElement('style');
presentationStyleSheet.textContent = presentationStyles;
document.head.appendChild(presentationStyleSheet);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.presentationManager = new PresentationManager();
});

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresentationManager;
}
