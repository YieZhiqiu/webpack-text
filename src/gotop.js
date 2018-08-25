function goTop(){
  $(window).scroll(function(e){
    if($(window).scrollTop()>100)
      $('.top').fadeIn(1000);
    else
      $('.top').fadeOut(1000);
  });
}
$(function(){
  $('.top').click(function(e){
    console.log(1)
    $('body, html').animate({scrollTop: 0},1000);
  });
  goTop();
});