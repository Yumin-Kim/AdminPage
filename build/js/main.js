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
