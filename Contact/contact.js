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

    // Close menu on link click
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
    // FORM VALIDATION & SUBMISSION
    // ================================
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const group = field.closest('.form-group') || field.parentElement;

                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        isValid = false;
                        group.nextElementSibling?.classList.add('error'); // Special for privacy checkbox
                    } else {
                        group.nextElementSibling?.classList.remove('error');
                    }
                } else if (!field.value.trim()) {
                    isValid = false;
                    group.classList.add('error');
                } else if (field.type === 'email' && !validateEmail(field.value)) {
                    isValid = false;
                    group.classList.add('error');
                } else {
                    group.classList.remove('error');
                }
            });

            if (isValid) {
                // Simulation of submission
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMsg.classList.add('visible');

                    // Reset or redirection could happen here
                    setTimeout(() => {
                        // successMsg.classList.remove('visible');
                        // contactForm.style.display = 'block';
                        // contactForm.reset();
                        // submitBtn.disabled = false;
                        // submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                    }, 5000);
                }, 2000);
            }
        });

        // Live error clearing
        contactForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group') || input.parentElement;
                group.classList.remove('error');
                if (input.id === 'privacy') {
                    contactForm.querySelector('.check-err')?.classList.remove('error');
                }
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ================================
    // CARD TILT (Subtle)
    // ================================
    document.querySelectorAll('.channel-card, .form-box').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // Navbar height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
