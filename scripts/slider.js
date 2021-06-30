$(document).ready(function () { 

    var sliderSelector = '.swiper-container',
    options = {
        init: false,
        loop: true,
        speed: 800,
        slidesPerView: 1,
        centeredSlides : true,
        effect: 'coverflow', 
        coverflowEffect: {
            stretch: 0, 
            modifier: 1, 
            slideShadows : true, 
        },
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1023: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        },
        // Events
        on: {
                imagesReady: function(){
                this.el.classList.remove('loading');
                }
            }
        };
    var mySwiper = new Swiper(sliderSelector, options);

    // Initialize slider
    mySwiper.init();

});