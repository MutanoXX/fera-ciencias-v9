// JavaScript para Efeitos da Galáxia 3D - MELHORADO EXTREMO

class GalaxyEffects {
    constructor() {
        this.container = document.querySelector('.galaxy-container');
        this.mouseX = 0;
        this.mouseY = 0;
        this.isInitialized = false;
        this.particles = [];
        this.isMobile = this.detectMobile();
        this.performanceMode = 'normal'; // light, normal, extreme
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.createInteractiveEffects();
        this.setupMouseTracking();
        this.createDynamicStars();
        this.initializeGalaxyRotation();
        this.createAdvancedParticles();
        this.createRealtimeEffects();
        this.initializePerformanceMonitoring();
        this.isInitialized = true;
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    createInteractiveEffects() {
        // Criar camada interativa que responde ao mouse
        const interactiveLayer = document.createElement('div');
        interactiveLayer.className = 'interactive-layer';
        interactiveLayer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        `;
        
        this.container.appendChild(interactiveLayer);
        
        // Criar partículas que respondem ao mouse
        this.createMouseParticles();
        
        // Criar efeito de ripple no mouse
        this.createMouseRipples();
    }

    createMouseParticles() {
        const particleCount = this.isMobile ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'mouse-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${this.isMobile ? '3px' : '4px'};
                height: ${this.isMobile ? '3px' : '4px'};
                background: radial-gradient(circle, rgba(196, 132, 252, 0.9), rgba(147, 51, 234, 0.6));
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 0 ${this.isMobile ? '8px' : '15px'} rgba(196, 132, 252, 0.8);
                z-index: 10;
            `;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createMouseRipples() {
        // Criar efeito de ripple que segue o mouse
        const ripple = document.createElement('div');
        ripple.className = 'mouse-ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(196, 132, 252, 0.5);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: all 0.5s ease;
            z-index: 6;
        `;
        
        this.container.appendChild(ripple);
        this.mouseRipple = ripple;
    }

    setupMouseTracking() {
        if (this.isMobile) {
            this.setupTouchTracking();
        } else {
            this.setupDesktopTracking();
        }
    }

    setupDesktopTracking() {
        document.addEventListener('mousemove', (e) => {
            if (!this.isInitialized) return;
            
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
            
            this.updateGalaxyRotation();
            this.updateMouseParticles(e.clientX, e.clientY);
            this.updateMouseRipple(e.clientX, e.clientY);
            this.updateParallax(e.clientX, e.clientY);
        });

        document.addEventListener('mousedown', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }

    setupTouchTracking() {
        document.addEventListener('touchmove', (e) => {
            if (!this.isInitialized) return;
            
            const touch = e.touches[0];
            this.mouseX = touch.clientX / window.innerWidth;
            this.mouseY = touch.clientY / window.innerHeight;
            
            this.updateGalaxyRotation();
            this.updateTouchParticles(touch.clientX, touch.clientY);
            this.updateParallax(touch.clientX, touch.clientY);
        });

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.createClickEffect(touch.clientX, touch.clientY);
        });
    }

    updateGalaxyRotation() {
        const galaxy3d = document.querySelector('.galaxy-3d');
        if (!galaxy3d) return;
        
        // Calcular rotação baseada na posição do mouse
        const rotateX = 60 + (this.mouseY - 0.5) * 30;
        const rotateZ = (this.mouseX - 0.5) * 45;
        const rotateY = (this.mouseX - 0.5) * 20;
        
        galaxy3d.style.transform = `
            translate(-50%, -50%) 
            rotateX(${rotateX}deg) 
            rotateZ(${rotateZ}deg)
            rotateY(${rotateY}deg)
            scale(${1 + Math.abs(this.mouseX - 0.5) * 0.2})
        `;
    }

    updateMouseParticles(mouseX, mouseY) {
        this.particles.forEach((particle, index) => {
            const delay = index * 0.02;
            const offsetX = (Math.random() - 0.5) * 150;
            const offsetY = (Math.random() - 0.5) * 150;
            const scale = 0.5 + Math.random() * 1.5;
            
            setTimeout(() => {
                particle.style.left = (mouseX + offsetX) + 'px';
                particle.style.top = (mouseY + offsetY) + 'px';
                particle.style.opacity = '0.8';
                particle.style.transform = `scale(${scale})`;
                
                setTimeout(() => {
                    particle.style.opacity = '0';
                    particle.style.transform = 'scale(0.5)';
                }, 800);
            }, delay * 1000);
        });
    }

    updateTouchParticles(touchX, touchY) {
        const particleSubset = this.particles.slice(0, 15);
        
        particleSubset.forEach((particle, index) => {
            const delay = index * 0.03;
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;
            
            setTimeout(() => {
                particle.style.left = (touchX + offsetX) + 'px';
                particle.style.top = (touchY + offsetY) + 'px';
                particle.style.opacity = '0.6';
                
                setTimeout(() => {
                    particle.style.opacity = '0';
                }, 600);
            }, delay * 1000);
        });
    }

    updateMouseRipple(mouseX, mouseY) {
        if (!this.mouseRipple) return;
        
        this.mouseRipple.style.left = mouseX + 'px';
        this.mouseRipple.style.top = mouseY + 'px';
        this.mouseRipple.style.opacity = '0.6';
        this.mouseRipple.style.width = '80px';
        this.mouseRipple.style.height = '80px';
        
        setTimeout(() => {
            this.mouseRipple.style.opacity = '0';
            this.mouseRipple.style.width = '100px';
            this.mouseRipple.style.height = '100px';
        }, 300);
    }

    updateParallax(mouseX, mouseY) {
        const layers = ['.stars', '.stars2', '.stars3', '.nebula'];
        
        layers.forEach((layer, index) => {
            const element = document.querySelector(layer);
            if (!element) return;
            
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%) scale(0);
            animation: clickPulse 0.6s ease-out;
            z-index: 20;
        `;
        
        this.container.appendChild(effect);
        
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 600);
    }

    createDynamicStars() {
        const starContainer = document.createElement('div');
        starContainer.className = 'dynamic-stars';
        starContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        this.container.appendChild(starContainer);
        
        // Gerar estrelas dinâmicas
        this.generateDynamicStars(starContainer);
        
        // Criar constelações
        this.createConstellations(starContainer);
    }

    generateDynamicStars(container) {
        const createStar = () => {
            const star = document.createElement('div');
            star.className = 'dynamic-star';
            
            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 2;
            
            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: 0;
                box-shadow: 0 0 ${size * 3}px rgba(255, 255, 255, 0.8);
                animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            container.appendChild(star);
            
            // Remover estrela após a animação
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, (duration + delay) * 1000);
        };
        
        // Criar estrelas periodicamente
        const interval = this.isMobile ? 800 : 500;
        setInterval(createStar, interval);
    }

