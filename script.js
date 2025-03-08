// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

if (menuBtn && navLinks) {
    // Set initial state based on screen size
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
    }
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        if (authButtons) {
            authButtons.classList.toggle('active');
        }
    });
    
    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            if (authButtons) {
                authButtons.classList.remove('active');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.navbar') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            if (authButtons) {
                authButtons.classList.remove('active');
            }
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                if (authButtons) {
                    authButtons.classList.remove('active');
                }
            }
        }
    });
});

// Reveal Elements on Scroll
const revealElements = document.querySelectorAll('.service-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize element styles
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Form submission code removed - replaced with direct email contact

// Parallax Effect for Hero Section
const heroImage = document.querySelector('.geometric-shape');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    heroImage.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px)`;
});

// Theme Switching
const initTheme = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Create notification element
    const createNotification = () => {
        // Remove any existing notification first
        const existingNotification = document.getElementById('theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.id = 'theme-notification';
        notification.className = 'theme-notification';
        document.body.appendChild(notification);
        
        return notification;
    };
    
    // Show theme change notification
    const showThemeNotification = (theme) => {
        const notification = createNotification();
        notification.innerHTML = `
            <i class="${theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}"></i>
            <span>${theme === 'dark' ? 'Dark' : 'Light'} Mode Enabled</span>
        `;
        
        // Add the visible class to trigger animation
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    };

    // Check for saved theme preference, otherwise use system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme to document
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };

    // Initialize theme
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        
        // Show notification about theme change
        showThemeNotification(newTheme);
    });
};

// Auth Modals Functionality
const initAuthModals = () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Add input animation and validation effects
    const formInputs = document.querySelectorAll('.auth-form input');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focus');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('input-focus');
            
            // Simple validation visual feedback
            if (input.value.trim() !== '') {
                if ((input.type === 'email' && isValidEmail(input.value)) || 
                    (input.type !== 'email')) {
                    input.classList.add('valid');
                    input.classList.remove('invalid');
                } else {
                    input.classList.add('invalid');
                    input.classList.remove('valid');
                }
            } else {
                input.classList.remove('valid', 'invalid');
            }
        });
    });
    
    // Email validation helper
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Password confirmation validation
    const passwordInput = document.getElementById('signup-password');
    const confirmInput = document.getElementById('signup-confirm-password');
    
    if (confirmInput) {
        confirmInput.addEventListener('input', () => {
            if (passwordInput.value !== confirmInput.value) {
                confirmInput.classList.add('invalid');
                confirmInput.classList.remove('valid');
            } else {
                confirmInput.classList.add('valid');
                confirmInput.classList.remove('invalid');
            }
        });
    }
    
    // Helper functions
    const openModal = (modal) => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        modal.classList.add('show');
        
        // Animate modal content sliding in
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(0)';
            }
        }, 10);
        
        // Focus first input after animation completes
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 400);
    };
    
    const closeModal = (modal) => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }, 200);
    };
    
    const closeAllModals = () => {
        document.querySelectorAll('.modal').forEach(modal => {
            closeModal(modal);
        });
    };
    
    // Open login modal
    loginBtn.addEventListener('click', () => {
        openModal(loginModal);
    });
    
    // Open signup modal
    signupBtn.addEventListener('click', () => {
        openModal(signupModal);
    });
    
    // Close modals when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close modals on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Switch between login and signup with smooth transition
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        
        const loginContent = loginModal.querySelector('.modal-content');
        if (loginContent) {
            loginContent.style.transform = 'translateY(20px) translateX(-40px)';
            loginContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            closeModal(loginModal);
            setTimeout(() => {
                openModal(signupModal);
            }, 300);
        }, 200);
    });
    
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        
        const signupContent = signupModal.querySelector('.modal-content');
        if (signupContent) {
            signupContent.style.transform = 'translateY(20px) translateX(40px)';
            signupContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            closeModal(signupModal);
            setTimeout(() => {
                openModal(loginModal);
            }, 300);
        }, 200);
    });
    
    // Handle login form submission with enhanced feedback
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Here you would typically send a request to your authentication server
        // For demonstration, we'll simulate a successful login
        
        // Show loading state
        const submitBtn = loginForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Logging in</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Add dots animation
        let dots = 0;
        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            const dotsText = '.'.repeat(dots);
            submitBtn.querySelector('span').textContent = `Logging in${dotsText}`;
        }, 300);
        
        // Simulate API call
        setTimeout(() => {
            clearInterval(loadingInterval);
            
            // Store user info in localStorage (for demo purposes only)
            localStorage.setItem('user', JSON.stringify({ email, isLoggedIn: true }));
            
            // Show success state
            submitBtn.innerHTML = '<span>Success!</span><i class="fas fa-check"></i>';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Update UI to show logged in state
            setTimeout(() => {
                updateAuthUI();
                
                // Close modal with success animation
                const modalContent = loginModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'translateY(-20px)';
                    modalContent.style.opacity = '0';
                }
                
                setTimeout(() => {
                    closeAllModals();
                    // Reset form and button
                    loginForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                    
                    // Reset input styles
                    loginForm.querySelectorAll('input').forEach(input => {
                        input.classList.remove('valid', 'invalid');
                    });
                }, 500);
            }, 1000);
        }, 1500);
    });
    
    // Handle signup form submission with enhanced feedback
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Check if email is already registered
        const isEmailTaken = checkEmailExists(email);
        if (isEmailTaken) {
            const emailInput = document.getElementById('signup-email');
            emailInput.classList.add('invalid');
            emailInput.focus();
            
            // Shake effect for error
            const formGroup = emailInput.parentElement;
            formGroup.classList.add('shake');
            
            // Create error message
            let errorMsg = formGroup.querySelector('.form-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                formGroup.appendChild(errorMsg);
            }
            errorMsg.textContent = 'This email is already registered';
            
            setTimeout(() => formGroup.classList.remove('shake'), 600);
            return;
        }
        
        // Validate password match
        if (password !== confirmPassword) {
            const confirmInput = document.getElementById('signup-confirm-password');
            confirmInput.classList.add('invalid');
            confirmInput.focus();
            
            // Shake effect for error
            const formGroup = confirmInput.parentElement;
            formGroup.classList.add('shake');
            
            // Create error message
            let errorMsg = formGroup.querySelector('.form-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                formGroup.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Passwords do not match';
            
            setTimeout(() => formGroup.classList.remove('shake'), 600);
            return;
        }
        
        // Show loading state
        const submitBtn = signupForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Creating account</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Add dots animation
        let dots = 0;
        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            const dotsText = '.'.repeat(dots);
            submitBtn.querySelector('span').textContent = `Creating account${dotsText}`;
        }, 300);
        
        // Simulate API call
        setTimeout(() => {
            clearInterval(loadingInterval);
            
            // Add user to registered users list for email validation
            let registeredUsers = [];
            const usersJson = localStorage.getItem('registeredUsers');
            if (usersJson) {
                registeredUsers = JSON.parse(usersJson);
            }
            registeredUsers.push({ name, email });
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            // Store current user info in localStorage
            localStorage.setItem('user', JSON.stringify({ name, email, isLoggedIn: true }));
            
            // Show success state
            submitBtn.innerHTML = '<span>Account created!</span><i class="fas fa-check"></i>';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Update UI to show logged in state
            setTimeout(() => {
                updateAuthUI();
                
                // Close modal with success animation
                const modalContent = signupModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'translateY(-20px)';
                    modalContent.style.opacity = '0';
                }
                
                setTimeout(() => {
                    closeAllModals();
                    
                    // Reset form and button
                    signupForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                    
                    // Reset input styles
                    signupForm.querySelectorAll('input').forEach(input => {
                        input.classList.remove('valid', 'invalid');
                    });
                }, 500);
            }, 1000);
        }, 1500);
    });
};

// Update UI based on auth state
const updateAuthUI = () => {
    const authButtons = document.querySelector('.auth-buttons');
    const user = JSON.parse(localStorage.getItem('user') || '{"isLoggedIn": false}');
    
    if (user.isLoggedIn) {
        // Extract first name - either from name (split by space) or email (split by @)
        let firstName = '';
        if (user.name) {
            firstName = user.name.split(' ')[0]; // Get first part of full name
        } else if (user.email) {
            firstName = user.email.split('@')[0]; // Use username part of email
        }
        
        // User is logged in, show profile button and logout button
        authButtons.innerHTML = `
            <div class="user-profile">
                <span>Welcome, ${firstName}</span>
                <button id="logout-btn" class="auth-btn login-btn">Logout</button>
            </div>
        `;
        
        // Add logout functionality
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('user');
            updateAuthUI();
            alert('Logged out successfully!');
        });
    } else {
        // User is not logged in, show login and signup buttons
        authButtons.innerHTML = `
            <button id="login-btn" class="auth-btn login-btn">Login</button>
            <button id="signup-btn" class="auth-btn signup-btn">Sign Up</button>
        `;
        
        // Reinitialize auth buttons
        document.getElementById('login-btn').addEventListener('click', () => {
            document.getElementById('login-modal').classList.add('show');
        });
        
        document.getElementById('signup-btn').addEventListener('click', () => {
            document.getElementById('signup-modal').classList.add('show');
        });
    }
};

// Initialize auth functionality
document.addEventListener('DOMContentLoaded', () => {
    initAuthModals();
    updateAuthUI();
});

// Helper function to check if an email is already registered
function checkEmailExists(email) {
    if (!email) return false;
    
    // In a real implementation, this would be a server request
    // For our demo, we'll check localStorage for registered users
    
    // Get all users (in a real app, this would be a database query)
    const existingUsers = [];
    
    try {
        // Check if we have a users array in localStorage
        const usersJson = localStorage.getItem('registeredUsers');
        if (usersJson) {
            const parsedUsers = JSON.parse(usersJson);
            if (Array.isArray(parsedUsers)) {
                existingUsers.push(...parsedUsers);
            }
        }
        
        // Check if there's a current user (older implementation used a single 'user' item)
        const currentUserJson = localStorage.getItem('user');
        if (currentUserJson) {
            const currentUser = JSON.parse(currentUserJson);
            if (currentUser && currentUser.email) {
                existingUsers.push(currentUser);
            }
        }
        
        // Check if the email exists in any user record
        return existingUsers.some(user => user && user.email && 
            user.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
}

// Check for success message parameter in URL
function checkForFormSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('message') === 'sent') {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div class="success-message-text">Your message has been sent successfully!</div>
            <div class="success-message-close">&times;</div>
        `;
        document.body.appendChild(successMessage);

        // Show the message with animation
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 300);

        // Add click event to close button
        const closeBtn = successMessage.querySelector('.success-message-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            });
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(successMessage)) {
                        successMessage.remove();
                    }
                }, 500);
            }
        }, 5000);

        // Clear the URL parameter without refreshing the page
        const newUrl = window.location.protocol + "//" + 
                       window.location.host + 
                       window.location.pathname + 
                       window.location.hash;
        window.history.replaceState({path: newUrl}, '', newUrl);
    }
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    checkForFormSuccess();
    
    // Check if initTheme exists before calling it
    if (typeof initTheme === 'function') {
        initTheme();
    }
    
    // Check if initAuthModals exists before calling it
    if (typeof initAuthModals === 'function') {
        initAuthModals();
    }
    
    // Check if updateAuthUI exists before calling it
    if (typeof updateAuthUI === 'function') {
        updateAuthUI();
    }
    
    // Initialize scroll reveal
    revealOnScroll();
}); 