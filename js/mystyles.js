$(window).scroll(function() {
  var heroHeight = $('header').height();
  var yPosition = $(document).scrollTop();
  
    
  if (yPosition <= heroHeight) {
    var effectFactor = yPosition / heroHeight;
    var rotation = effectFactor * (Math.PI / 2 - Math.asin( (heroHeight - yPosition) / heroHeight ));
    $('.hero').css({
      '-webkit-transform': 'rotateX('+rotation+'rad)',
      'transform': 'rotateX('+rotation+'rad)',
    })
    .find('.overlay').css('opacity', effectFactor);
  }
  
  
  /**
   * Sticky nav-bar
   */
  if (yPosition <= heroHeight) {
    $('nav').removeClass('fixed');
  } else {
    $('nav').addClass('fixed');
  }
  
});


//MENU SCROLL
$(".menu a").click(function() {
  //on click, we get the target value of the selected element
  var target = $(this).attr('target');
  //we then scroll our body until the top of the corresponding div in 700ms
  var mh=$('.menu').height();
  $('body').animate({scrollTop: $("#" + target).offset().top-mh}, 700);
});

//SCROLLSPY                
function scrollSpy(){
  var mh=$('.menu').height();
  $('#landing').css("padding-top",mh+"px");
  
  $(".menu a").removeClass("active"); //we remove active from every menu element

  //we get the divs offsets looping the menu links and getting the targets (this is dynamic: when we change div #suzy's height, code won't break!)
  var divs = [];
  $(".menu a").each(function(i) {
    var appo = $(this).attr("target");
    //here we get the distance from top of each div
    divs[i] = $("#" + appo).offset().top;
  });

  //gets actual scroll and adds window height/2 to change the active menu voice when the lower div reaches half of screen (it can be changed)
  var pos = $(window).scrollTop();
  var off = ($(window).height()) / 2;

  pos = pos + off;

  //we parse our "div distances from top" object (divs) until we find a div which is further from top than the actual scroll position(+ of course window height/2). When we find it, we assign "active" class to the Nth menu voice which is corresponding to the last div closer to the top than the actual scroll -> trick is looping from index=0 while Nth css numeration starts from 1, so when the index=3 (fourth div) breaks our cycly, we give active to the third element in menu.
  var index = 0;

  for (index = 0; index < divs.length; index++) {
    if (pos < divs[index]) {
      break;
    }
  }
  $(".menu li:nth-child(" + index + ") a").addClass("active");
};

$(window).scroll(function() {
  scrollSpy();
});
$(document).ready(function() {
  scrollSpy();
});

$('').addClass('animated bounceOutLeft');

/* Demo purposes only */
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);