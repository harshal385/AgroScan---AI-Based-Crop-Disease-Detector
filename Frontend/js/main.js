// Main JavaScript file for AgroScan

// Utility functions
const utils = {
  // Show loading state
  showLoading: (element) => {
    element.classList.add('loading');
  },

  // Hide loading state
  hideLoading: (element) => {
    element.classList.remove('loading');
  },

  // Show success message
  showSuccess: (message, duration = 3000) => {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.classList.add('show');
    }, 100);

    setTimeout(() => {
      successDiv.classList.remove('show');
      setTimeout(() => successDiv.remove(), 300);
    }, duration);
  },

  // Show error message
  showError: (message, duration = 3000) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.classList.add('show');
    }, 100);

    setTimeout(() => {
      errorDiv.classList.remove('show');
      setTimeout(() => errorDiv.remove(), 300);
    }, duration);
  },

  // Smooth scroll to element
  scrollTo: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },

  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },

  // Validate form fields
  validateForm: (formData, rules) => {
    const errors = {};
    
    for (const [field, value] of formData.entries()) {
      if (rules[field]) {
        const fieldRules = rules[field];
        
        if (fieldRules.required && !value) {
          errors[field] = `${field} is required`;
        }
        
        if (fieldRules.minLength && value.length < fieldRules.minLength) {
          errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
        }
        
        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
          errors[field] = `${field} format is invalid`;
        }
      }
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
  }
};

// Animation observer
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Observe elements with animation classes
  document.querySelectorAll('.fade-in-up').forEach(el => {
    animationObserver.observe(el);
  });

  // Handle mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }

  // Handle scroll animations
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
});

// Export utils for use in other files
window.agroUtils = utils; 