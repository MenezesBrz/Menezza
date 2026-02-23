document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // NAVBAR — Scroll + Mobile
    // ================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    }

    document.querySelectorAll('.nav-link a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ================================
    // HERO PARTICLES
    // ================================
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size = Math.random() * 4 + 2;
            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 12 + 8}s;
                animation-delay: ${Math.random() * 8}s;
                opacity: 0;
            `;
            particleContainer.appendChild(p);
        }
    }

    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ================================
    // SCROLL REVEAL
    // ================================
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ================================
    // SPEC TABS
    // ================================
    const tabs = document.querySelectorAll('.spec-tab');
    const panels = document.querySelectorAll('.spec-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Active panel
            panels.forEach(p => p.classList.remove('active'));
            const activePanel = document.getElementById('panel-' + target);
            if (activePanel) {
                activePanel.classList.add('active');
                // Re-trigger spec bar animations
                activePanel.querySelectorAll('.spec-bar').forEach(bar => {
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width + '%';
                    }, 50);
                });
                // Re-trigger reveal for spec rows in this panel
                activePanel.querySelectorAll('.reveal').forEach((el, i) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(35px)';
                    el.style.transitionDelay = `${i * 0.08}s`;
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 50);
                });
            }
        });
    });

    // ================================
    // SPEC BARS — Animate on scroll
    // ================================
    const specBarObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.spec-bar').forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width + '%';
                    }, 200);
                });
                specBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.spec-panel').forEach(panel => specBarObserver.observe(panel));

    // ================================
    // COLOR PICKER
    // ================================
    const colorDots = document.querySelectorAll('.color-dot');
    const colorName = document.querySelector('.color-name');
    const carIcon = document.querySelector('.car-icon-center');

    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            if (colorName) colorName.textContent = dot.dataset.color;

            if (carIcon) {
                carIcon.style.background = `linear-gradient(135deg, ${dot.style.background}33, ${dot.style.background}11)`;
                carIcon.style.borderColor = dot.style.background;
                carIcon.querySelector('i').style.color = dot.style.background;
            }
        });
    });

    // ================================
    // GALLERY — LIGHTBOX
    // ================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-overlay span');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ================================
    // FEATURE CARD TILT
    // ================================
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
