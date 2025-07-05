import './style.css'

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Simple form validation
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const service = this.querySelector('select').value;
    
    if (!name || !email || !service) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your booking request! We will contact you soon.');
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.backgroundColor = 'var(--white)';
    navbar.style.backdropFilter = 'none';
  }
});

// Add intersection observer for animations
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

// Observe elements for animation
document.querySelectorAll('.service-card, .team-member, .award-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Hours toggle functionality
let hoursExpanded = false;

function toggleHours() {
  const hoursList = document.querySelector('.hours-list');
  const toggleButton = document.querySelector('.hours-toggle');
  
  if (!hoursExpanded) {
    hoursList.classList.remove('hours-collapsed');
    toggleButton.textContent = 'Show less';
    hoursExpanded = true;
  } else {
    hoursList.classList.add('hours-collapsed');
    toggleButton.textContent = 'Show all hours';
    hoursExpanded = false;
  }
}

// Make toggleHours globally available
window.toggleHours = toggleHours;

// Initialize hours display based on current day
function initializeHours() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[new Date().getDay()];
  
  // Business hours for each day (24-hour format)
  const businessHours = {
    'monday': { open: 8, close: 17 },
    'tuesday': { open: 8, close: 19 },
    'wednesday': { open: 8, close: 19 },
    'thursday': { open: 8, close: 19 },
    'friday': { open: 8, close: 19 },
    'saturday': { open: 8, close: 17 },
    'sunday': { open: 8, close: 17 }
  };
  
  // Remove current-day class and open-now spans from all days
  document.querySelectorAll('.hours-day').forEach(day => {
    day.classList.remove('current-day');
    const openNow = day.querySelector('.open-now');
    if (openNow) {
      openNow.remove();
    }
  });
  
  // Add current-day class to the actual current day
  const currentDayElement = document.querySelector(`[data-day="${currentDay}"]`);
  if (currentDayElement) {
    currentDayElement.classList.add('current-day');
    
    // Check if currently open
    const now = new Date();
    const currentHour = now.getHours();
    const todayHours = businessHours[currentDay];
    
    if (currentHour >= todayHours.open && currentHour < todayHours.close) {
      const openNowSpan = document.createElement('span');
      openNowSpan.className = 'open-now';
      openNowSpan.textContent = 'Open now';
      currentDayElement.appendChild(openNowSpan);
    }
  }
  
  // Start with collapsed view
  const hoursList = document.querySelector('.hours-list');
  if (hoursList) {
    hoursList.classList.add('hours-collapsed');
  }
}

// Initialize hours when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHours);

// Console welcome message
console.log('Welcome to Kru Salon! 💄✨');
