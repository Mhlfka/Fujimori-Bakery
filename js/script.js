// splide
document.addEventListener('DOMContentLoaded', function () {
  new Splide('.news-slider', {
      type       : 'loop',
      perPage    : 1,
      pagination : false,
      arrows     : true,
  }).mount();
  new Splide('.c--ranking', {
      type       : 'loop',
      perPage    : 5,
      perMove: 1,
      gap    : 28,
      pagination : false,
      arrows     : true,
      breakpoints: {
      767: {
        perPage: 2,
      },
    },
  }).mount();
});


// parallax
var parallaxTargets = null;
window.addEventListener("load",()=>{
	parallaxTargets = document.querySelectorAll("img[data-parallax]");
	if(parallaxTargets){
		parallaxTargets.forEach(p=>{p.style.objectFit="cover";});
		window.addEventListener("resize",parallaxHandler,{passive:true});
		window.addEventListener("scroll",parallaxHandler,{passive:true});
		parallaxHandler();
	}
});
function parallaxHandler() {
    parallaxTargets.forEach(p => {
        let r = p.getBoundingClientRect();
        if (window.innerWidth <= 767) {
          p.style.objectPosition = "center " + ((r.top + r.height) / (window.innerHeight + r.height) * 100) + "%";
            p.style.transform = "scale(1.3)";
        } else {
            p.style.objectPosition = "center " + ((r.top + r.height) / (window.innerHeight + r.height) * 100) + "%";
        }
    });
}


// about us
const accordionContent = document.querySelector('#item--about-us ul');
const toggleButton = document.querySelector('.item--about-us_button');


document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  const indicator = document.querySelector('.indicator');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(tab.getAttribute('href')).classList.add('active');

      const tabRect = tab.getBoundingClientRect();
      const tabsRect = document.querySelector('.tabs').getBoundingClientRect();
      indicator.style.left = `${tabRect.left - tabsRect.left + (tabRect.width / 2) - (indicator.offsetWidth / 2)}px`;
    });
  });

  const firstTab = document.querySelector('.tab.active');
  const firstTabRect = firstTab.getBoundingClientRect();
  const tabsRect = document.querySelector('.tabs').getBoundingClientRect();
  indicator.style.left = `${firstTabRect.left - tabsRect.left + (firstTabRect.width / 2) - (indicator.offsetWidth / 2)}px`;
});


// 今月のおすすめ
$(document).ready(function() {
  function setSlickSlider() {
    if ($(window).width() <= 767) {
      if (!$('.seasonal-products__body').hasClass('slick-initialized')) {
        $('.seasonal-products__body').slick({
          arrows: true,
          autoplay: true,
          adaptiveHeight: true,
          centerMode: true,
          centerPadding: "30px",
          dots: false,
          slidesToShow: 1,
          infinite: true,
        });
      }
    } else {
      if ($('.seasonal-products__body').hasClass('slick-initialized')) {
        $('.seasonal-products__body').slick('unslick');
      }
    }
  }

  setSlickSlider();

  $(window).on('resize', function() {
    setSlickSlider();
  });
});


// スマホでスライダー
document.addEventListener('DOMContentLoaded', function () {
  let splide = null;

  function initSplide() {
    if (window.innerWidth <= 767 && splide === null) {
      splide = new Splide('.c-product_img__slider', {
        type       : 'loop',
        perPage    : 1.2,
        perMove    : 1,
        gap        : '15',
        pagination : false,
        arrows     : true,
      }).mount();
    } else if (window.innerWidth > 767 && splide !== null) {
      splide.destroy();
      splide = null;
    }
  }

  // 初期化
  initSplide();

  // リサイズ時に再チェック
  window.addEventListener('resize', initSplide);
});


// シーン
document.addEventListener("DOMContentLoaded", function () {
  const sceneButton = document.getElementById('scene-button');
  const priceButton = document.getElementById('price-button');
  const sceneLinks = document.getElementById('scene-links');
  const priceLinks = document.getElementById('price-links');

  sceneButton.addEventListener('click', function () {
    sceneButton.classList.add('selected');
    priceButton.classList.remove('selected');

    sceneLinks.style.display = 'block';
    priceLinks.style.display = 'none';
  });

  priceButton.addEventListener('click', function () {
    priceButton.classList.add('selected');
    sceneButton.classList.remove('selected');

    priceLinks.style.display = 'block';
    sceneLinks.style.display = 'none';
  });
});


// ジャーナル
$(document).ready(function() {
  function setSlickSlider() {
    if ($(window).width() <= 767) {
      if (!$('.c--journal__list').hasClass('slick-initialized')) {
        $('.c--journal__list').slick({
          arrows: false,
          autoplay: false,
          adaptiveHeight: true,
          centerMode: false,
          centerPadding: "30px",
          dots: false,
          slidesToShow: 1.3,
          infinite: false,
        });
      }
    } else {
      if ($('.c--journal__list').hasClass('slick-initialized')) {
        $('.c--journal__list').slick('unslick');
      }
    }
  }

  setSlickSlider();

  $(window).on('resize', function() {
    setSlickSlider();
  });
});


