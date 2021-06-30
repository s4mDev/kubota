$(document).ready(function(){
    $('#pagePilingDesktop').pagepiling({
        menu:'#menu',
        direction: 'vertical',
        verticalCentered: true,
        anchors: ['main-section-desktop', 'gallery-section', 'map-section'],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
            normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,
        navigation: false
    });

    changeHeightContent();
   
});
$(window).resize(function () {
    changeHeightContent();
});

function changeHeightContent() {
    let heightInner = $(window).innerHeight() - $('.header').height();
    $('.box_full-page').css('height', heightInner);
}