// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

if (menuBtn && navLinks) {
    // We don't need to set initial state anymore as we're using CSS classes
    
    menuBtn.addEventListener('click', () => {
        console.log('Menu button clicked');
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Log the state for debugging
        console.log('Nav links active:', navLinks.classList.contains('active'));
        console.log('Menu button active:', menuBtn.classList.contains('active'));
        
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
    
    // Create particle effect when closing modal
    const createModalCloseEffect = (modal) => {
        const rect = modal.querySelector('.modal-content').getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'modal-particle';
            
            // Random position within the modal
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 80;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Set random destination for animation
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 200;
            
            // Set styles
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = `hsl(191, 100%, ${50 + Math.random() * 40}%)`;
            particle.style.transform = `scale(${0.4 + Math.random() * 0.6})`;
            particle.style.setProperty('--random-x', `${randomX}px`);
            particle.style.setProperty('--random-y', `${randomY}px`);
            particle.style.animationDuration = `${0.6 + Math.random() * 0.8}s`;
            particle.style.animationDelay = `${Math.random() * 0.2}s`;
            
            document.body.appendChild(particle);
            
            // Remove particles after animation
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1500);
        }
    };

    const closeModal = (modal) => {
        // Create particle effect
        createModalCloseEffect(modal);
        
        // Add the closing animation class
        modal.classList.add('closing');
        
        // Wait for the animation to complete before hiding the modal
        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.remove('closing');
            document.body.style.overflow = ''; // Restore scrolling
        }, 500);
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
        
        // Check if the account exists
        if (!checkEmailExists(email)) {
            const emailInput = document.getElementById('login-email');
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
            errorMsg.textContent = 'No account found with this email. Please sign up first.';
            
            setTimeout(() => formGroup.classList.remove('shake'), 600);
            return;
        }
        
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
                
                // Show success notification
                showNotification('Successfully logged in! Welcome back.', 'success');
                
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
                
                // Show success notification
                showNotification(`Account created successfully! Welcome, ${name}.`, 'success');
                
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
            showNotification('You have been successfully logged out.', 'info');
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

// Display notification function
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    let icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'info') icon = 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// AI Assistant Functionality
class AIAssistant {
    constructor() {
        this.toggleButton = document.getElementById('ai-assistant-toggle');
        this.chatWidget = document.getElementById('ai-chat-widget');
        this.messagesContainer = document.getElementById('ai-chat-messages');
        this.userInput = document.getElementById('ai-user-input');
        this.sendButton = document.getElementById('ai-send-btn');
        this.minimizeButton = document.querySelector('.ai-chat-minimize');
        this.closeButton = document.querySelector('.ai-chat-close');
        this.isOpen = false;
        this.isTyping = false;
        
        // Knowledge base for the assistant
        this.responses = {
            "greeting": [
                "Hello! 👋 How can I help you today?",
                "Hi there! What can I assist you with?",
                "Hey! What brings you to WebGN today?"
            ],
            "services": [
                "At WebGN, we offer professional web development services including custom website design, responsive layouts, and modern UI/UX solutions. Our services are tailored for small and medium businesses looking to establish a strong online presence.",
                "Our services include custom website development, responsive design, and modern animations. We focus on creating websites that not only look great but also convert visitors into customers."
            ],
            "pricing": [
                "We have two main pricing plans: Professional at $24.99/month and Enterprise at $49.99/month. The Professional plan includes 3 pages and standard features, while Enterprise gives you unlimited pages and premium features. You can view our detailed pricing on the Pricing page.",
                "Our pricing is designed to be affordable for small businesses. We offer a Professional plan ($24.99/month) and an Enterprise plan ($49.99/month). Each includes different features and page limits to suit your needs."
            ],
            "contact": [
                "You can contact us through email at WebGN.contact@gmail.com. Our team is available Monday to Friday from 9am to 5pm CT, and on weekends from 9am to 8pm CT.",
                "The best way to reach us is via email at WebGN.contact@gmail.com. We're available weekdays 9am-5pm CT and weekends 9am-8pm CT."
            ],
            "payment": [
                "We accept payments through Venmo @WebGN. After purchasing a plan, we'll contact you to begin working on your website right away.",
                "Payment is accepted via Venmo @WebGN. Once your payment is received, we'll immediately start working on your project."
            ],
            "features": [
                "Our websites come with features like responsive design, custom animations, modern UI/UX, and SEO optimization. The Enterprise plan includes additional premium features like unlimited pages and priority support.",
                "Features include responsive layouts, modern animations, SEO optimization, and a user-friendly design. Enterprise customers get additional benefits like unlimited pages and premium support."
            ],
            "timeline": [
                "Our typical timeline depends on the complexity of your website. Most projects are completed within 1-2 weeks from the time of payment.",
                "We pride ourselves on quick turnaround times. Most websites are completed within 1-2 weeks, sometimes sooner for simpler projects."
            ],
            "portfolio": [
                "We've helped many businesses establish their online presence. While our portfolio is being updated, we'd be happy to discuss your specific needs and how we can meet them.",
                "Our team has worked with various businesses across different industries. We're currently updating our portfolio, but we'd love to chat about your specific requirements."
            ],
            "default": [
                "I'm not sure I understand. Could you rephrase your question? I'd be happy to help with information about our web services, pricing, or how to contact us.",
                "I don't have information on that specific topic. However, I can help with questions about our web development services, pricing plans, or contact details.",
                "That's an interesting question! I'm not programmed with that specific information, but I'd be happy to help with anything related to our web services or business details."
            ]
        };
        
        this.init();
    }
    