    createConstellations(container) {
        const createConstellation = () => {
            const constellation = document.createElement('div');
            constellation.className = 'constellation';
            
            const points = [];
            const numPoints = Math.floor(Math.random() * 4) + 3;
            
            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: Math.random() * 100,
                    y: Math.random() * 100
                });
            }
            
            // Criar linhas entre pontos
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: 0.3;
                animation: constellationFade 8s ease-in-out infinite;
            `;
            
            for (let i = 0; i < points.length - 1; i++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', `${points[i].x}%`);
                line.setAttribute('y1', `${points[i].y}%`);
                line.setAttribute('x2', `${points[i + 1].x}%`);
                line.setAttribute('y2', `${points[i + 1].y}%`);
                line.setAttribute('stroke', 'rgba(196, 132, 252, 0.6)');
                line.setAttribute('stroke-width', '1');
                
                svg.appendChild(line);
            }
            
            constellation.appendChild(svg);
            container.appendChild(constellation);
            
            // Remover constelação após algum tempo
            setTimeout(() => {
                if (constellation.parentNode) {
                    constellation.parentNode.removeChild(constellation);
                }
            }, 8000);
        };
        
        // Criar constelações periodicamente
        setInterval(createConstellation, 5000);
    }

    initializeGalaxyRotation() {
        // Adicionar rotação suave à galáxia
        const galaxy3d = document.querySelector('.galaxy-3d');
        if (!galaxy3d) return;
        
        // Adicionar anéis extras para efeito 3D
        this.createExtraRings();
        
        // Adicionar efeito de pulsação ao núcleo
        this.pulseGalaxyCore();
        
        // Adicionar rotação dinâmica baseada em tempo
        this.addTimeBasedRotation();
    }

    createExtraRings() {
        const galaxy3d = document.querySelector('.galaxy-3d');
        if (!galaxy3d) return;
        
        for (let i = 0; i < 5; i++) {
            const ring = document.createElement('div');
            ring.className = 'galaxy-ring extra-ring';
            ring.style.cssText = `
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(147, 51, 234, ${0.3 - i * 0.05});
                width: ${90 - i * 10}%;
                height: ${90 - i * 10}%;
                top: ${5 + i * 5}%;
                left: ${5 + i * 5}%;
                transform: rotateX(${20 + i * 10}deg) rotateZ(${i * 20}deg) rotateY(${i * 15}deg);
                animation: ringPulse ${3 + i * 0.3}s ease-in-out infinite ${i * 0.2}s;
                box-shadow: 0 0 30px rgba(147, 51, 234, ${0.2 - i * 0.03});
                --rotation: ${20 + i * 10}deg;
                --rotation-y: ${i * 15}deg;
            `;
            
            galaxy3d.appendChild(ring);
        }
    }

    pulseGalaxyCore() {
        const core = document.querySelector('.galaxy-core');
        if (!core) return;
        
        // Adicionar múltiplas camadas de brilho
        for (let i = 0; i < 5; i++) {
            const glow = document.createElement('div');
            glow.className = 'core-glow';
            glow.style.cssText = `
                position: absolute;
                width: ${120 + i * 40}px;
                height: ${120 + i * 40}px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: radial-gradient(circle, 
                    rgba(196, 132, 252, ${0.4 - i * 0.08}) 0%, 
                    transparent 70%);
                border-radius: 50%;
                animation: coreGlowPulse ${2.5 + i * 0.5}s ease-in-out infinite ${i * 0.3}s;
                pointer-events: none;
                filter: blur(${i * 2}px);
            `;
            
            core.appendChild(glow);
        }
        
        // Adicionar partículas ao redor do núcleo
        this.createCoreParticles();
    }

    createCoreParticles() {
        const core = document.querySelector('.galaxy-core');
        if (!core) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'core-particle';
            
            const angle = (i / 20) * Math.PI * 2;
            const radius = 60 + Math.random() * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                left: calc(50% + ${x}px);
                top: calc(50% + ${y}px);
                transform: translate(-50%, -50%);
                animation: coreOrbit ${10 + Math.random() * 5}s linear infinite;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            `;
            
            core.appendChild(particle);
        }
    }

    addTimeBasedRotation() {
        const galaxy3d = document.querySelector('.galaxy-3d');
        if (!galaxy3d) return;
        
        let startTime = Date.now();
        
        const updateTimeRotation = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const timeRotation = elapsed * 2;
            
            const currentTransform = galaxy3d.style.transform;
            const baseTransform = currentTransform.replace(/rotateZ\([^)]*\)/, '');
            
            galaxy3d.style.transform = `${baseTransform} rotateZ(${timeRotation}deg)`;
            
            requestAnimationFrame(updateTimeRotation);
        };
        
        requestAnimationFrame(updateTimeRotation);
    }

    createAdvancedParticles() {
        // Criar partículas de energia
        this.createEnergyParticles();
        
        // Criar partículas de plasma
        this.createPlasmaParticles();
        
        // Criar partículas quânticas
        this.createQuantumParticles();
    }

    createEnergyParticles() {
        const particleCount = this.isMobile ? 15 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'energy-particle';
            
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(196, 132, 252, 0.9), rgba(147, 51, 234, 0.6));
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                box-shadow: 0 0 ${size * 4}px rgba(196, 132, 252, 0.8);
                animation: energyFloat ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
        }
    }

    createPlasmaParticles() {
        const particleCount = this.isMobile ? 8 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'plasma-particle';
            
            const size = Math.random() * 8 + 4;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 15 + 8;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, 
                    rgba(255, 255, 255, 0.8) 0%, 
                    rgba(196, 132, 252, 0.6) 40%, 
                    transparent 70%);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                box-shadow: 0 0 ${size * 3}px rgba(255, 255, 255, 0.6);
                animation: plasmaFloat ${duration}s ease-in-out infinite;
                pointer-events: none;
                filter: blur(1px);
            `;
            
            this.container.appendChild(particle);
        }
    }

    createQuantumParticles() {
        const particleCount = this.isMobile ? 5 : 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 1);
                animation: quantumJump ${Math.random() * 3 + 2}s ease-in-out infinite;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
        }
    }

    createRealtimeEffects() {
        // Criar efeito de ondas gravitacionais
        this.createGravitationalWaves();
        
        // Criar efeito de distorção temporal
        this.createTimeDistortion();
        
        // Criar efeito de campo magnético
        this.createMagneticField();
    }

    createGravitationalWaves() {
        const waveContainer = document.createElement('div');
        waveContainer.className = 'gravitational-waves';
        waveContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        `;
        
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'gravity-wave';
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                border: 2px solid rgba(147, 51, 234, ${0.3 - i * 0.1});
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: gravityWave ${8 + i * 2}s ease-out infinite;
                animation-delay: ${i * 2}s;
                pointer-events: none;
            `;
            
            waveContainer.appendChild(wave);
        }
        
        this.container.appendChild(waveContainer);
    }

    createTimeDistortion() {
        const distortion = document.createElement('div');
        distortion.className = 'time-distortion';
        distortion.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 30%),
                radial-gradient(circle at 70% 70%, rgba(196, 132, 252, 0.1) 0%, transparent 30%);
            animation: timeDistortion 15s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: screen;
        `;
        
        this.container.appendChild(distortion);
    }

    createMagneticField() {
        const field = document.createElement('div');
        field.className = 'magnetic-field';
        field.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                rgba(147, 51, 234, 0.1) 90deg,
                transparent 180deg,
                rgba(196, 132, 252, 0.1) 270deg,
                transparent 360deg
            );
            animation: magneticRotation 20s linear infinite;
            pointer-events: none;
            z-index: 2;
            mix-blend-mode: screen;
            opacity: 0.3;
        `;
        
        this.container.appendChild(field);
    }

    initializePerformanceMonitoring() {
        // Monitorar FPS e ajustar efeitos dinamicamente
        const monitorPerformance = () => {
            const now = performance.now();
            const delta = now - this.lastTime;
            this.fps = 1000 / delta;
            this.lastTime = now;
            this.frameCount++;
            
            // Ajustar qualidade baseado no FPS
            if (this.frameCount % 60 === 0) {
                this.adjustPerformance();
            }
            
            requestAnimationFrame(monitorPerformance);
        };
        
        requestAnimationFrame(monitorPerformance);
    }

    adjustPerformance() {
        if (this.fps < 30) {
            this.performanceMode = 'light';
            this.reduceEffects();
        } else if (this.fps < 50) {
            this.performanceMode = 'normal';
            this.normalEffects();
        } else {
            this.performanceMode = 'extreme';
            this.enhanceEffects();
        }
    }

    reduceEffects() {
        // Reduzir quantidade de partículas
        const particles = this.container.querySelectorAll('.energy-particle, .plasma-particle, .quantum-particle');
        particles.forEach((particle, index) => {
            if (index > 10) {
                particle.style.display = 'none';
            }
        });
    }

    normalEffects() {
        // Restaurar efeitos normais
        const particles = this.container.querySelectorAll('.energy-particle, .plasma-particle, .quantum-particle');
        particles.forEach(particle => {
            particle.style.display = 'block';
        });
    }

    enhanceEffects() {
        // Adicionar efeitos extras
        this.createBonusParticles();
    }

    createBonusParticles() {
        if (this.performanceMode !== 'extreme') return;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'bonus-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px white;
                animation: bonusFloat 5s ease-in-out infinite;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }
    }

    // Efeito de vortex/espiral melhorado
    createVortexEffect() {
        const vortex = document.createElement('div');
        vortex.className = 'vortex';
        vortex.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 500px;
            height: 500px;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 3;
        `;
        
        // Criar espiral com mais partículas
        const particleCount = this.isMobile ? 30 : 80;
        for (let i = 0; i < particleCount; i++) {
            const spiral = document.createElement('div');
            spiral.className = 'spiral-particle';
            
            const angle = (i / particleCount) * Math.PI * 6;
            const radius = i * 3;
            const x = Math.cos(angle) * radius + 250;
            const y = Math.sin(angle) * radius + 250;
            
            spiral.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(196, 132, 252, ${0.9 - i * 0.01});
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(196, 132, 252, 0.8);
                animation: spiralRotate ${15 - i * 0.1}s linear infinite;
            `;
            
            vortex.appendChild(spiral);
        }
        
        this.container.appendChild(vortex);
    }

    // Efeito de buraco de minhoca avançado
    createAdvancedWormhole() {
        const wormhole = document.createElement('div');
        wormhole.className = 'advanced-wormhole';
        wormhole.style.cssText = `
            position: absolute;
            top: 20%;
            right: 10%;
            width: 200px;
            height: 200px;
            pointer-events: none;
            z-index: 4;
        `;
        
        // Múltiplas camadas para efeito de distorção
        for (let i = 0; i < 8; i++) {
            const layer = document.createElement('div');
            layer.className = 'wormhole-layer';
            layer.style.cssText = `
                position: absolute;
                width: ${100 - i * 10}px;
                height: ${100 - i * 10}px;
                top: ${i * 5}px;
                left: ${i * 5}px;
                background: conic-gradient(
                    from ${i * 45}deg,
                    transparent,
                    rgba(147, 51, 234, ${0.4 - i * 0.05}),
                    rgba(196, 132, 252, ${0.3 - i * 0.04}),
                    rgba(255, 255, 255, ${0.2 - i * 0.025}),
                    transparent
                );
                border-radius: 50%;
                animation: wormholeSpin ${10 - i * 1}s linear infinite ${i % 2 ? 'reverse' : 'normal'};
                filter: blur(${i * 0.5}px);
            `;
            
            wormhole.appendChild(layer);
        }
        
        // Centro escuro com efeito de absorção
        const center = document.createElement('div');
        center.style.cssText = `
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, rgba(0, 0, 0, 0.95) 30%, transparent 70%);
            border-radius: 50%;
            animation: blackHolePulse 3s ease-in-out infinite;
        `;
        
        wormhole.appendChild(center);
        this.container.appendChild(wormhole);
    }

    // Efeito de campo de energia melhorado
    createEnergyField() {
        const field = document.createElement('div');
        field.className = 'energy-field';
        field.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: 
                radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(196, 132, 252, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(107, 70, 193, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 40%);
            animation: energyPulse 8s ease-in-out infinite alternate;
        `;
        
        this.container.appendChild(field);
    }

    // Inicializar todos os efeitos avançados
    initAdvancedEffects() {
        if (!this.isInitialized) return;
        
        this.createVortexEffect();
        this.createAdvancedWormhole();
        this.createEnergyField();
        
        // Adicionar partículas de energia
        this.createEnergyParticles();
    }
}

