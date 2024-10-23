// スムーススクロール
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      var href = this.getAttribute('href');
      var target = document.querySelector(href === "#" || href === "" ? 'html' : href);
      var position = target ? target.offsetTop : 0;

      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    });
  });
});

// splide
document.addEventListener('DOMContentLoaded', function () {
  new Splide('.item_temp--how-to-enjoy_slider', {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    gap: '2em',
    focus: 'center',
    pagination: false,
    breakpoints: {
      767: {
        perPage: 1.2,
        gap: '1em',
      },
    },
  }).mount();
  new Splide('.item_temp--how-to-recipes_slider', {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    gap: '2em',
    focus: 'center',
    pagination: false,
    breakpoints: {
      767: {
        perPage: 1.2,
        gap: '1em',
      },
    },
  }).mount();
});


$(document).ready(function() {
  function initSlick() {
    if ($(window).width() <= 767) {
      if (!$('.p-product_slider__list').hasClass('slick-initialized')) {
        $('.p-product_slider__list').slick({
          centerMode: true,
          centerPadding: '10%',
          slidesToShow: 1,
          gap: '1em'
        });
      }
    } else {
      if ($('.p-product_slider__list').hasClass('slick-initialized')) {
        $('.p-product_slider__list').slick('unslick'); // 767px以上ではslickを破棄
      }
    }
  }

  initSlick(); // 初期化

  $(window).on('resize', function() {
    initSlick(); // リサイズ時に実行
  });
});


// 初期状態のフラグ
let isOpen = true; // 初期状態では開いている

// ボタンがクリックされたときのイベント
toggleButton.addEventListener('click', function() {
  if (isOpen) {
    // 開く動作
    accordionContent.classList.remove('closed');
    toggleButton.classList.remove('open');
    toggleButton.textContent = '閉じる';
  } else {
    // 閉じる動作
    accordionContent.classList.add('closed');
    toggleButton.classList.add('open');
    toggleButton.textContent = '開く';
  }
  // 状態を反転
  isOpen = !isOpen;
});