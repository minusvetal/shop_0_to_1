// @ts-nocheck
@@include('webp.js')
@@include('slick.min.js')
@@include('jquery.formstyler.min.js')
@@include('ion.rangeSlider.min.js')


$(document).ready(function(){
  $('.banner-slider__wrapper').slick({
    dots: true,
    prevArrow: '<button class="banner-slider__btn banner-slider__btnprev"><svg class="icon icon-arrow"><use href="img/icons/icons.svg#arrow-left"></use></svg></button>',
    nextArrow: '<button class="banner-slider__btn banner-slider__btnnext"><svg class="icon icon-arrow"><use href="img/icons/icons.svg#arrow-right"></use></svg></button>',
  });
});


$(document).ready(function(){
  $('.products-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button class="products-slider__btn products-slider__btnprev"><svg class="icon icon-black-arrow"><use href="img/icons/icons.svg#arrow-black-left"></use></svg></button>',
    nextArrow: '<button class="products-slider__btn products-slider__btnnext"><svg class="icon icon-black-arrow"><use href="img/icons/icons.svg#arrow-black-right"></use></svg></button>',
  });
});

$('.tab').on('click', function (e) {
  e.preventDefault();

  $($(this).siblings()).removeClass('tab--active');
  $($(this).parent().siblings().find('div')).removeClass('tabs-content--active');

  $(this).addClass('tab--active');
  $($(this).attr('href')).addClass('tabs-content--active');
})

$('.products-item__favorite').on('click', function (e) {
  e.preventDefault();
  $(this).toggleClass('products-item__favorite--active')
  
})


// jquery.formstyler.min.js
$(function() {

	$('.filter-style').styler();

});

$(".aside-filter__drop").on("click", function () {
  $(this).toggleClass("aside-filter__drop-active");
  $(this).next().slideToggle(200);
})

// range-slider

    $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 50000,
      max: 1500000,
    });
    