// Adicionar keyframes CSS para as novas animações
const galaxyKeyframes = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes coreGlowPulse {
        0%, 100% { 
            opacity: 0.3; 
            transform: translate(-50%, -50%) scale(1);
        }
        50% { 
            opacity: 0.8; 
            transform: translate(-50%, -50%) scale(1.3);
        }
    }

    @keyframes spiralRotate {
        from { transform: rotate(0deg) translateX(10px); }
        to { transform: rotate(360deg) translateX(10px); }
    }

    @keyframes wormholeSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes energyPulse {
        0% { 
            opacity: 0.3; 
            filter: hue-rotate(0deg) brightness(1);
        }
        50% { 
            opacity: 0.6; 
            filter: hue-rotate(30deg) brightness(1.2);
        }
        100% { 
            opacity: 0.3; 
            filter: hue-rotate(0deg) brightness(1);
        }
    }

    @keyframes energyFloat {
        0% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% { 
            transform: translate(50px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% { 
            transform: translate(-30px, -60px) scale(0.8);
            opacity: 0.4;
        }
        75% { 
            transform: translate(-60px, 20px) scale(1.1);
            opacity: 0.7;
        }
        100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
    }

    @keyframes plasmaFloat {
        0% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.4;
        }
        33% { 
            transform: translate(40px, -40px) scale(1.3) rotate(120deg);
            opacity: 0.7;
        }
        66% { 
            transform: translate(-40px, -20px) scale(0.9) rotate(240deg);
            opacity: 0.5;
        }
        100% { 
            transform: translate(0, 0) scale(1) rotate(360deg);
            opacity: 0.4;
        }
    }

    @keyframes quantumJump {
        0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
        }
        25% { 
            transform: translate(30px, -50px) scale(0.5);
            opacity: 0.3;
        }
        50% { 
            transform: translate(-40px, -30px) scale(1.5);
            opacity: 1;
        }
        75% { 
            transform: translate(20px, 40px) scale(0.8);
            opacity: 0.6;
        }
    }

    @keyframes gravityWave {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }

    @keyframes timeDistortion {
        0% { 
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
        }
        50% { 
            transform: scale(1.1) rotate(180deg);
            filter: hue-rotate(45deg);
        }
        100% { 
            transform: scale(1) rotate(360deg);
            filter: hue-rotate(0deg);
        }
    }

    @keyframes magneticRotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes constellationFade {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.4; }
    }

    @keyframes coreOrbit {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    @keyframes clickPulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }

    @keyframes bonusFloat {
        0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.6;
        }
        50% { 
            transform: translateY(-30px) translateX(20px);
            opacity: 1;
        }
    }

    @keyframes blackHolePulse {
        0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.95;
        }
        50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
    }

    .mouse-particle {
        transition: all 0.3s ease;
    }

    .dynamic-star {
        animation: twinkle ease-in-out infinite;
    }

    .extra-ring {
        pointer-events: none;
    }

    .core-glow {
        pointer-events: none;
    }

    .spiral-particle {
        pointer-events: none;
    }

    .wormhole-layer {
        pointer-events: none;
    }

    .energy-field {
        pointer-events: none;
    }

    .energy-particle {
        pointer-events: none;
    }

    .plasma-particle {
        pointer-events: none;
    }

    .quantum-particle {
        pointer-events: none;
    }

    .gravity-wave {
        pointer-events: none;
    }

    .time-distortion {
        pointer-events: none;
    }

    .magnetic-field {
        pointer-events: none;
    }

    .constellation {
        pointer-events: none;
    }

    .core-particle {
        pointer-events: none;
    }

    .click-effect {
        pointer-events: none;
    }

    .bonus-particle {
        pointer-events: none;
    }
`;

// Adicionar estilos ao documento
const galaxyStyleSheet = document.createElement('style');
galaxyStyleSheet.textContent = galaxyKeyframes;
document.head.appendChild(galaxyStyleSheet);

// Inicializar efeitos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const galaxyEffects = new GalaxyEffects();
    
    // Inicializar efeitos avançados após um pequeno delay
    setTimeout(() => {
        galaxyEffects.initAdvancedEffects();
    }, 1000);
    
    // Tornar disponível globalmente
    window.galaxyEffects = galaxyEffects;
});

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalaxyEffects;
}