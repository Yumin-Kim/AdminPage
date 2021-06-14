// const mainModule = require('./main');\

$(function () {
  function footer() {
    $('.footBtn button').on('click', function () {
      $(this).parent().siblings('div').children('div').slideUp(300);
      $(this).siblings('div').slideToggle(300);

      if ($(this).parent('.footBtn').hasClass('on')) {
        $('.footBtn').removeClass('on');
      } else {
        $('.footBtn').removeClass('on');
        $(this).parent('.footBtn').addClass('on');
      }

      return false;
    });

    $('.footBtnWrap').on('mouseleave', function () {
      $('.footBtn div').each(function () {
        if ($(this).css('display') == 'block') {
          $('.footBtn div').hide();
          $('.footBtn').removeClass('on');
        }
      });
    });

    $('.footBtn div li:last-child a').on('focusout', function () {
      $('.footBtn div').hide();
      $('.footBtn').removeClass('on');
    });
  }
  footer();

  function _bgHeight(a) {
    var bgHeight = a.next('.depth2Wrap').height() + 3;
    $('.bgMenuBar').css('height', bgHeight);
  }

  $('#mainMenu .gnb > li').each(function (index) {
    $(this).find('div').length > 0 ? $(this).addClass('dep') : '';
  });

  $('#mainMenu .gnb > li > a').on('focusin mouseenter click', function (e) {
    $('#header').addClass('mainMenuOpen');

    if ($(this).parent().hasClass('dep')) {
      $(this).parent().addClass('active').siblings().removeClass('active');
    } else {
      $('#header').removeClass('mainMenuOpen');
      $(this).parents('#mainMenu .gnb').find('> li').removeClass('active');
    }

    _bgHeight($(this));
  });

  $('#mainMenu .gnb').on('mouseleave', function (e) {
    $('#header').removeClass('mainMenuOpen');
    $('#mainMenu .gnb li').removeClass('active');
    e.preventDefault();
  });

  $('#mainMenu .gnb .depth2 > li').each(function (index) {
    $(this).find('ul').length > 0 ? $(this).addClass('dep') : '';
  });

  $('#mainMenu')
    .find('a')
    .last()
    .on('focusout', function () {
      $('#header').removeClass('mainMenuOpen');
      $('#mainMenu .gnb li').removeClass('active');
    });

  // 풀메뉴 버튼
  $('.allMenu').on('click', function (e) {
    if ($(this).hasClass('active') === true) {
      $('#header').removeClass('fullMenuOpen');
      $('.allMenu').removeClass('active');
    } else {
      $('#header').addClass('fullMenuOpen');
      $('.allMenu').addClass('active');
    }
    e.preventDefault();
  });

  // 풀메뉴 스크롤
  $('.fullMenuScroll').mCustomScrollbar();

  // 풀메뉴 버튼
  $('#fullMenu .gnb a').on('click', function (e) {
    if ($(window).width() <= 1024) {
      if ($(this).next('ul').length > 0) {
        $(this).parent('li').siblings().find('ul').hide();
        $(this).parent('li').siblings().removeClass('down');
        $(this).parent('li').toggleClass('down');
        $(this).next('ul').toggle(100);
        e.preventDefault();
      }
    }
  });

  $('#fullMenu')
    .find('a')
    .last()
    .on('focusout', function () {
      $('#fullMenu a.hashClose').focus();
    });

  $('#fullMenu a.hashClose')
    .on('focusout', function () {
      $('#fullMenu gnb a').first().focus();
    })
    .on('click', function () {
      $('#fullMenuOpen').focus();
    });

  //메인 반응형 검색버튼
  $('.m_search').on('click', function () {
    $(this).toggleClass('open');
    $('#totalSearch').toggleClass('open');
  });

  //검색버튼
  $('.btnSearch').on('click', function () {
    $(this).toggleClass('open');
    $('.subSearch').toggleClass('open');
  });
  // footer 관련 J
  $('#footer .box1').slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    infinite: true,
    speed: 1000,
    variableWidth: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  jQuery('#footer .slickPrev').on('click', function () {
    jQuery('#footer .box1').slick('slickPrev');
  });
  jQuery('#footer .slickPause').on('click', function () {
    jQuery(this).css('display', 'none');
    jQuery('#footer .slickPlay').css('display', 'inline');
    jQuery('#footer .box1').slick('slickPause');
  });
  jQuery('#footer .slickPlay').on('click', function () {
    jQuery(this).css('display', 'none');
    jQuery('#footer .slickPause').css('display', 'inline');
    jQuery('#footer .box1').slick('slickPlay');
  });
  jQuery('#footer .slickNext').on('click', function () {
    jQuery('#footer .box1').slick('slickNext');
  });

  // HASH 버튼
  $('.hash').on('click', function (e) {
    $(this.hash).slideDown(100);
    e.preventDefault();
  });
  $('.hashClose').on('click', function (e) {
    $(this.hash).slideUp(100);
    e.preventDefault();
  });

  // HASH TOGGLE 버튼
  $('.hashToggle').on('click', function (e) {
    $(this).hasClass('active') == true
      ? $(this).removeClass('active')
      : $(this).addClass('active');
    $(this.hash).slideToggle(100);
    e.preventDefault();
  });

  // 반응형
  $(window).bind('load resize', function () {
    if ($(window).width() <= 1024) {
      // 페이지 로드시 메인메뉴 중 2뎁스, 3뎁스가 있는 메뉴에 class 추가
      $('#fullMenu li').each(function (index) {
        $(this).find('ul').length > 0 ? $(this).addClass('child') : '';
      });
    } else {
      // #fullMenu 초기화
      $('#fullMenu li').removeClass('child');
      $('#fullMenu ul').show();

      if ($('#mainMenu #gnb > li.active').length > 0) {
        _bgHeight($('#mainMenu #gnb > li.active > a'));
      }
    }
  });

  //////////content1
  $('#utilQuick a').on('click', function (e) {
    var offset = $('.section4').offset();
    var _index = $('#utilQuick li').index($(this).parent()) + 1;
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
      var _index =
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
  //////////content Tab 바

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

  var newsList = $('.section2 .lstType01').bxSlider({
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
