(function AquaGlassTheme() {
    'use strict';


    function waitForSpotify(callback) {
        if (document.querySelector('#main')) {
            callback();
        } else {
            setTimeout(() => waitForSpotify(callback), 100);
        }
    }


    class RippleSystem {
        constructor() {
            this.ripples = [];
            this.canvas = null;
            this.ctx = null;
            this.animationId = null;
            this.maxRipples = 5;
            this.createCanvas();
            this.bindEvents();
            this.startAnimation();
            this.startAutoRipples();
        }

        createCanvas() {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'ripple-canvas';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: -1;
                opacity: 0.6;
                mix-blend-mode: screen;
            `;
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize());
        }

        addRipple(x, y, maxRadius = 100, intensity = 0.5) {
            if (this.ripples.length >= this.maxRipples) {
                this.ripples.shift();
            }
            this.ripples.push({
                x,
                y,
                radius: 0,
                maxRadius,
                alpha: intensity,
                speed: 2,
                frequency: 0.05,
                phase: Math.random() * Math.PI * 2
            });
        }

        startAutoRipples() {
            setInterval(() => {
                if (this.ripples.length < this.maxRipples) {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    const maxRadius = 50 + Math.random() * 50;
                    const intensity = 0.2 + Math.random() * 0.3;
                    this.addRipple(x, y, maxRadius, intensity);
                }
            }, 5000 + Math.random() * 3000);
        }

        updateRipples() {
            this.ripples = this.ripples.filter(ripple => {
                ripple.radius += ripple.speed;
                ripple.alpha *= 0.98;
                ripple.phase += ripple.frequency;
                return ripple.alpha > 0.01 && ripple.radius < ripple.maxRadius;
            });
        }

        drawRipples() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ripples.forEach(ripple => {
                const gradient = this.ctx.createRadialGradient(
                    ripple.x, ripple.y, ripple.radius * 0.8,
                    ripple.x, ripple.y, ripple.radius
                );

                const waveIntensity = Math.sin(ripple.phase) * 0.2 + 0.8;
                const alpha = ripple.alpha * waveIntensity;

                gradient.addColorStop(0, `rgba(0, 212, 255, 0)`);
                gradient.addColorStop(0.7, `rgba(0, 212, 255, ${alpha * 0.2})`);
                gradient.addColorStop(1, `rgba(0, 150, 200, ${alpha * 0.8})`);

                this.ctx.globalCompositeOperation = 'screen';
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }

        startAnimation() {
            const animate = () => {
                this.updateRipples();
                this.drawRipples();
                this.animationId = requestAnimationFrame(animate);
            };
            animate();
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }


    class FluidBackground {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.time = 0;
            this.createCanvas();
            this.initParticles();
            this.bindEvents();
            this.animate();
        }

        createCanvas() {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'fluid-canvas';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: -2;
                opacity: 0.4;
            `;
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.initParticles();
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize());
        }

        initParticles() {
            this.particles = [];
            const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 16000);

            for (let i = 0; i < numParticles; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.3 + 0.1,
                    phase: Math.random() * Math.PI * 2,
                    frequency: Math.random() * 0.01 + 0.005
                });
            }
        }

        updateParticles() {
            this.time += 0.016;

            this.particles.forEach((particle) => {
                particle.phase += particle.frequency;
                const waveX = Math.sin(particle.phase + this.time) * 0.3;
                const waveY = Math.cos(particle.phase * 1.2 + this.time) * 0.2;

                particle.vx += waveX * 0.005;
                particle.vy += waveY * 0.005;

                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                if (particle.x < 0 || particle.x > this.canvas.width) {
                    particle.vx *= -0.9;
                    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                }
                if (particle.y < 0 || particle.y > this.canvas.height) {
                    particle.vy *= -0.9;
                    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
                }
            });
        }

        drawParticles() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.alpha})`;
                this.ctx.fill();
            });
        }

        animate() {
            const animate = () => {
                this.updateParticles();
                this.drawParticles();
                requestAnimationFrame(animate);
            };
            animate();
        }

        destroy() {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }

    function applyGlassMorphism() {

        document.querySelectorAll('.Root__main-view, .Root__nav-bar, .Root__now-playing-bar').forEach(el => {
            el.classList.add('glass-effect');
        });
    }

    function enhanceUIElements() {

        document.querySelectorAll('button').forEach(button => {
            button.classList.add('glass-button');
        });
    }

    function init() {
        waitForSpotify(() => {
            const rippleSystem = new RippleSystem();
            const fluidBackground = new FluidBackground();
            applyGlassMorphism();
            enhanceUIElements();


            const observer = new MutationObserver(() => {
                applyGlassMorphism();
                enhanceUIElements();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    init();
})();