let currentAnim = 0;

function showAnimations(index) {
  const anims = document.getElementById("anim_slides");
  const totalAnims = anims.children.length;
  if (index >= totalAnims) {
    currentAnim = 0;
  } else if (index < 0) {
    currentAnim = totalAnims - 1;
  } else {
    currentAnim = index;
  }
  anims.style.transform = `translateX(-${currentAnim * 100}%)`;
}

function moveAnimations(direction) {
  showAnimations(currentAnim + direction);
}

// Optional: Auto slide every 5 seconds
setInterval(() => {
  moveAnimations(1);
}, 5000);

function changeSlide(sliderId, n) {
  const slider = document.getElementById(sliderId);
  const slides = slider.querySelectorAll(".slide");
  let currentSlideIndex = Array.from(slides).findIndex((slide) =>
    slide.classList.contains("active")
  );

  currentSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlideIndex);
  });

  const slideContainer = slider.querySelector(".slides");
  slideContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

// Automatically change slide every 5 seconds
function autoSlide(sliderId) {
  setInterval(() => {
    changeSlide(sliderId, 1);
  }, 5000); // Change slide every 5000 milliseconds (5 seconds)
}

// Start the automatic sliding for each slider
window.onload = () => {
  autoSlide("slider1");
  autoSlide("slider2");
  autoSlide("slider3");
  autoSlide("slider4");
};

// content navbar
const contents = [
  {
    image: "lp/images/commitment-big.png",
    title: "食パン ふじ森",
    description:
      "フランス産最高級発酵バターをふんだんに使用し、湯だね製法で食パン本来の自然な甘みを引き立て、驚くほど柔らかくなめらかな食感と、まろやかでコク深い味わいを最大限引き出しました。トーストをするとバターの香りがいっそう増し、より濃厚な味わいに。",
  },
  {
    image: "lp/images/grape_bread.svg",
    title: "フランス産 小麦のバゲット",
    description:
      "フランス産最高級発酵バターをふんだんに使用し、湯だね製法で食パン本来の自然な甘みを引き立て、驚くほど柔らかくなめらかな食感と、まろやかでコク深い味わいを最大限引き出しました。トーストをするとバターの香りがいっそう増し、より濃厚な味わいに。",
  },
  {
    image: "lp/images/somsa.svg",
    title: "クロワッサン",
    description:
      "フランス産最高級発酵バターをふんだんに使用し、湯だね製法で食パン本来の自然な甘みを引き立て、驚くほど柔らかくなめらかな食感と、まろやかでコク深い味わいを最大限引き出しました。トーストをするとバターの香りがいっそう増し、より濃厚な味わいに。",
  },
  {
    image: "lp/images/mayiz_croissant.svg",
    title: "パン オ ショコラ",
    description:"フランス産最高級発酵バターをふんだんに使用し、湯だね製法で食パン本来の自然な甘みを引き立て、驚くほど柔らかくなめらかな食感と、まろやかでコク深い味わいを最大限引き出しました。トーストをするとバターの香りがいっそう増し、より濃厚な味わいに。",
  },
  {
    image: "lp/images/nut_bread.svg",
    title: "カヌレ・ド・ボルドー",
    description:"フランス産最高級発酵バターをふんだんに使用し、湯だね製法で食パン本来の自然な甘みを引き立て、驚くほど柔らかくなめらかな食感と、まろやかでコク深い味わいを最大限引き出しました。トーストをするとバターの香りがいっそう増し、より濃厚な味わいに。",
  },
  {
    image: "lp/images/onion_bread.svg",
    title: "フランス風 シュトーレン",
    description:"フランス産最高級発酵バターをふんだんに使用し、湯だね製法で食パン本来の自然な甘みを引き立て、驚くほど柔らかくなめらかな食感と、まろやかでコク深い味わいを最大限引き出しました。トーストをするとバターの香りがいっそう増し、より濃厚な味わいに。",
  },
];

function changeContent(index) {
  const content = contents[index];
  document.getElementById("content-image").src = content.image;
  document.getElementById("content-title").innerText = content.title;
  document.getElementById("content-description").innerText = content.description;
}

// Initialize with the first content
changeContent(0);



// pop_up scripts start

