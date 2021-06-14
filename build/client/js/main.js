$(document).ready(function () {
  //////////content1
  $('#utilQuick a').on('click', function (e) {
    let offset = $('.section4').offset();
    let _index = $('#utilQuick li').index($(this).parent()) + 1;
    $('html, body').animate({ scrollTop: offset.top }, 500);
    $('.section4 .motionTab li').removeClass('active');
    $(this.hash).addClass('active');
    $('.section4').removeClass('scene1 scene2 scene3');
    $('.section4').addClass('scene' + _index);
    e.preventDefault();
  });

  $('.motionTab').each(function () {
    $(this).children('ul').children('li').eq(0).addClass('active');
    if ($(this).parents('.section4').length > 0) {
      $('.section4').addClass('scene1');
    }
  });

  $('.motionTab > ul > li > a:not(.btnMore)').on('click focusin', function (e) {
    $(this)
      .parent('li')
      .addClass('active')
      .siblings('li')
      .removeClass('active');
    if ($(this).parents('.section4').length > 0) {
      let _index =
        $(this)
          .parents('.motionTab')
          .children()
          .children()
          .index($(this).parent()) + 1;
      $('.section4').removeClass('scene1 scene2 scene3');
      $('.section4').addClass('scene' + _index);
    }
    e.preventDefault();
  });

  $('#web_pop')
    .on('init', function (event, slick) {
      $(this).append(
        '<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>',
      );
      $('.slick-counter .current').text(slick.currentSlide + 1);
      $('.slick-counter .total').text(slick.slideCount);
    })
    .slick({
      slideToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '#control .btn_prev',
      nextArrow: '#control .btn_next',
    })
    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $('.slick-counter .current').text(nextSlide + 1);
    });

  // 팝업배너/////////////////////////////////////
  $('.section1 .lstType02')
    .on('init', function (event, slick) {
      $(this).append(
        '<div class="slick-counter3"><span class="current"></span> / <span class="total"></span></div>',
      );
      $('.slick-counter3 .current').text(slick.currentSlide + 1);
      $('.slick-counter3 .total').text(slick.slideCount);
    })
    .slick({
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 2,
      slide: 'div',
      prevArrow: '#pop_control .btn_prev',
      nextArrow: '#pop_control .btn_next',
      responsive: [{ breakpoint: 600, settings: { slidesToShow: 1 } }],
    })
    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $('.slick-counter3 .current').text(nextSlide + 1);
    })
    .resize();
  ///////////////////////////////////////////////////////////////////////////////

  let newsList = $('.section2 .lstType01').bxSlider({
    mode: 'vertical',
    speed: 1000,
    pause: 3000,
    auto: true,
    autoControls: false,
    controls: true,
    pager: false,
    touchEnabled: false,
    autoHover: true,
    onSliderLoad: function () {
      $('.bx-clone').find('a').prop('tabIndex', '-1');
    },
    onSlideAfter: function () {
      $('.section2 .lstType01')
        .children('li')
        .each(function () {
          if ($(this).attr('aria-hidden') == 'false') {
            $(this).find('a').attr('tabIndex', '0');
          } else {
            $(this).find('a').attr('tabIndex', '-1');
          }
        });
    },
  });
  $('.section2 .lstType01 a').focusin(function () {
    newsList.stopAuto();
  });

  $('.btnInformation').on('click', function (e) {
    if ($(this).hasClass('open') == true) {
      $('.btnInformation.close').css('display', 'inline-block');
      $('#information a').first().focus();
    } else {
      $('.btnInformation.open').css('display', 'inline-block');
    }
    $(this).css('display', 'none');
    e.preventDefault();
  });

  $('.btnInformation.hashClose').on('focusout', function () {
    $('#information a').first().focus();
  });
  $('.btnInformation.hashClose').on('click', function () {
    $('#infoOpenBtn').focus();
  });
  //Top버튼
  $('#btnTop').on('click', function (e) {
    $('html, body').animate({ scrollTop: '0' }, 500);
    e.preventDefault();
  });
});