    init() {
        // Initialize event listeners
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.handleUserMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });
        this.minimizeButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        
        // Add scroll behavior to keep messages in view
        this.messagesContainer.addEventListener('DOMNodeInserted', () => {
            this.scrollToBottom();
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWidget.classList.add('open');
            this.toggleButton.classList.add('active');
            this.userInput.focus();
        } else {
            this.chatWidget.classList.remove('open');
            this.toggleButton.classList.remove('active');
        }
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatWidget.classList.remove('open');
        this.toggleButton.classList.remove('active');
    }
    
    handleUserMessage() {
        const userMessage = this.userInput.value.trim();
        if (userMessage === '') return;
        
        // Add user message to chat
        this.addMessage(userMessage, 'user');
        this.userInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate and display AI response after a delay
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(userMessage);
            this.addMessage(response, 'ai');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    
    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
        
        const avatar = document.createElement('div');
        avatar.className = sender === 'user' ? 'user-avatar' : 'ai-avatar';
        avatar.innerHTML = `<i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>`;
        
        const content = document.createElement('div');
        content.className = sender === 'user' ? 'user-message-content' : 'ai-message-content';
        content.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'ai-avatar';
        avatar.innerHTML = `<i class="fas fa-robot"></i>`;
        
        const content = document.createElement('div');
        content.className = 'ai-message-content ai-typing';
        content.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    generateResponse(userMessage) {
        const lowercaseMessage = userMessage.toLowerCase();
        
        // Check for greeting
        if (this.containsAny(lowercaseMessage, ['hello', 'hi', 'hey', 'howdy', 'greetings'])) {
            return this.getRandomResponse('greeting');
        }
        
        // Check for service inquiries
        if (this.containsAny(lowercaseMessage, ['service', 'offer', 'provide', 'do you', 'what do', 'what can'])) {
            return this.getRandomResponse('services');
        }
        
        // Check for pricing inquiries
        if (this.containsAny(lowercaseMessage, ['price', 'cost', 'how much', 'package', 'plan', 'pricing', 'subscription'])) {
            return this.getRandomResponse('pricing');
        }
        
        // Check for contact inquiries
        if (this.containsAny(lowercaseMessage, ['contact', 'reach', 'email', 'phone', 'call', 'talk to', 'support'])) {
            return this.getRandomResponse('contact');
        }
        
        // Check for payment inquiries
        if (this.containsAny(lowercaseMessage, ['pay', 'payment', 'venmo', 'billing', 'invoice'])) {
            return this.getRandomResponse('payment');
        }
        
        // Check for feature inquiries
        if (this.containsAny(lowercaseMessage, ['feature', 'include', 'what comes', 'benefit', 'advantage'])) {
            return this.getRandomResponse('features');
        }
        
        // Check for timeline inquiries
        if (this.containsAny(lowercaseMessage, ['time', 'long', 'duration', 'when', 'how soon', 'timeline', 'deadline'])) {
            return this.getRandomResponse('timeline');
        }
        
        // Check for portfolio inquiries
        if (this.containsAny(lowercaseMessage, ['portfolio', 'example', 'work', 'previous', 'client', 'done before'])) {
            return this.getRandomResponse('portfolio');
        }
        
        // Default response
        return this.getRandomResponse('default');
    }
    
    containsAny(str, keywords) {
        return keywords.some(keyword => str.includes(keyword));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing functionality
    if (typeof initTheme === 'function') {
        initTheme();
    }
    
    if (typeof initAuthModals === 'function') {
        initAuthModals();
    }
    
    if (typeof updateAuthUI === 'function') {
        updateAuthUI();
    }
    
    // Check for form success
    checkForFormSuccess();
    
    // Initialize scroll reveal
    revealOnScroll();
    
    // Initialize AI Assistant
    const aiAssistant = new AIAssistant();
}); 
