// Navigation Active Section Observer
const sections = document.querySelectorAll("section[id]"); // only sections with IDs
const navLinks = document.querySelectorAll(".nav-links > li > a"); // only top-level links

const options = { threshold: 0.6 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");

        // Match href="#id" with section id
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
// emailer
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // stop form from reloading the page

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
    alert(result.message || "Message sent successfully!");
    this.reset(); // clear form
  } catch (error) {
    alert("Failed to send message. Please try again later.");
    console.error(error);
  }
});
