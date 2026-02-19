// Password Toggle Functionality
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Form Validation and Submit
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate login process
        const submitBtn = this.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Save original text if needed, but for now just change it
        const originalText = btnText.textContent;

        btnText.textContent = 'Logging in...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Login successful! Redirecting...', 'success');

            setTimeout(() => {
                // Redirect to home page
                window.location.href = '../index.html';
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
    // Remove existing notification if any
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

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add notification styles dynamically
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

// Social login handlers
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const platform = this.classList.contains('google') ? 'Google' :
            this.classList.contains('facebook') ? 'Facebook' : 'Apple';
        showNotification(`${platform} login coming soon!`, 'info');
    });
});
