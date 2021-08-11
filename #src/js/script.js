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

$('.tabs-search__item').on('click', function (e) {
  e.preventDefault();
  $('.tabs-search__item').removeClass('tabs-search__item--active');
  $('.tabs-search__content-item').removeClass('tabs-search__content-item--active');
  $(this).addClass('tabs-search__item--active');
  $($(this).attr('href')).addClass('tabs-search__content-item--active');
})