document.addEventListener('DOMContentLoaded', () => {
  const openPopupButtons = document.querySelectorAll('.open-popup');
  const popups = document.querySelectorAll('.popup');
  const closePopupButtons = document.querySelectorAll('.close-popup');

  openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popupId = button.getAttribute('data-popup');
      document.getElementById(popupId).style.display = 'flex';
    });
  });

  closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.popup').style.display = 'none';
    });
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      popups.forEach(popup => popup.style.display = 'none');
    }
  });

  window.addEventListener('click', (event) => {
    popups.forEach(popup => {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
});


const sliders = {};

    function initializeSlider(sliderId) {
        const slides = document.querySelector(`#${sliderId} .enjoy_slides`);
        const totalSlides = slides.children.length;

        sliders[sliderId] = {
            currentSlide: 0,
            totalSlides: totalSlides,
            slides: slides
        };

        updateSlider(sliderId);
    }

    function updateSlider(sliderId) {
        const slider = sliders[sliderId];
        const slides = slider.slides;
        slides.style.transform = `translateX(-${slider.currentSlide * (100 / slider.totalSlides)}%)`;

        // Disable buttons at boundaries
        const prevBtn = document.querySelector(`#${sliderId} .prev`);
        const nextBtn = document.querySelector(`#${sliderId} .next`);
        prevBtn.disabled = slider.currentSlide === 0;
        nextBtn.disabled = slider.currentSlide >= slider.totalSlides - 1;
    }

    function moveSlide(direction, sliderId) {
        const slider = sliders[sliderId];
        slider.currentSlide += direction;

        // Boundary checks
        if (slider.currentSlide < 0) {
            slider.currentSlide = 0;
        } else if (slider.currentSlide >= slider.totalSlides) {
            slider.currentSlide = slider.totalSlides - 1;
        }

        updateSlider(sliderId);
    }

    // Initialize both sliders
    initializeSlider('enjoy_slider1');
    initializeSlider('enjoy_slider2');
    initializeSlider('enjoy_slider3');


    // content changer


    function showItem(itemNumber) {
      // Hide all items
      const items = document.querySelectorAll('.enjoy_item');
      items.forEach(item => {
          item.classList.remove('active');
      });
      
      // Show the selected item
      document.getElementById(`item${itemNumber}`).classList.add('active');
  }

  // FAQ part
  function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggleIcon = element.querySelector('.toggle');

    if (answer.style.display === "block") {
        answer.style.display = "none"; // Hide answer
        toggleIcon.textContent = "+"; // Change icon to +
    } else {
        answer.style.display = "block"; // Show answer
        toggleIcon.textContent = "-"; // Change icon to -
    }
}

// Get all buttons
const buttons = document.querySelectorAll('.nav-item');

// Set up event listeners for each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');
    });
});



// Enjoyment part

function toggleEnjoy(element) {
  const answer = element.nextElementSibling;
  const toggleIcon = element.querySelector('.toggle');

  if (answer.classList.contains('show')) {
      answer.classList.remove('show'); // Collapse
      toggleIcon.textContent = "+"; // Change icon to +
  } else {
      // Close any other open answers
      const allAnswers = document.querySelectorAll('.enjoyment-answer');
      allAnswers.forEach(ans => {
          ans.classList.remove('show');
          ans.previousElementSibling.querySelector('.toggle').textContent = "+";
      });

      // Open the clicked answer
      answer.classList.add('show'); // Expand
      toggleIcon.textContent = "-"; // Change icon to -
  }
}





// eating
function toggleEating(element) {
  const answer = element.nextElementSibling;
  const toggleIcon = element.querySelector('.toggle');

  if (answer.classList.contains('show')) {
      answer.classList.remove('show'); // Collapse
      toggleIcon.textContent = "+"; // Change icon to +
  } else {
      // Close any other open answers
      const allAnswers = document.querySelectorAll('.eating-answer');
      allAnswers.forEach(ans => {
          ans.classList.remove('show');
          ans.previousElementSibling.querySelector('.toggle').textContent = "+";
      });

      // Open the clicked answer
      answer.classList.add('show'); // Expand
      toggleIcon.textContent = "-"; // Change icon to -
  }
}








    // FAQ part
function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const toggleIcon = element.querySelector('.toggle');

  if (answer.classList.contains('show')) {
      answer.classList.remove('show'); // Hide answer
      toggleIcon.textContent = "+"; // Change icon to +
  } else {
      answer.classList.add('show'); // Show answer
      toggleIcon.textContent = "-"; // Change icon to -
  }
}




