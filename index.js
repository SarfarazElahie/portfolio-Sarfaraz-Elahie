// ========================================
// THEME TOGGLE
// ========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add a subtle animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ========================================
// MOBILE NAVIGATION
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Add stagger delay
    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
        el.style.transitionDelay = `${delay}ms`;
    }
    
    observer.observe(el);
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ========================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ========================================
const createCursorTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['#667eea', '#764ba2', '#a855f7'];
    
    // Create 20 circles for the trail
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.style.position = 'fixed';
        circle.style.width = '10px';
        circle.style.height = '10px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = colors[i % colors.length];
        circle.style.opacity = '0';
        circle.style.pointerEvents = 'none';
        circle.style.transition = 'opacity 0.3s ease';
        circle.style.zIndex = '9999';
        document.body.appendChild(circle);
        circles.push(circle);
    }
    
    // Update cursor position
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    // Animate circles
    const animateCircles = () => {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.opacity = (20 - index) / 20;
            circle.style.transform = `scale(${(20 - index) / 20})`;
            
            const nextCircle = circles[index + 1] || circles[0];
            x += (parseInt(nextCircle.style.left) || coords.x - 5 - x) * 0.3;
            y += (parseInt(nextCircle.style.top) || coords.y - 5 - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    };
    
    animateCircles();
};

// Uncomment to enable cursor trail effect
// createCursorTrail();

// ========================================
// TYPING EFFECT FOR CODE WINDOW
// ========================================
const codeElement = document.querySelector('.code-body code');
if (codeElement) {
    const originalCode = codeElement.innerHTML;
    codeElement.innerHTML = '';
    
    let index = 0;
    const typeSpeed = 20;
    
    const typeCode = () => {
        if (index < originalCode.length) {
            codeElement.innerHTML = originalCode.substring(0, index + 1);
            index++;
            setTimeout(typeCode, typeSpeed);
        }
    };
    
    // Start typing after page load
    window.addEventListener('load', () => {
        setTimeout(typeCode, 500);
    });
}

// ========================================
// PARTICLE BACKGROUND EFFECT
// ========================================
const createParticles = () => {
    const particlesContainer = document.querySelector('.bg-animation');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(102, 126, 234, 0.5)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
};

// Uncomment to enable particles
// createParticles();

// ========================================
// FORM VALIDATION AND SUBMISSION
// ========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        const data = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = '#22c55e'; // Success Green
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = ''; 
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error();
            }
        }).catch(() => {
            alert("Oops! There was a problem sending your message.");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}
// ========================================
// PROJECT CARD TILT EFFECT
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// SKILL CARD HOVER EFFECT
// ========================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========================================
// PRELOADER (Optional)
// ========================================
const addPreloader = () => {
    const preloader = document.createElement('div');
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.background = 'var(--bg-primary)';
    preloader.style.display = 'flex';
    preloader.style.alignItems = 'center';
    preloader.style.justifyContent = 'center';
    preloader.style.zIndex = '10000';
    preloader.style.transition = 'opacity 0.5s ease';
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
};

// Uncomment to enable preloader
// addPreloader();

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '30px';
    scrollBtn.style.right = '30px';
    scrollBtn.style.width = '50px';
    scrollBtn.style.height = '50px';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.border = 'none';
    scrollBtn.style.background = 'var(--gradient-blue-purple)';
    scrollBtn.style.color = 'white';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
    scrollBtn.style.transition = 'all 0.3s ease';
    scrollBtn.style.zIndex = '1000';
    scrollBtn.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollBtn);
};

// Uncomment to enable scroll to top button
// createScrollToTop();

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c👋 Welcome to my portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLooking to hire? Let\'s connect!', 'color: #764ba2; font-size: 14px;');
console.log('%c📧 your.email@example.com', 'color: #a855f7; font-size: 12px;');

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add any initialization code here
    highlightNavigation();
});