// レシピ
$(document).ready(function() {
  function setSlickSlider() {
    if ($(window).width() <= 767) {
      if (!$('.c--recipes__list').hasClass('slick-initialized')) {
        $('.c--recipes__list').slick({
          arrows: false,
          autoplay: false,
          adaptiveHeight: true,
          centerMode: false,
          centerPadding: "30px",
          dots: false,
          slidesToShow: 1.3,
          infinite: false,
        });
      }
    } else {
      if ($('.c--recipes__list').hasClass('slick-initialized')) {
        $('.c--recipes__list').slick('unslick');
      }
    }
  }

  setSlickSlider();

  $(window).on('resize', function() {
    setSlickSlider();
  });
});


// shop list
$(document).ready(function(){
  var $slider = $('.c--shop__list');
  var isSlickInitialized = false;

  function initSlick() {
    if (window.innerWidth <= 767 && !isSlickInitialized) {
      $slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "30px",
        arrows: true,
        dots: true,
        centerMode: true,
        variableWidth: false,
      });
      isSlickInitialized = true;
    } else if (window.innerWidth > 767 && isSlickInitialized) {
      $slider.slick('unslick');
      isSlickInitialized = false;
    }
  }

  initSlick();

  $(window).on('resize', function() {
    initSlick();
  });
});


// スクロールで切り替え
document.addEventListener('DOMContentLoaded', function() {
  function checkScroll() {
    const headerInner = document.querySelector('.l-header__inner');
    const scrollLimit = window.innerWidth <= 767 ? 250 : 400;

    if (window.scrollY > scrollLimit) {
      headerInner.classList.add('bgwhite');
    } else {
      headerInner.classList.remove('bgwhite');
    }
  }

  checkScroll();

  window.addEventListener('scroll', checkScroll);

  window.addEventListener('resize', checkScroll);
});


// メニュー
document.addEventListener('DOMContentLoaded', function() {
  // .l-header__inner__block__item--menu 要素を取得
  const menuItem = document.querySelector('.l-header__inner__block__item--menu');
  const headerInner = document.querySelector('.l-header__inner'); // 親の .l-header__inner を取得
  const cGmenu = document.querySelector('.c-gmenu'); // .c-gmenu 要素を取得

  // メニューアイテムが存在する場合に処理を行う
  if (menuItem && headerInner && cGmenu) {
    menuItem.addEventListener('click', function(event) {
      event.stopPropagation(); // クリックイベントの伝播を防ぐ

      // .is-on クラスが付与されているかどうかを確認
      if (menuItem.classList.contains('is-on') && headerInner.classList.contains('is-on')) {
        // クラスがすでにある場合は削除
        menuItem.classList.remove('is-on');
        headerInner.classList.remove('is-on');

        // .c-gmenuが .is-active を持っている場合は削除
        if (cGmenu.classList.contains('is-active')) {
          cGmenu.classList.remove('is-active');
        }
      } else {
        // クラスがない場合は追加
        menuItem.classList.add('is-on');
        headerInner.classList.add('is-on');
      }
    });
  }
});


// 検索ボタン
const fixContent = _ref => {
  let {
    activatingElement
  } = _ref;
  return ( /* event */_ref2) => {
    let {
      currentTarget
    } = _ref2;

    const htmlClassList = [];
    const dataUseBackdrop = currentTarget.dataset.useBackdrop || false;
    if (JSON.parse(dataUseBackdrop)) {
      htmlClassList.push("js-use-backdrop");
    }

    const scrollTop = contents.offsetTop - html.scrollTop;
    body.style.setProperty("top", `${scrollTop}px`);
    html.classList.add(...htmlClassList);
    activatingElement.classList.add("is-active");

    const releaseContent = ( /* event */) => {
      html.classList.remove(...htmlClassList);
      body.style.removeProperty("top");
      html.scrollTop = scrollTop * -1;
      activatingElement.classList.remove("is-active");

      const hsearch = document.querySelector('.hsearch');
      const hsearchclose = document.querySelector('.hsearchclose');
      if (hsearchclose && hsearch) {
        hsearch.style.display = 'inline-block';
        hsearchclose.style.display = 'none';
      }

      closeButton.forEach(btn => btn.removeEventListener("click", releaseContent));
    };

    closeButton.forEach(btn => btn.addEventListener("click", releaseContent));
  };
};



document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;

  // MutationObserverを使用してクラス変更を監視
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        // js-prevent-body-scrollクラスが付与されたら削除
        if (htmlElement.classList.contains('js-prevent-body-scroll')) {
          htmlElement.classList.remove('js-prevent-body-scroll');
          console.log('js-prevent-body-scroll クラスが削除されました');
        }
      }
    });
  });

  // html要素のclass属性の変更を監視
  observer.observe(htmlElement, { attributes: true });
});
