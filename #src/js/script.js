// @ts-nocheck
@@include('webp.js')
@@include('slick.min.js')


$(document).ready(function(){
  $('.banner-slider__wrapper').slick({
    dots: true,
    prevArrow: '<button class="banner-slider__btn banner-slider__btnprev"><svg class="icon icon-arrow"><use href="img/icons/icons.svg#arrow-left"></use></svg></button>',
    nextArrow: '<button class="banner-slider__btn banner-slider__btnnext"><svg class="icon icon-arrow"><use href="img/icons/icons.svg#arrow-right"></use></svg></button>',
  });
});
$(document).ready(function(){
  $('.products-slider').slick({
    arrows: false,

  });
});

$('.tab').on('click', function (e) {
  e.preventDefault();

  $('.tab').removeClass('tab--active');
  $('.tabs-content').removeClass('tabs-content--active');

  $(this).addClass('tab--active');
  $($(this).attr('href')).addClass('tabs-content--active');
})

$('.product-tab').on('click', function (e) {
  e.preventDefault();

  $('.product-tab').removeClass('product-tab--active');
  $('.product-content').removeClass('product-content--active');

  $(this).addClass('product-tab--active');
  $($(this).attr('href')).addClass('product-content--active');
})
$('.products-item__favorite').on('click', function (e) {
  e.preventDefault();
  $('.products-item__favorite').toggleClass('products-item__favorite--active')
  
})









