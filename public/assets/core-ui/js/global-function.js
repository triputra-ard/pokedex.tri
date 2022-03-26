function requestUrl(urlData) {
  return this.url = urlData;
}
function toTop() {
  $('.to-top').click(function() {
      $(window).scrollTop(0);
  });
  $(window).scroll(function() {
    if ($(window).scrollTop() > 60) {
      $('.scroll-top').removeClass('hide');
    }else {
      $('.scroll-top').addClass('hide');
    }
  });
}