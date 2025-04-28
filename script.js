
fetch("config3.json")
  .then(response => response.json())
  .then(config => {
    document.title = config.companyName;
    document.getElementById("logo").src = config.logo;
    document.documentElement.style.setProperty('--button-color', config.buttonColor);
    document.getElementById("hero-image").src = config.heroImage;
    document.getElementById("main-description").textContent = config.mainDescription;
    document.getElementById("secondary-description").textContent = config.secondaryDescription;
    document.getElementById("action-button").textContent = config.buttonText;
    document.getElementById("slide1").src = config.slide1;
    document.getElementById("slide2").src = config.slide2;
    document.getElementById("slide3").src = config.slide3;
    document.getElementById("slide4").src = config.slide4;
    document.getElementById("slide5").src = config.slide5;
    document.getElementById("slide6").src = config.slide6;
    document.getElementById("feature1-img").src = config.feature1Image;
    document.getElementById("feature1-title").textContent = config.feature1Title;
    document.getElementById("feature1-description").textContent = config.feature1Description;
    document.getElementById("feature2-img").src = config.feature2Image;
    document.getElementById("feature2-title").textContent = config.feature2Title;
    document.getElementById("feature2-description").textContent = config.feature3Description;
    document.getElementById("feature3-img").src = config.feature3Image;
    document.getElementById("feature3-title").textContent = config.feature3Title;
    document.getElementById("feature3-description").textContent = config.feature3Description;
    document.getElementById("about-image").src = config.aboutImage;
    document.getElementById("about-text").textContent = config.aboutText;
    document.getElementById("contact-email").textContent = config.contactEmail;
    document.documentElement.style.setProperty("--primary-color", config.primaryColor);
    document.documentElement.style.setProperty("--secondary-color", config.secondaryColor);
    documennt.documentElement.style.setProperty("--accent-color", config.accentColor);
    document.body.style.fontFamily = config.font;
    document.querySelector(".logo").src = config.logo;
    document.querySelector(".company-name").textContent = config.companyName;
  });


// Carousel functionality//
let currentIndex = 0;
const track = document.querySelector(".carousel-track");
const totalSlides = track.children.length;
let visibleSlides = getVisibleSlides(); // Get the initial value
let slideWidth = track.children[0].clientWidth + 10; // Initial width

function getVisibleSlides() {
  if (window.innerWidth < 600) return 1; // Mobile: Show 1 image
  if (window.innerWidth < 900) return 2; // Tablet: Show 2 images
  return 3; // Desktop: Show 3 images
}

function updateSlideWidth() {
  slideWidth = track.children[0].clientWidth + 10;
}

function showSlide(index) {
  visibleSlides = getVisibleSlides(); // Update visible slides on resize
  updateSlideWidth(); // Update slide width

  if (index < 0) {
    currentIndex = 0;
  } else if (index > totalSlides - visibleSlides) {
    currentIndex = totalSlides - visibleSlides;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * slideWidth;
  track.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Auto slide every 4 seconds
setInterval(() => {
  nextSlide();
}, 4000);

// Update slides when screen resizes
window.addEventListener("resize", () => {
  showSlide(currentIndex); // Recalculate layout
});





// Preview

function updatePreview() {
  const config = getConfigFromForm();
  const preview = document.getElementById("preview");
  preview.contentWindow.postMessage(config, "*");
}

function getConfigFromForm() {
  return {
    name: document.getElementById("companyName").value,
    logo: document.getElementById("logo").value,
    background: document.getElementById("background").value,
    mainColor: document.getElementById("mainColor").value,
    description: document.getElementById("description").value
  };
}

function downloadHTML() {
  const config = getConfigFromForm();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${config.name}</title>
  <style>
    :root { --main-color: ${config.mainColor}; }
    body { font-family: sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
    header { background: var(--main-color); padding: 20px; color: white; }
    #hero { height: 300px; background-image: url('${config.background}'); background-size: cover; background-position: center; }
  </style>
</head>
<body>
  <header>
    <img src="${config.logo}" alt="Logo" height="50">
    <h1>${config.name}</h1>
  </header>
  <div id="hero"></div>
  <p>${config.description}</p>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${config.name.replace(/\s+/g, "-").toLowerCase()}.html`;
  a.click();
}




