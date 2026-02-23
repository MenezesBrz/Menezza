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
    // ANIMATED COUNTERS — Perf Stats
    // ================================
    const perfStats = document.querySelectorAll('.perf-stat[data-target]');

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    perfStats.forEach(item => counterObserver.observe(item));

    function animateCounter(item) {
        const target = parseInt(item.dataset.target, 10);
        const counter = item.querySelector('.counter');
        if (!counter) return;
        const duration = 1800;
        const start = performance.now();

        function update(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target;
        }

        requestAnimationFrame(update);
    }

    // ================================
    // TIMELINE ITEMS — alternating reveal
    // ================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left')
            ? 'translateX(-30px)'
            : 'translateX(30px)';
        item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

        // override visible class to reset
        item.classList.add('timeline-hidden');
        timelineObserver.observe(item);
    });

    // Watch for .visible on timeline items
    const timelineVisibleObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.classList.contains('visible')) {
                mutation.target.style.opacity = '1';
                mutation.target.style.transform = 'translateX(0)';
            }
        });
    });

    timelineItems.forEach(item => {
        timelineVisibleObserver.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    // ================================
    // TECH CARD — subtle tilt on hover
    // ================================
    document.querySelectorAll('.tech-card, .auto-card').forEach(card => {
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

    // ================================
    // ENGINE CORE — speed up on hover
    // ================================
    const engineCore = document.querySelector('.engine-core i');
    const engineCard = document.querySelector('.engine-card');

    if (engineCard && engineCore) {
        engineCard.addEventListener('mouseenter', () => {
            engineCore.style.animationDuration = '0.5s';
        });
        engineCard.addEventListener('mouseleave', () => {
            engineCore.style.animationDuration = '3s';
        });
    }

});
