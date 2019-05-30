/*!
 * Travel Insider
 */

var travelInsider = (function() {
    'use strict';

    function init() {
        setTimeout(function() {
            sliders();
            forms();
            formDateRange();
            $('#pac-input').addClass('input-box');
            $('#pac-input').clone().prependTo('.map-container #map');
        }, 500);

        $(window).resize(function() {
            forms();
            sliders();
            containerHeight();
        });

        $(window).on("orientationchange", function(event) {
            forms();
            sliders();
            containerHeight();
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
            sliders();
        });

        //SCROLL TO TOP
        $(document).on('vclick', '.scroll-to-top', function(event) {
            event.preventDefault();

            $("html, body").animate({ scrollTop: "0" });
        });

        //EXPERIENCE PAGE VIEW MORE
        $(document).on('click', '.experience-container .view-all a', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $("#more").offset().top
            }, 500);
        });

        //ADD REMOVE GUEST COUNT
        $(document).on('click', '.guests button', function(event) {
            event.preventDefault();

            var currentCount = parseInt($(this).parent().find('.input-box').val());

            if ($(this).hasClass('btn-minus') && currentCount > 0) {
                $(this).parent().find('.input-box').val(currentCount - 1);
            }
            if ($(this).hasClass('btn-plus')) {
                $(this).parent().find('.input-box').val(currentCount + 1);
            }
        });

        //TOGGLE FILTER MENU
        $(document).on('click', '.btn-filter', function(event) {
            event.preventDefault();

            $('.filter').toggleClass('open');
        });

        //HOST AN EXPERIENCE BTN
        $(document).on('click', '.p1 .btn', function(event) {
            event.preventDefault();

            $(this).addClass('clicked');
            $('.p1').addClass('close');
            $('.p1').removeClass('show');

            setTimeout(function() {
                $('.p2').addClass('show');

            }, 1000);
        });

        $(document).on('click', '.p2 .next-page a', function(event) {
            event.preventDefault();

            $('.p2').addClass('hide');
            $('.p2').removeClass('show');

            setTimeout(function() {
                $('.p3').addClass('show');
            }, 1000);
        });

        //PAGE REVEAL TRANSITIONS
        $(document).on("pagebeforeshow", "div[data-role='page']", function() {
            setTimeout(function() {
                sliders();

                containerHeight();
            }, 500);
        });

        //BECOME A HOST FORM SUBMIT
        $(".become-a-host-form form").submit(function(e) {
            e.preventDefault();

            var curr = parseInt($(this).parent().attr('data-attr')),
                next = curr + 1;

            $('div[data-attr="' + curr + '"]').addClass('hide');
            $('div[data-attr="' + curr + '"]').removeClass('show');
            $('div[data-attr="' + next + '"]').addClass('show');
            $('div[data-attr="' + next + '"]').removeClass('hide');

            if ($('div[data-attr="5"]')) {
                var country = $('.input-country').val(),
                    category = $('.input-category').val,
                    experienceName = $('.input-experience-name').val,
                    language = $('.input-language').val,
                    language = $('.input-language').val,
                    rateAdult = $('.rate-adult').val,
                    rateAdultActual = $('.rate-adult-actual').val,
                    rateChild = $('.rate-child').val,
                    rateChildActual = $('.rate-child-actual').val,
                    policy = $('.input-policy').val;
            }

            setTimeout(function() {
                $("html, body .become-a-host-form").animate({ scrollTop: "0" });
            }, 500);
        });

        $(document).on('click', '.become-a-host-form .back', function() {
            var curr = parseInt($(this).parent().parent().parent().attr('data-attr')),
                prev = curr - 1;

            $('div[data-attr="' + curr + '"]').addClass('hide');
            $('div[data-attr="' + curr + '"]').removeClass('show');
            $('div[data-attr="' + prev + '"]').addClass('show');
            $('div[data-attr="' + prev + '"]').removeClass('hide');

            setTimeout(function() {
                $("html, body .become-a-host-form").animate({ scrollTop: "0" });

            }, 500);
        });

        //SHOW/HIDE UPLOAD
        $(document).on('change', '.radio[name="training"]', function(event) {
            event.preventDefault();

            if ($(this).val() == "1") {
                $(this).closest(".page").find('.upload-img').slideDown('fast');
                $(this).closest(".page").find('.upload-btn').attr('required', 'true');
            } else {
                $(this).closest(".page").find('.upload-img').slideUp('fast');
                $(this).closest(".page").find('.upload-btn').removeAttr('required');
            }
        });

        $(document).on('click', '.upload-img .btn', function(event) {
            event.preventDefault();

            $(this).parent().find('.upload-btn').trigger('click');
        });

        $(document).on('change', '.upload-btn[type="file"]', function(e) {
            var fileName = e.target.files[0].name;

            readURL(this);
        });

        $(document).on('click', '.upload-img .remove', function(event) {
            event.preventDefault();

            $(this).parent().addClass('toRemove');

            confirmModal();
        });

        $(document).on('click', '.modal-confirm-removal .btn', function(event) {
            event.preventDefault();

            $('.modal .container').slideToggle('fast');

            setTimeout(function() {
                $('.modal').fadeOut('fast');
            }, 600);

            if ($(this).hasClass('yes')) {
                $('.toRemove').remove();
            } else {
                $('.toRemove').removeClass('toRemove');
            }

        });

        $(document).on('click', '.page4 .upload-img .remove', function(event) {
            event.preventDefault();

            $('.page4 .img-name .img-item:first-child .radio').attr('checked', 'checked');
        });

        //ADD MORE ITEMS
        $(document).on('click', '.social-group .add-media', function(event) {
            event.preventDefault();

            $('.social-group:last-child').clone().appendTo('.social-container');

            if ($('.social-group').length == 2) {
                $('.social-group:last-child').append('<a href="#" class="btn btn-red remove-media"><i class="la la-minus-circle"></i></a>');
            }
        });

        $(document).on('click', '.provided .add-more', function(event) {
            event.preventDefault();

            $(this).parent().find('div.flex:last-of-type').clone().insertBefore(this);

            if ($(this).parent().find('.flex').length == 2) {
                $(this).parent().find('div.flex:last-of-type').append('<a href="#" class="btn btn-red remove-media"><i class="la la-minus-circle"></i></a>');
            }
        });

        $(document).on('click', '.preferred-time .add-more', function(event) {
            event.preventDefault();

            $(this).parent().find('div.flex:last-of-type').clone().insertBefore(this);

            if ($(this).parent().find('.flex').length == 2) {
                $(this).parent().find('div.flex:last-of-type').append('<a href="#" class="btn btn-red remove-time"><i class="la la-minus-circle"></i></a>');
            }
        });

        //REMOVE ITEMS
        $(document).on('click', '.provided .remove-media, .preferred-time .remove-time', function(event) {
            event.preventDefault();

            $(this).parent().remove();
        });

        $(document).on('click', '.social-group .remove-media', function(event) {
            event.preventDefault();

            $(this).parent().remove();
        });

        //CALCULATE RATES
        $(document).on('keyup', '.rate', function(event) {
            event.preventDefault();

            var rate = $(this).val(),
                percentage = 0.2,
                actual = rate - (rate * percentage);

            if ($(this).hasClass('rate-adult')) {
                $('.rate-adult-actual').val(actual);
            } else {
                $('.rate-child-actual').val(actual);
            }
        });

        // CAST RATING
        $(document).on('click', '.leave-a-comment .rating .star', function(event) {
            event.preventDefault();

            var rating = $(this).parent().find('.rating-radio').val();

            $(this).parent().find('.rating-radio').attr('checked', 'checked');
            $(this).parent().parent().find('.rate span').text(rating);

            $.each($('.rating .item'), function(index, val) {
                if (index < rating) {
                    $(this).find('.star .la').removeClass('la-star-o');
                    $(this).find('.star .la').addClass('la-star');
                } else {
                    $(this).find('.star .la').addClass('la-star-o');
                    $(this).find('.star .la').removeClass('la-star');
                }

            });
        });

        //EDIT PROFILE TABSß
        $(document).on('click', '.edit-profile .tabs a', function(event) {
            event.preventDefault();
            /* Act on the event */
            var formClass = $(this).attr('class').split(' ')[0]+'-form';

            $('.edit-profile .tabs .active').removeClass('active');
            $(this).addClass('active');

            $('.edit-profile form').fadeOut('fast');
            $('.'+formClass).slideDown('slow');
        });

        //SHOW DASHBOARD SECTION
        $(document).on('click', '.dashboard .menu-items .item a', function(event) {
            event.preventDefault();

            var sectionClass = $(this).attr('class').split(' ')[1];

            $('.dashboard .menu-items .active').removeClass('active');
            $('.dashboard .section-content').fadeOut('fast');

            $(this).parent().addClass('active');
            $('.'+sectionClass).fadeIn('slow');
        }); 

        $(document).on('click', '.dashboard .dashboard-content .add-payment-method', function(event) {
            event.preventDefault();

            $('.dashboard .section-content.payment-method').fadeOut('fast');
            $('.dashboard .section-content.add-payment-method').fadeIn('slow');
        });

        $(document).on('click', '.dashboard .dashboard-content .edit-profile', function(event) {
            event.preventDefault();

            $('.dashboard .section-content.dashboard-home').fadeOut('fast');
            $('.dashboard .section-content.edit-profile').fadeIn('slow');
        });
    }

    function sliders() {
        if ($('#index.ui-page-active').length > 0) {
            if ($('.top-rated .slick-initialized').length < 1) {
                $('.top-rated .item-list').slick({
                    centerMode: true,
                    slidesToShow: 5,
                    arrows: false,
                    dots: false,
                    infinite: true,
                    responsive: [{
                            breakpoint: 1440,
                            settings: {
                                slidesToShow: 3,
                            }
                        }, {
                            breakpoint: 992,
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
                    ]
                });
            } else {
                if ($('.top-rated .slick-initialized').length < 1) {
                    $('.top-rated .slick-initialized').unslick();
                }
            }
        }

        if ($('#experience.ui-page-active').length > 0) {
            if ($('.experience-container .featured .slick-initialized').length < 1 && $(window).width() <= 767) {
                $('#experience .featured .item-list').slick({
                    centerMode: true,
                    slidesToShow: 1,
                    arrows: false,
                    dots: false,
                    infinite: true,
                    responsive: [{
                            breakpoint: 9999,
                            settings: "unslick"
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });
            }
        }

        if ($('#experience-inner.ui-page-active').length > 0) {
            if ($('.experience-inner-gallery .slick-initialized').length < 1) {
                $('.experience-inner-gallery .gallery').slick({
                    centerMode: true,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    arrows: true,
                    dots: false,
                    infinite: true,
                    centerPadding: '60px',
                    responsive: [{
                            breakpoint: 1440,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
                $('.experience-inner-gallery #inner-gallery').slickLightbox({
                    src: 'src',
                    itemSelector: '.item img'
                });
            }

            if ($('.experience-content .reviews .slick-initialized').length < 1) {
                $('.experience-content .reviews .gallery').slick({
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    arrows: true,
                    dots: false,
                    centerPadding: '60px',
                    responsive: [{
                            breakpoint: 1440,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
                $('.experience-content .reviews .gallery').slickLightbox({
                    src: 'src',
                    itemSelector: '.item img'
                });
            }
        }
    }

    function forms() {
        if ($(window).width() > 768) {
            $(".experience-container .filter").sticky({
                topSpacing: 0,
                bottomSpacing: 20
            });
            $(".dashboard .side-menu").sticky({
                topSpacing: 0,
                bottomSpacing: 20
            });
        } else {
            $(".experience-container .filter").unstick();
            $(".dashboard .side-menu").unstick();
        }

        $('.date input[type=date]').each(function() {
            var placeholder = $(this).attr("placeholder");

            $(this).parent().prepend('<label>' + placeholder + '</label>');
        });

        $(document).on('change', '.date input', function(event) {
            $(this).parent().parent().find('label').fadeOut('fast');
        });

        $(document).on('click', '.checkbox-placeholder', function(event) {
            event.preventDefault();

            $(this).parent().find('.checkbox').trigger('click');
            $(this).toggleClass('checked fas fa-check');
        });
    }

    function containerHeight() {
        if ($('#become-a-host.ui-page-active').length > 0) {
            var windowHeight = $(window).height(),
                menuHeight = $('header').height(),
                containerHeight = windowHeight - menuHeight;

            if ($(window).width() > 992) {
                $('.become-a-host .container').css('height', containerHeight + 'px');
            }
        };
    }

    function readURL(input) {
        $.each(input.files, function(index, val) {
            /* iterate through array or object */
            if (input.files && input.files[index]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    if ($(input).hasClass('property')) {
                        $(input).parent().parent().find('.img-name').append(`
                            <div class="img-item">
                                <img src="` + e.target.result + `">
                                <a href="#" class="remove"><i class="la la-close"></i></a>
                                <textarea rows="3" class="input-box" placeholder="What are the highlights of this photo?"></textarea>
                                <div class="flex">
                                    <div class="form-group radio-container flex">
                                        <input type="radio" class="radio cover" name="cover">
                                        <label for="cover">Set as cover photo</label>
                                    </div>
                                    <input type="number" class="input-box" placeholder="Serial" value="` + index + `" />
                                </div>
                            </div>
                        `);
                        $(input).parent().parent().find('.img-name .img-item:first-child .radio').attr('checked', 'checked');
                    } else {
                        $(input).parent().parent().find('.img-name').append(`
                            <div class="img-item">
                                <img src="` + e.target.result + `">
                                <a href="#" class="remove"><i class="la la-close"></i></a>
                            </div>
                        `);
                    }
                }
                reader.readAsDataURL(input.files[index]);
            }
        });
    }

    function confirmModal() {
        $('.modal').fadeIn('fast');

        setTimeout(function() {
            $('.modal .container').slideToggle('fast');
        }, 600);
    }

    function formDateRange() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        $('.start-date').attr('min', today);
    }

    return {
        init: init
    };
}());

jQuery(document).ready(function($) {
    travelInsider.init();
});