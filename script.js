//  PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

//  NAVBAR SCROLL 
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Scrolled class for navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link on scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#${current}') {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

//  HAMBURGER MENU 
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksMenu.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('open');
    }
});

//  TYPING EFFECT 
const typedTextEl = document.getElementById('typedText');
const words = [
    'Web Developer',
    'AI Model Evaluator',
    'BCA Student',
    'Front-End Developer',
    'Content Writer',
    'UI/UX Enthusiast'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        typingSpeed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing after preloader
setTimeout(typeEffect, 1800);

//  SCROLL REVEAL 
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

//  SKILL BARS ANIMATION 
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
                fill.style.width = width + '%';
            }, 200);
            skillObserver.unobserve(fill);
        }
    });
}, {
    threshold: 0.3
});

skillFills.forEach(fill => skillObserver.observe(fill));

//  LANGUAGE CIRCLES ANIMATION 
const langProgressBars = document.querySelectorAll('.lang-progress');

const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const val = parseInt(circle.getAttribute('data-val'));
            const circumference = 251.2;
            const offset = circumference - (val / 100) * circumference;
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 300);
            langObserver.unobserve(circle);
        }
    });
}, {
    threshold: 0.3
});

langProgressBars.forEach(bar => langObserver.observe(bar));

//  COUNTER ANIMATION 
const statBoxes = document.querySelectorAll('.stat-box h4');

function animateCounter(el, target, suffix = '') {
    let count = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(count) + suffix;
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const suffix = text.includes('+') ? '+' : '';
            const target = parseInt(text);
            animateCounter(el, target, suffix);
            counterObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.5
});

statBoxes.forEach(box => counterObserver.observe(box));

//  CONTACT FORM 
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMsg('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMsg('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
        showFormMsg('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    }, 2000);
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMsg(msg, type) {
    formMsg.textContent = msg;
    formMsg.className = 'form-msg ' + type;
    setTimeout(() => {
        formMsg.className = 'form-msg';
        formMsg.textContent = '';
    }, 5000);
}

//  BACK TO TOP 
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//  SMOOTH HOVER TILT on PROJECT CARDS 
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform =
            'perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

//  ACTIVE SECTION HIGHLIGHT 
const allSections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.scrollY;
    allSections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector('.nav-link[href="#${sectionId}"]');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLink && navLink.classList.add('active');
        } else {
            navLink && navLink.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

//  CURSOR GLOW EFFECT 
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(13,110,90,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
});

//  INIT on DOM READY 
document.addEventListener('DOMContentLoaded', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});