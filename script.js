// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const footerThemeToggle = document.getElementById('footerThemeToggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme) {
    body.classList.add(savedTheme);
} else if (prefersDarkScheme.matches) {
    body.classList.add('dark-mode');
}

// Update toggle icon based on current theme
function updateToggleIcon() {
    const isDarkMode = body.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('i');
    const footerIcon = footerThemeToggle.querySelector('i');
    
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        footerIcon.classList.remove('fa-moon');
        footerIcon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        footerIcon.classList.remove('fa-sun');
        footerIcon.classList.add('fa-moon');
    }
}

// Initialize icon
updateToggleIcon();

// Toggle theme function
function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    updateToggleIcon();
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
footerThemeToggle.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.querySelector('i').classList.toggle('fa-bars');
    mobileToggle.querySelector('i').classList.toggle('fa-times');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').classList.add('fa-bars');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            
            // Scroll to element
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show loading state (optional)
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Submit to Formspree using fetch API
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success alert
            const name = document.getElementById('name').value;
            alert(`Thank you for your message, ${name}! I will get back to you soon.`);
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        alert('Oops! There was a problem sending your message. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});
// const contactForm = document.getElementById('contactForm');

// contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Form data
//     const formData = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         subject: document.getElementById('subject').value,
//         message: document.getElementById('message').value
//     };
    
//     // In a real implementation, you would send this data to your server
//     // For this demo, we'll just show an alert and reset the form
//     alert('Thank you for your message, ' + formData.name + '! I will get back to you soon.');
//     contactForm.reset();
// });

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .service-card, .project-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// Set current year in footer
document.querySelector('.footer-bottom p').innerHTML = `© ${new Date().getFullYear()} – Charles Nwaeke. All rights reserved.`;