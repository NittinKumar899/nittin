// ===== DOM Elements =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const particlesContainer = document.getElementById('particles');

// ===== Create Floating Particles =====
function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// ===== Navigation Scroll Effect =====
function handleNavScroll() {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// ===== Mobile Navigation Toggle =====
function toggleMobileNav() {
  navLinks.classList.toggle('active');
  
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// ===== Active Navigation Link =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (navLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
      
      // Animate skill bars when revealed
      const skillBars = element.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
      });
    }
  });
}

// ===== Smooth Scroll for Navigation Links =====
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile nav if open
        if (navLinks.classList.contains('active')) {
          toggleMobileNav();
        }
      }
    });
  });
}

// ===== Back to Top =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ===== Contact Form Handling =====
function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Show success feedback (in a real app, you'd send this to a server)
  const button = contactForm.querySelector('button');
  const originalText = button.innerHTML;
  
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Message Sent!
  `;
  button.style.background = 'hsl(142, 76%, 40%)';
  
  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = '';
    contactForm.reset();
  }, 3000);
}

// ===== Parallax Effect for Hero =====
function handleParallax() {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroGlow = document.querySelector('.hero-glow');
  
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
  
  if (heroGlow && scrolled < window.innerHeight) {
    heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.2}px))`;
  }
}

// ===== Counter Animation for Stats =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// ===== Typing Effect for Hero =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  // Create particles
  createParticles();
  
  // Setup smooth scroll
  setupSmoothScroll();
  
  // Initial reveal check
  revealOnScroll();
  
  // Event Listeners
  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateActiveNavLink();
    revealOnScroll();
    handleParallax();
  });
  
  navToggle.addEventListener('click', toggleMobileNav);
  backToTop.addEventListener('click', scrollToTop);
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      if (navLinks.classList.contains('active')) {
        toggleMobileNav();
      }
    }
  });
  
  // Add loading animation
  document.body.classList.add('loaded');
});

// ===== Intersection Observer for Staggered Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all cards for staggered animation
document.querySelectorAll('.about-card, .achievement-card, .skill-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// ===== Hover Effects Enhancement =====
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
