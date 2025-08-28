// Navigation Active Section Observer
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const options = { threshold: 0.6 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, options);

sections.forEach(section => observer.observe(section));


// 🎠 Multi-Carousel Support
document.querySelectorAll(".carousel").forEach(carousel => {
  const slides = carousel.querySelectorAll("img");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
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

  // Button clicks
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-slide every 5s for each carousel
  setInterval(nextSlide, 5000);

  // Initialize first slide
  showSlide(currentSlide);
});
