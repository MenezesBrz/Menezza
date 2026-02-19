// Password Toggle Functionality
function setupPasswordToggle(toggleId, passwordId) {
    const toggleBtn = document.getElementById(toggleId);
    const passwordInput = document.getElementById(passwordId);

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

setupPasswordToggle('togglePassword', 'password');
setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

// Password Strength Checker
const passwordInput = document.getElementById('password');
const strengthIndicator = document.querySelector('.password-strength');
const strengthFill = document.querySelector('.strength-fill');
const strengthText = document.querySelector('.strength-text');

if (passwordInput && strengthIndicator) {
    passwordInput.addEventListener('input', function () {
        const password = this.value;

        if (password.length === 0) {
            strengthIndicator.classList.remove('active');
            return;
        }

        strengthIndicator.classList.add('active');
        const strength = calculatePasswordStrength(password);

        // Remove all classes
        strengthFill.classList.remove('weak', 'medium', 'strong');
        strengthText.classList.remove('weak', 'medium', 'strong');

        if (strength.score <= 2) {
            strengthFill.classList.add('weak');
            strengthText.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength.score <= 3) {
            strengthFill.classList.add('medium');
            strengthText.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else {
            strengthFill.classList.add('strong');
            strengthText.classList.add('strong');
            strengthText.textContent = 'Strong';
        }
    });
}

function calculatePasswordStrength(password) {
    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password)) score++; // lowercase
    if (/[A-Z]/.test(password)) score++; // uppercase
    if (/[0-9]/.test(password)) score++; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score++; // special characters

    return { score: Math.min(score, 4) };
}

// Form Validation and Submit
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        // Phone is optional
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsChecked = document.getElementById('terms').checked;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (name.length < 3) {
            showNotification('Name must be at least 3 characters long', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        const strength = calculatePasswordStrength(password);
        if (strength.score < 3) {
            showNotification('Please use a stronger password', 'error');
            return;
        }

        if (!termsChecked) {
            showNotification('Please accept the Terms & Conditions', 'error');
            return;
        }

        // Simulate registration process
        const submitBtn = this.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');

        btnText.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Account created successfully! Redirecting...', 'success');

            setTimeout(() => {
                // Redirect to login page
                window.location.href = '../login/login.html';
            }, 1000);
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Reuse the same notification function structure
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add notification styles dynamically (matching login.js)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(10px);
    color: #fff;
    padding: 16px 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10000;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notification i {
    font-size: 18px;
  }
  
  .notification-success i { color: #10b981; }
  .notification-error i { color: #ef4444; }
  .notification-info i { color: #d4af37; }
  
  @media (max-width: 600px) {
    .notification {
      top: 10px;
      right: 10px;
      left: 10px;
      width: auto;
      transform: translateY(-20px);
    }
    
    .notification.show {
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(notificationStyles);

// Social signup handlers
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const platform = this.classList.contains('google') ? 'Google' :
            this.classList.contains('facebook') ? 'Facebook' : 'Apple';
        showNotification(`${platform} signup coming soon!`, 'info');
    });
});

// Real-time password match validation
const confirmPasswordInput = document.getElementById('confirmPassword');
if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('input', function () {
        if (this.value.length > 0) {
            if (this.value === passwordInput.value) {
                this.style.borderColor = '#10b981';
            } else {
                this.style.borderColor = '#ef4444';
            }
        } else {
            this.style.borderColor = ''; // return to default
        }
    });
}
