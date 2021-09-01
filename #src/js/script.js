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


$(".catalog-top__btn-grid").on("click", function (e) {
  e.preventDefault();
  $(".catalog-top__btn-line").removeClass('catalog-top__btn--active');
  $(".catalog-top__btn-grid").addClass('catalog-top__btn--active');
    $('.products-item__wrapper').removeClass('products-item__wrapper--list');
});


$(".catalog-top__btn-line").on("click", function (e) {
  e.preventDefault();
  $(".catalog-top__btn-grid").removeClass('catalog-top__btn--active');
  $(".catalog-top__btn-line").addClass('catalog-top__btn--active');
  $('.products-item__wrapper').addClass('products-item__wrapper--list');
});


// jquery.formstyler.min.js
$(function() {

	$('.filter-style').styler();

});

$(".aside-filter__drop, .filter__extra").on("click", function () {
  $(this).toggleClass("aside-filter__drop-active");
  $(this).next().slideToggle(200);
})

// range-slider

var $range = $(".js-range-slider"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    instance,
    min = 50000,
    max = 1500000,
    from = 200000,
    to = 500000;

$range.ionRangeSlider({
    type: "double",
    min: min,
    max: max,

    onStart: updateInputs,
    onChange: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs (data) {
	from = data.from;
    to = data.to;
    
    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);	
}

$inputFrom.on("input", function () {
    var val = $(this).prop("value");
    
    // validate
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }
    
    instance.update({
        from: val
    });
});

$inputTo.on("input", function () {
    var val = $(this).prop("value");
    
    // validate
    if (val < from) {
        val = from;
    } else if (val > max) {
        val = max;
    }
    
    instance.update({
        to: val
    });
});












