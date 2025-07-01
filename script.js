// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

//  Testimonials Slider Fix (Show two cards on laptop screens)
const testimonialBtns = document.querySelectorAll('.testimonial-btn');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Helper to set active cards/buttons
function setActiveTestimonials(idx) {
    testimonialBtns.forEach(b => b.classList.remove('active'));
    testimonialCards.forEach(c => c.classList.remove('active'));

    // Always activate the clicked button
    testimonialBtns[idx].classList.add('active');

    // Determine how many cards to show
    const showTwo = window.matchMedia('(min-width: 1024px)').matches;
    testimonialCards[idx].classList.add('active');
    if (showTwo && testimonialCards[idx + 1]) {
        testimonialCards[idx + 1].classList.add('active');
    }
}

// Show first card(s) by default
if (testimonialCards.length && testimonialBtns.length) {
    setActiveTestimonials(0);
}

testimonialBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => setActiveTestimonials(idx));
});

// Optional: Update on resize
window.addEventListener('resize', () => {
    // Find the currently active button
    const activeIdx = Array.from(testimonialBtns).findIndex(b => b.classList.contains('active'));
    if (activeIdx !== -1) setActiveTestimonials(activeIdx);
});


// Form Submission with Validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!firstName || !lastName || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        const successMsg = document.getElementById('successMessage');
        successMsg.classList.add('show');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    }, 1500);
});

// Reveal on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
