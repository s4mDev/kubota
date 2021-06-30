$('#artist-text').typeIt({
     speed: 200
});

$('#about-text').typeIt({
     speed: 200
});

$(document).ready(function () { 

    // Select lang
    let select = $(".select-lang-js").select2({
        width: 'auto',
        dropdownCssClass: 'select-lang',
        minimumResultsForSearch: -1
    });
    $(".select-loc-js").select2({
        width: 'auto',
        dropdownCssClass: 'select_loc',
        minimumResultsForSearch: -1
    });
    $(".feedback__select_js").select2({
        width: '100%',
        dropdownCssClass: 'select-form',
        minimumResultsForSearch: -1
    });


   
    let widthInner = $(window).innerWidth(),
        widthOuter = $(window).outerWidth(),
        scrollbarWidth = widthOuter - widthInner,
        checkScrollBar = false;

    function changeCheckSrollBar() {
        if (!checkScrollBar) {
            $('body').css('padding-right', scrollbarWidth).addClass('unable-scroll');
        } else {
            $('body').css('padding-right', '').removeClass('unable-scroll');
        }
        checkScrollBar = !checkScrollBar;
    }

    // mobile menu 
    $('.mobile-menu__btn').on('click', function() {
        changeCheckSrollBar();

        $(this).toggleClass('mobile-menu_show');
        $(this).closest('.header__wrap').find('.header-content').toggleClass('header-content_open');
    });

    $('.header-menu_mobile .header-menu__link').on('click', function() {
        event.preventDefault();
        $(this).toggleClass('header-menu__link_open');
        $(this).siblings('.menu-child').toggle();
    });

    // video
    function videoPlay(wrapper) {
        let iframe = wrapper.find('.video__iframe_js'),
            src = iframe.data('src');

        wrapper.addClass('video__content_active');
        iframe.attr('src', src);
    }


    // btn more
    $('.btn_more_js').on('click', function() {
        $(this).closest('div').addClass('full-height');
        $(this).hide();
    });

    // btn more
    $('.link_js').on('click', function() {
        $(this).closest('.documentary__item').find('.documentary__descr').toggleClass('documentary__descr_full');
        $(this).hide();
    });

    // anchor-link
    let $page = $('html, body');
    $('.timeline__link').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });

    // archive btn more
    $('.archive__btn_more').on('click', function(){
        $(this).closest('.archive__item').addClass('archive__item_full-1x2');
    });
    $('.archive__btn_hide').on('click', function(){
        $(this).closest('.archive__item').removeClass('archive__item_full-1x2');
    });

    // btn clear for search input
    $(".search-form__button-clear_js").on("click", function() {
        let input = $(this).closest('.search-form').find('.search-form__input_js');

        input.val("");
        input.focus();
        $(this).prop('disabled', true);
    });

    checkEmptyField('.search-form__input_js', '.search-form_modal .search-btn_js');
    checkEmptyField('.search-form_page .search-form__input_js', '.search-form__button-clear_js');


    // open modal form 
    $(".header-search .search-btn_js").on("click", function() {
        let modalForm = $('#form-search');

        changeCheckSrollBar();

        $(this).hide();
        modalForm.fadeIn('fast');
        modalForm.find('.search-form__input ').focus();
    });
    // close modal form
    $(".btn-close_js").on("click", function() {
        changeCheckSrollBar();
        $('body').removeClass('unable-scroll');
        $(this).closest('.modal-form').fadeOut('fast');
        $(this).closest('body').find('.search-btn_js').show();
    });

    // tab video
    selectTab('.video-gallery__thumbnails', '.video-section__gallery', '.video-gallery-view__item', 'video-gallery-view__item_active', 'video-gallery__thumbnails_active');

    // tab product card 
    selectTab('.products-nav__item', '.products-card-preview', '.products-view__item', 'products-view__item_active', 'products-nav__item_active');

});

$(window).on('load', function () {
     // zoom img 
    let count = 0,
        img = $('.products__item_active .products__img'),
        globalElement_width = img.width(),
        globalElement_height = img.height();

    // products tab
    $('.material-thumbnails__item').on('click', function () {
        event.preventDefault();

        if (count > 0) {
            count = 0;
            resize_img(count*50);
        }

        let tab = $(this).closest('.main-section').find('.products__item'),
            target = $(this).attr('href');

        $(target).addClass('products__item_active');
        tab.not(target).removeClass('products__item_active');
        
        $(this).addClass('material-thumbnails__item_active');
        $('.material-thumbnails__item').not(this).removeClass('material-thumbnails__item_active');
    });

    $('#plus').on('click', function () {
        if(count < 2) {
            count += 1;
            resize_img(count*50);
        }
    });

    $('#minus').on('click', function () {
        if(count > 0) {
            count -= 1;
            resize_img(count*50);
        }
    });

    function resize_img(val) {
        let img = $('.products__item_active .products__img');
            width = globalElement_width,
            height = globalElement_height,
            zoom_percen = width * 0.5, // Maximum zoom 50%
            ASPECT = zoom_percen / 50,
            zoom_value = val / 2,
            size = width + ASPECT * zoom_value;
            heightSize = height + ASPECT * zoom_value;
            d = ASPECT*zoom_value/2;       
        
        img.stop(true).animate({      
            width: size,
            height: heightSize
        }, {
            step: function(d,fx) {
            $(this).css('-webkit-transform','rotate('+ -d +'px)'); 
            },
            duration:'slow'
        }, 'liner');
    }
});

function checkEmptyField(input, button) {
    $(input).keyup(function () {
        if ($(this).val() == '') {
            $(button).prop('disabled', true);
        } else {
            $(button).prop('disabled', false);
        }
    }).keyup();
}

function selectTab(navElement, wrapper, navContent, classActiveContent, classActiveNav) {
    $(navElement).on('click', function () {
        event.preventDefault();

        let tab = $(this).closest(wrapper).find(navContent),
            target = $(this).attr('href');

        $(target).addClass(classActiveContent);
        tab.not(target).removeClass(classActiveContent);
        
        $(this).addClass(classActiveNav);
        $(navElement).not(this).removeClass(classActiveNav);
    });
}