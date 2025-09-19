// Navigation Active Section Observer
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links > li > a");

const observerOptions = { 
  threshold: 0.6,
  rootMargin: "-20% 0px -20% 0px"
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const sectionId = href.substring(1);
          if (sectionId === entry.target.id) {
            link.classList.add("active");
          }
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => navObserver.observe(section));

// Multi-Carousel Support with touch/swipe functionality
document.querySelectorAll(".carousel").forEach(carousel => {
  const slides = carousel.querySelectorAll("img");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  let currentSlide = 0;
  let autoSlideInterval;

  // Touch/swipe variables
  let startX = 0;
  let endX = 0;
  let isDragging = false;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Button clicks
  if (nextBtn) nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
    setTimeout(startAutoSlide, 3000); // Restart auto-slide after 3s
  });

  if (prevBtn) prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
    setTimeout(startAutoSlide, 3000);
  });

  // Touch events for swipe functionality
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoSlide();
  }, { passive: true });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    endX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diffX = startX - endX;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setTimeout(startAutoSlide, 3000);
  }, { passive: true });

  // Mouse events for desktop dragging
  carousel.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    stopAutoSlide();
    carousel.style.cursor = "grabbing";
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    endX = e.clientX;
  });

  carousel.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diffX = startX - endX;
    const minSwipeDistance = 30;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    carousel.style.cursor = "grab";
    setTimeout(startAutoSlide, 3000);
  });

  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });

  // Pause auto-slide on hover
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Initialize
  showSlide(currentSlide);
  startAutoSlide();
  
  // Set initial cursor for desktop
  if (window.innerWidth > 768) {
    carousel.style.cursor = "grab";
  }
});

// Enhanced Contact Form Handler
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.innerHTML = '⏳ Sending...';
  submitBtn.disabled = true;

  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  try {
    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (response.ok) {
      // Success feedback
      submitBtn.innerHTML = '✅ Message Sent!';
      submitBtn.style.background = '#4caf50';
      this.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '#00bcd4';
        submitBtn.disabled = false;
      }, 3000);
    } else {
      throw new Error(result.message || 'Failed to send message');
    }
  } catch (error) {
    // Error feedback
    submitBtn.innerHTML = '❌ Failed to Send';
    submitBtn.style.background = '#f44336';
    
    // Show error message
    console.error('Contact form error:', error);
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '#00bcd4';
      submitBtn.disabled = false;
    }, 3000);
  }
});

// Mobile Navigation Handler
const burger = document.getElementById("burger");
const navLinksContainer = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
  
  // Toggle burger icon between bars and "X"
  burger.innerHTML = navLinksContainer.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinksContainer.classList.remove("active");
      burger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!burger.contains(e.target) && !navLinksContainer.contains(e.target)) {
      navLinksContainer.classList.remove("active");
      burger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientPosition().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Add animation to cards
document.querySelectorAll('.service-card, .product-card, .testimonial-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animateOnScroll.observe(card);
});

// Performance optimization: Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    }
  });
});

// Observe all images for lazy loading
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navLinksContainer.classList.contains('active')) {
      navLinksContainer.classList.remove('active');
      burger.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Update carousel cursor for desktop/mobile
    document.querySelectorAll('.carousel').forEach(carousel => {
      if (window.innerWidth > 768) {
        carousel.style.cursor = 'grab';
      } else {
        carousel.style.cursor = 'default';
      }
    });
  }, 250);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
    navLinksContainer.classList.remove('active');
    burger.innerHTML = '<i class="fas fa-bars"></i>';
  }
  
  // Arrow keys for carousel navigation when focused
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const focusedCarousel = document.activeElement.closest('.carousel');
    if (focusedCarousel) {
      e.preventDefault();
      const prevBtn = focusedCarousel.querySelector('.prev');
      const nextBtn = focusedCarousel.querySelector('.next');
      
      if (e.key === 'ArrowLeft' && prevBtn) {
        prevBtn.click();
      } else if (e.key === 'ArrowRight' && nextBtn) {
        nextBtn.click();
      }
    }
  }
});

// Loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add error handling for missing elements
function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
}

// Initialize tooltips for tech stack items
document.querySelectorAll('.tech-item img').forEach(img => {
  img.addEventListener('mouseenter', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = this.alt;
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      pointer-events: none;
      transform: translateX(-50%);
    `;
    
    this.parentNode.style.position = 'relative';
    this.parentNode.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = '50%';
    tooltip.style.bottom = '100%';
    tooltip.style.marginBottom = '5px';
  });
  
  img.addEventListener('mouseleave', function() {
    const tooltip = this.parentNode.querySelector('.tech-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});

console.log('Axis Five Solutions website loaded successfully! 🚀');