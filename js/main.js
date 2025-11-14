// JavaScript Principal - Site de Programação

class ProgrammingWebsite {
    constructor() {
        this.currentLanguage = 'pt-BR';
        this.currentMode = 'normal';
        this.currentTheme = 'dark';
        this.isPresentationMode = false;
        this.currentSlide = 1;
        this.totalSlides = 8;
        this.audioEnabled = false;
        this.homeAudio = null;
        this.presentationAudio = null;
        this.currentAudio = null;
        this.musicVolume = 0.3;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createGalaxyEffects();
        this.initializeAudio();
        this.loadSettings();
        this.startAnimations();
    }

    setupEventListeners() {
        // Tela de introdução
        const startBtn = document.getElementById('startBtn');
        const introScreen = document.getElementById('introScreen');
        const mainContent = document.getElementById('mainContent');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startWebsite();
            });
        }

        // Configurações
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsPanel = document.querySelector('.settings-panel');

        if (settingsToggle) {
            settingsToggle.addEventListener('click', () => {
                settingsPanel.classList.toggle('active');
            });
        }

        // Idioma
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Modos
        const modeBtns = document.querySelectorAll('.mode-btn');
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeMode(btn.dataset.mode);
                this.updateActiveButton(modeBtns, btn);
            });
        });

        // Temas
        const themeBtns = document.querySelectorAll('.theme-btn');
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeTheme(btn.dataset.theme);
                this.updateActiveButton(themeBtns, btn);
            });
        });

        // Áudio
        const audioToggle = document.getElementById('audioToggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                this.toggleAudio();
            });
        }

        // Controle de volume
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
                const volumeValue = document.getElementById('volumeValue');
                if (volumeValue) {
                    volumeValue.textContent = e.target.value + '%';
                }
            });
        }
        
        // Botão Play/Pause
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.togglePlayPause();
            });
        }
        
        // Botão Reiniciar Música
        const restartMusicBtn = document.getElementById('restartMusicBtn');
        if (restartMusicBtn) {
            restartMusicBtn.addEventListener('click', () => {
                this.restartMusic();
            });
        }
        
        // Modo Apresentação
        const presentationMode = document.getElementById('presentationMode');
        if (presentationMode) {
            presentationMode.addEventListener('click', () => {
                this.togglePresentationMode();
            });
        }

        // Navegação em modo apresentação
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const exitPresentation = document.getElementById('exitPresentation');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        if (exitPresentation) {
            exitPresentation.addEventListener('click', () => this.exitPresentationMode());
        }

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (this.isPresentationMode) {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.previousSlide();
                }
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                    e.preventDefault();
                    this.nextSlide();
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.exitPresentationMode();
                }
            }
        });

        // Tabs de código
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchCodeTab(btn.dataset.lang);
                this.updateActiveButton(tabBtns, btn);
            });
        });

        // Botões de copiar código
        const copyBtns = document.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.copyCode(btn.dataset.code);
            });
        });

        // Fechar painel de configurações ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.settings-menu')) {
                settingsPanel.classList.remove('active');
            }
        });

        // Funcionalidades Mobile
        this.setupMobileNavigation();
    }

    setupMobileNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobilePrev = document.getElementById('mobilePrev');
        const mobileNext = document.getElementById('mobileNext');
        const mobileHome = document.getElementById('mobileHome');
        const mobileSettings = document.getElementById('mobileSettings');
        const mobilePresentation = document.getElementById('mobilePresentation');

        // Toggle do menu mobile
        if (mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileNav.classList.toggle('active');
            });
        }

        // Navegação mobile
        if (mobilePrev) {
            mobilePrev.addEventListener('click', () => {
                this.previousSlide();
                mobileNav.classList.remove('active');
            });
        }

        if (mobileNext) {
            mobileNext.addEventListener('click', () => {
                this.nextSlide();
                mobileNav.classList.remove('active');
            });
        }

        if (mobileHome) {
            mobileHome.addEventListener('click', () => {
                this.showSlide(1);
                mobileNav.classList.remove('active');
            });
        }

        if (mobileSettings) {
            mobileSettings.addEventListener('click', () => {
                const settingsPanel = document.querySelector('.settings-panel');
                settingsPanel.classList.add('active');
                mobileNav.classList.remove('active');
            });
        }

        if (mobilePresentation) {
            mobilePresentation.addEventListener('click', () => {
                this.togglePresentationMode();
                mobileNav.classList.remove('active');
            });
        }

        // Fechar menu mobile ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mobile-toggle') && !e.target.closest('.mobile-nav')) {
                mobileNav.classList.remove('active');
            }
        });

        // Fechar menu mobile ao clicar em um slide
        document.addEventListener('click', (e) => {
            if (e.target.closest('.slide-content') && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });

        // Swipe gestures para mobile
        this.setupSwipeGestures();
    }

    setupSwipeGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        this.handleSwipe = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50;

            // Detectar swipe horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > minSwipeDistance) {
                    // Swipe right - slide anterior
                    this.previousSlide();
                } else if (deltaX < -minSwipeDistance) {
                    // Swipe left - próximo slide
                    this.nextSlide();
                }
            }
        };
    }

    startWebsite() {
        const introScreen = document.getElementById('introScreen');
        const mainContent = document.getElementById('mainContent');

        if (introScreen && mainContent) {
            introScreen.classList.add('hidden');
            
            setTimeout(() => {
                mainContent.classList.add('active');
                this.showSlide(1);
                this.playIntroSound();
                // Iniciar música da home se áudio estiver ativado
                if (this.audioEnabled) {
                    this.playHomeMusic();
                }
            }, 1000);
        }
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        document.documentElement.lang = lang;
        
        // Atualizar todos os elementos com atributos data-pt e data-en
        const elements = document.querySelectorAll('[data-pt][data-en]');
        elements.forEach(element => {
            const text = lang === 'pt-BR' ? element.dataset.pt : element.dataset.en;
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });

        // Atualizar o select
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = lang;
        }

        // Salvar preferência
        localStorage.setItem('language', lang);
    }

    changeMode(mode) {
        this.currentMode = mode;
        const body = document.body;
        
        // Remover classes de modo
        body.classList.remove('leve-mode', 'turbo-mode');
        
        // Adicionar nova classe de modo
        if (mode !== 'normal') {
            body.classList.add(`${mode}-mode`);
        }

        // Ajustar efeitos da galáxia
        this.adjustGalaxyEffects(mode);

        // Salvar preferência
        localStorage.setItem('mode', mode);
    }

    changeTheme(theme) {
        this.currentTheme = theme;
        const body = document.body;
        
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }

        // Salvar preferência
        localStorage.setItem('theme', theme);
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        const audioBtn = document.getElementById('audioToggle');

        if (this.audioEnabled) {
            // Tocar música apropriada baseado no modo atual
            if (this.isPresentationMode) {
                this.playPresentationMusic();
            } else {
                this.playHomeMusic();
            }
            if (audioBtn) {
                audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        } else {
            this.stopAllMusic();
            if (audioBtn) {
                audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        }

        localStorage.setItem('audioEnabled', this.audioEnabled);
    }

    togglePresentationMode() {
        if (!this.isPresentationMode) {
            this.enterPresentationMode();
        } else {
            this.exitPresentationMode();
        }
    }

    enterPresentationMode() {
        this.isPresentationMode = true;
        const body = document.body;
        const presentationNav = document.getElementById('presentationNav');

        body.classList.add('presentation-mode');
        presentationNav.classList.add('active');

        // Solicitar fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(e => {
                console.log('Fullscreen não disponível:', e);
            });
        }

        // Mostrar primeiro slide
        this.showSlide(1);
        this.updateSlideIndicator();

        // Trocar música para modo apresentação
        if (this.audioEnabled) {
            this.stopAllMusic();
            this.playPresentationMusic();
        }

        // Atualizar texto do botão
        const presentationBtn = document.getElementById('presentationMode');
        if (presentationBtn) {
            presentationBtn.innerHTML = '<i class="fas fa-stop"></i> Parar';
        }
    }

    exitPresentationMode() {
        this.isPresentationMode = false;
        const body = document.body;
        const presentationNav = document.getElementById('presentationNav');

        body.classList.remove('presentation-mode');
        presentationNav.classList.remove('active');

        // Sair do fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(e => {
                console.log('Erro ao sair do fullscreen:', e);
            });
        }

        // Resetar slides
        this.hideAllSlides();
        this.showSlide(1);

        // Trocar música de volta para home
        if (this.audioEnabled) {
            this.stopAllMusic();
            this.playHomeMusic();
        }

        // Atualizar texto do botão
        const presentationBtn = document.getElementById('presentationMode');
        if (presentationBtn) {
            presentationBtn.innerHTML = '<i class="fas fa-desktop"></i> Iniciar';
        }
    }

    showSlide(slideNumber) {
        this.hideAllSlides();
        const slide = document.getElementById(`slide${slideNumber}`);
        if (slide) {
            slide.classList.add('active');
            this.currentSlide = slideNumber;
            this.updateSlideIndicator();
            this.animateSlideContent(slide);
        }
    }

    hideAllSlides() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => slide.classList.remove('active'));
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    updateSlideIndicator() {
        const currentSlideEl = document.getElementById('currentSlide');
        const totalSlidesEl = document.getElementById('totalSlides');

        if (currentSlideEl) currentSlideEl.textContent = this.currentSlide;
        if (totalSlidesEl) totalSlidesEl.textContent = this.totalSlides;
    }

    animateSlideContent(slide) {
        const elements = slide.querySelectorAll('.topic-card, .benefit-item, .importance-item, .member-card, .advanced-benefit-card, .english-career-card, .ai-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    switchCodeTab(lang) {
        const codeBlocks = document.querySelectorAll('.code-block');
        codeBlocks.forEach(block => {
            block.classList.remove('active');
        });

        const activeBlock = document.getElementById(lang);
        if (activeBlock) {
            activeBlock.classList.add('active');
        }
    }

    copyCode(codeId) {
        const codeElement = document.getElementById(codeId);
        if (codeElement) {
            const text = codeElement.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Código copiado!');
            }).catch(err => {
                console.error('Erro ao copiar código:', err);
                this.showToast('Erro ao copiar código');
            });
        }
    }

    showToast(message) {
        // Criar toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }

    updateActiveButton(buttons, activeBtn) {
        buttons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    createGalaxyEffects() {
        const galaxyContainer = document.querySelector('.galaxy-container');
        if (!galaxyContainer) return;

        // Criar estrelas cadentes
        for (let i = 0; i < 3; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = Math.random() * 100 + '%';
            shootingStar.style.top = Math.random() * 100 + '%';
            shootingStar.style.animationDelay = i * 2 + 's';
            galaxyContainer.appendChild(shootingStar);
        }

        // Criar partículas flutuantes
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            galaxyContainer.appendChild(particle);
        }

        // Criar aurora
        const aurora = document.createElement('div');
        aurora.className = 'aurora';
        galaxyContainer.appendChild(aurora);

        // Criar wormhole
        const wormhole = document.createElement('div');
        wormhole.className = 'wormhole';
        galaxyContainer.appendChild(wormhole);
    }

    adjustGalaxyEffects(mode) {
        const galaxyContainer = document.querySelector('.galaxy-container');
        if (!galaxyContainer) return;

        switch (mode) {
            case 'leve':
                galaxyContainer.style.opacity = '0.3';
                break;
            case 'turbo':
                galaxyContainer.style.opacity = '1';
                // Adicionar mais efeitos visuais
                this.addTurboEffects();
                break;
            default:
                galaxyContainer.style.opacity = '0.7';
        }
    }

    addTurboEffects() {
        const galaxyContainer = document.querySelector('.galaxy-container');
        if (!galaxyContainer || galaxyContainer.querySelector('.turbo-effect')) return;

        // Adicionar nebulosas extras
        for (let i = 0; i < 3; i++) {
            const nebula = document.createElement('div');
            nebula.className = 'nebula turbo-effect';
            nebula.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                width: ${200 + Math.random() * 300}px;
                height: ${200 + Math.random() * 300}px;
                background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                animation: nebulaFloat ${10 + Math.random() * 10}s ease-in-out infinite alternate;
            `;
            galaxyContainer.appendChild(nebula);
        }
    }

    initializeAudio() {
        this.homeAudio = document.getElementById('homeAudio');
        this.presentationAudio = document.getElementById('presentationAudio');
        
        if (this.homeAudio) {
            this.homeAudio.volume = this.musicVolume;
            this.homeAudio.load();
        }
        
        if (this.presentationAudio) {
            this.presentationAudio.volume = this.musicVolume;
            this.presentationAudio.load();
        }
    }

    playHomeMusic() {
        if (!this.audioEnabled || !this.homeAudio) return;
        
        this.stopAllMusic();
        this.currentAudio = this.homeAudio;
        this.homeAudio.play().catch(e => console.log('Erro ao tocar música da home:', e));
        this.updatePlayPauseButton();
    }

    playPresentationMusic() {
        if (!this.audioEnabled || !this.presentationAudio) return;
        
        this.stopAllMusic();
        this.currentAudio = this.presentationAudio;
        this.presentationAudio.play().catch(e => console.log('Erro ao tocar música da apresentação:', e));
        this.updatePlayPauseButton();
    }

    stopAllMusic() {
        if (this.homeAudio) {
            this.homeAudio.pause();
            this.homeAudio.currentTime = 0;
        }
        if (this.presentationAudio) {
            this.presentationAudio.pause();
            this.presentationAudio.currentTime = 0;
        }
        this.currentAudio = null;
    }
    
    setVolume(volume) {
        this.musicVolume = volume;
        if (this.homeAudio) {
            this.homeAudio.volume = volume;
        }
        if (this.presentationAudio) {
            this.presentationAudio.volume = volume;
        }
        localStorage.setItem('musicVolume', volume);
    }
    
    togglePlayPause() {
        if (!this.currentAudio) return;
        
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (this.currentAudio.paused) {
            this.currentAudio.play().catch(e => console.log('Erro ao tocar:', e));
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        } else {
            this.currentAudio.pause();
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }
    
    restartMusic() {
        if (!this.currentAudio) return;
        
        this.currentAudio.currentTime = 0;
        if (!this.currentAudio.paused) {
            this.currentAudio.play().catch(e => console.log('Erro ao reiniciar:', e));
        }
    }
    
    updatePlayPauseButton() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (!playPauseBtn || !this.currentAudio) return;
        
        if (this.currentAudio.paused) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    playIntroSound() {
        if (!this.audioEnabled) return;

        // Criar som de introdução com Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }

    loadSettings() {
        // Carregar preferências salvas
        const savedLanguage = localStorage.getItem('language');
        const savedMode = localStorage.getItem('mode');
        const savedTheme = localStorage.getItem('theme');
        const savedAudio = localStorage.getItem('audioEnabled');

        if (savedLanguage) {
            this.changeLanguage(savedLanguage);
        }

        if (savedMode) {
            this.changeMode(savedMode);
            const modeBtn = document.querySelector(`[data-mode="${savedMode}"]`);
            if (modeBtn) {
                document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
                modeBtn.classList.add('active');
            }
        }

        if (savedTheme) {
            this.changeTheme(savedTheme);
            const themeBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (themeBtn) {
                document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
                themeBtn.classList.add('active');
            }
        }

        if (savedAudio !== null) {
            this.audioEnabled = savedAudio === 'true';
            const audioBtn = document.getElementById('audioToggle');
            if (audioBtn) {
                audioBtn.innerHTML = this.audioEnabled ? 
                    '<i class="fas fa-volume-up"></i>' : 
                    '<i class="fas fa-volume-mute"></i>';
            }
        }
        
        // Carregar volume salvo
        const savedVolume = localStorage.getItem('musicVolume');
        if (savedVolume !== null) {
            this.musicVolume = parseFloat(savedVolume);
            const volumeSlider = document.getElementById('volumeSlider');
            const volumeValue = document.getElementById('volumeValue');
            if (volumeSlider) {
                volumeSlider.value = this.musicVolume * 100;
            }
            if (volumeValue) {
                volumeValue.textContent = Math.round(this.musicVolume * 100) + '%';
            }
        }
    }

    startAnimations() {
        // Adicionar animações de entrada aos elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animatedElements = document.querySelectorAll('.topic-card, .benefit-item, .importance-item, .member-card, .advanced-benefit-card, .english-career-card, .ai-card');
        animatedElements.forEach(el => observer.observe(el));
    }
}

// Adicionar estilos CSS para animações adicionais
const additionalStyles = `
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
    }

    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #6b46c1 0%, #9333ea 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
`;

// Adicionar estilos ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar o site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ProgrammingWebsite();
});

// Exportar para uso global
window.ProgrammingWebsite = ProgrammingWebsite;
