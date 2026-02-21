document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // NAVBAR — Scroll Effect + Mobile
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

    // Close menu on nav link click
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
        for (let i = 0; i < 18; i++) {
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
    // SMOOTH SCROLL FOR ANCHOR LINKS
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
    // SCROLL REVEAL (.reveal elements)
    // ================================
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay for siblings
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
    // ANIMATED COUNTERS (Stats Section)
    // ================================
    const statItems = document.querySelectorAll('.stat-item[data-target]');

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => counterObserver.observe(item));

    function animateCounter(item) {
        const target = parseInt(item.dataset.target, 10);
        const counter = item.querySelector('.counter');
        const duration = 1800;
        const start = performance.now();

        function update(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target;
        }

        requestAnimationFrame(update);
    }

    // ================================
    // DEPARTMENT FILTER TABS
    // ================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const teamCards = document.querySelectorAll('.team-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Show/hide cards with grid re-flow trick
            const grid = document.querySelector('.team-grid');
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(10px)';
            grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            setTimeout(() => {
                teamCards.forEach(card => {
                    const dept = card.dataset.department;
                    if (filter === 'all' || dept === filter) {
                        card.style.display = '';
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });

                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // ================================
    // TEAM CARD — Touch Support (flip)
    // ================================
    teamCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.toggle('flipped');
        }, { passive: true });
    });

});
