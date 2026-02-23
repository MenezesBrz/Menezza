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
    // ANIMATED COUNTERS
    // ================================
    const counterItems = document.querySelectorAll('.counter-item[data-target]');

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterItems.forEach(item => counterObserver.observe(item));

    function animateCounter(item) {
        const target = parseInt(item.dataset.target, 10);
        const counterEl = item.querySelector('.counter');
        if (!counterEl) return;
        const duration = 1800;
        const start = performance.now();

        function update(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counterEl.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else counterEl.textContent = target.toLocaleString();
        }

        requestAnimationFrame(update);
    }

    // ================================
    // MVV CARD TILT
    // ================================
    document.querySelectorAll('.mvv-card, .testimonial-card').forEach(card => {
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
    // CONSULTATION FORM — Submit
    // ================================
    const form = document.getElementById('consultForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const btn = form.querySelector('.btn-submit');
            const original = btn.innerHTML;

            btn.innerHTML = '<span>Request Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#2ecc71';
            btn.style.color = '#fff';

            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.color = '';
                form.reset();
            }, 3000);
        });
    }

});
