$(document).ready(function () {
  $('.searchWrap .searchBtn').on('click', function () {
    $('.searchWrap .group').fadeToggle();
    $('.searchWrap').toggleClass('active');
  });

  $('.naviBtn').on('click', function () {
    $('.navi').addClass('active');
  });
  $('.navi .closeBtn').on('click', function () {
    $('.navi').removeClass('active');
  });

  $('.navi>ul').on('click', '>li.hasSub>a', function () {
    $(this).siblings('.subWrap').slideToggle();
    $(this).toggleClass('on');
  });
  // $('선택자1').has('선택자2') 메서드
  // : 선택자2를 갖고있는 선택자1 요소
  $('#navi>ul>li').has('.subWrap').addClass('hasSub');

  $('.mainTopGroup .btn_infoBox').on('click', function () {
    $(this).toggleClass('open');
    $('.mainTopGroup .col.c4').toggleClass('show');
  });

  tab('.tabBoard');
  tab('.tabNews');
});
function tab(el) {
  $(el)
    .find('.tabLink')
    .on('click', function () {
      $(el).find('.tab .active').removeClass('active');
      $(this).parent().addClass('active');
    });
}
