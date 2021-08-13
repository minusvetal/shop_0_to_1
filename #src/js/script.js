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

$('.tab').on('click', function (e) {
  e.preventDefault();

  $('.tab').removeClass('tab--active');
  $('.tabs-content').removeClass('tabs-content--active');

  $(this).addClass('tab--active');
  $($(this).attr('href')).addClass('tabs-content--active');
})

$('.product-item__favorite').on('click', function (e) {
  e.preventDefault();
  $('.product-item__favorite').toggleClass('product-item__favorite--active')
  
})







