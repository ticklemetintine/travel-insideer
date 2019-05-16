/*!
 * Travel Insider
 */

var travelInsider = (function() {
    'use strict';

    function init() {
        sliders();
        pages();

        $('input[type=date]').each(function() {
            var placeholder = $(this).attr("placeholder");

            $(this).parent().prepend('<label>' + placeholder + '</label>');
        });

        $(document).on('change', '.date input', function(event) {
            $(this).parent().find('label').fadeOut('fast');
        });

        //TOGGLE MENU 
        $(document).on('vclick', '.toggle-menu', function(event) {
            event.preventDefault();

            $('.menu-container').fadeIn('fast');
            setTimeout(function() {
                $('.menu-container .overlay').toggleClass('open');
            }, 10);
        });

        //TOGGLE MENU 
        $(document).on('vclick', '.overlay.open .close-menu, .overlay.open a', function(event) {
            // event.preventDefault();

            $('.menu-container .overlay').toggleClass('open');
            $('.menu-container').hide('fast');

        });

        //SCROLL TO TOP
        $(document).on('vclick', '.scroll-to-top', function(event) {
            event.preventDefault();

            $("html, body").animate({ scrollTop: "0" });

        });

        $(window).scroll(function() {
            if ($(document).height() > $(window).height() + 20) {
                if ($(window).scrollTop() > 100) {
                    $('.scroll-to-top').show();
                    $('header').addClass('sticky');
                } else {
                    $('.scroll-to-top').hide();
                    $('header').removeClass('sticky');
                }
            }
        });
        $(document).on("pagebeforeshow","#index",function(){
			// You ajax call for index page
		});
    }

    function sliders() {
        if ($('.top-rated').length > 0) {
            $('.top-rated .item-list').slick({
                centerMode: true,
                slidesToShow: 3,
                arrows: false,
                dots: false,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
    }

    function pages() {
    }

    return {
        init: init
    };
}());

jQuery(document).ready(function($) {
    travelInsider.init();
});