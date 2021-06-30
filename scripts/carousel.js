$(document).ready(function(){
    
    $('#carousel-collection').carousel(
        {
            indicators: true,
            numVisible: 3,
        }
    );
    $('#carousel-reviews').carousel(
        {
            fullWidth: true

        }
    );
  
     // move next carousel
    $('.carousel-arrow-next__btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.carousel').carousel('next');
    });

    // move prev carousel
    $('.carousel-arrow-prev__btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.carousel').carousel('prev');
    });

    var changeSlide = function(index, cl) {
        cl = (typeof cl == undefined) ? '.carousel.carousel-slide' : cl;
        $(cl).carousel();
        $(cl).carousel.set(index);
    }

    $('.carousel.carousel_products').carousel({
        fullWidth: true,
        onCycleTo: function(data){
            changeSlide($(data).data('cindex'), '.carousel.carousel_thumbnails');
        }
    });
    
    $('.carousel.carousel_thumbnails').carousel({
        dist: 0,
        numVisible: 3,
        onCycleTo: function(data){
            changeSlide($(data).data('cindex'), '.carousel.carousel_products');
        }
    });
});
$(window).resize(function() {
    $('#carousel-collection').carousel({
        numVisible: 6,
    });
    $('#carousel-reviews').carousel(
        {
            fullWidth: true

        }
    );
});  