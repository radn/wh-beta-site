$(document).ready(function() {

    // nav fade in
    $('.template-a-b #header .header-container #nav').css('display','none');
    $('.template-a-b #header .header-container #nav').fadeIn(800);
    
    // show more/less retailers            
    $('.more-retailers-btn').click(function() {
       var buttonName = $(this).text();
       if(!$(this).hasClass('up')) {
            $('.retailers-b').slideUp(.500);
            $(this).addClass('up');
            $(this).html($(this).html().replace(buttonName,'More retailers'));
            $('html,body').animate({
                scrollTop: $('.retailers-section').offset().top
            }, 2000);
       } else {
            $('.retailers-b').slideDown('slow');
            $(this).removeClass('up');
            $(this).html($(this).html().replace(buttonName,'Show less'));
            $('html,body').animate({
                scrollTop: $('.retailers-section').offset().top
            }, 2000);
        }
    });

    // Carousel
    $("#owl-demo").owlCarousel({
        jsonPath : "/assets/js/json/eventsdata.json" 
    });

    // gallery
    function runGallery() {
        $('#slides').superslides({
            slide_easing: 'easeInOutCubic',
            slide_speed: 800,
            pagination: true
        });
    }
    
    runGallery();

    // home nav open /mobile site
    if($('body').hasClass('homepage')) {
        navopen();
    }

    // form section slide up/down
    $('.open-form').click(function() {
        var headerText;
        if($(this).hasClass('contact-iceskating')) {
            $('.formselect').attr('value','ice');
            $('.form-section').slideUp(1);
            $('.form-section').slideDown(1500);
            $('.contact-header').text('');
            headerText = 'Ice skating';

        } else if($(this).hasClass('contact-leasing')) {
            $('.formselect').attr('value','lease');
            $('.form-section').slideUp(1);
            $('.form-section').slideDown(1500);
            $('.contact-header').text('');
            headerText = 'Leasing';
        }
        $('.contact-header').delay(3500).text(headerText);
        $('html,body').animate({
            scrollTop: $('section.contact-section').offset().top
        }, 1500);
    });

    // mobile validation
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#contact-form').submit(function() {
            if ($.trim($('#contact-form .name').val()) === '' || $.trim($('#contact-form .email').val()) === '' || $.trim($('#contact-form .msg').val()) === '') {
                alert('Please fill out required fields');
                return false;
            }
        });
    }
});

$(window).bind('load', function() {

    // loader
    $('.home-gallery').delay(2500).css('visibility','visible');
    $('#header').css('visibility','hidden');
    $('#header').delay(2500).css('visibility','visible');
    $('.form-section').delay(2500).css('visibility','visible');

    // retailer interactive map show/hide      
    $('#imagemap-wrapper').slideUp(50);
    $('.interactivemap-head').removeClass('up');

    // Scroll to sections
    $('.dir').click(function() {
        $('#imagemap-wrapper').slideDown(500);
        $('.interactivemap-head').addClass('up');
        $('.interactivemap-head .interactivebtn-wraper span').fadeOut(1000);
        $('html,body').animate({
            scrollTop: $('#directory-start').offset().top
            }, 2000);
    });

    $('.go-top').on('click',function(){
        $('html,body').animate({ scrollTop: 0 }, 1400, function () {
        });
    });

    $('.explore').on('click',function(){
        $('html,body').animate({
            scrollTop: $('#washington-harbour').offset().top
            }, 2000);
    });

    $('#events-lnk').on('click',function(){
        $('html,body').animate({
            scrollTop: $('.upcoming-events').offset().top
            }, 2000);
    });

    // scroll to events
    if (window.location.href.indexOf('?events') > -1) {
        $('html,body').animate({
            scrollTop: $('#upcoming-events').offset().top
        }, 2000);
    }
    
    // scroll to directory
    if (window.location.href.indexOf('?directory') > -1) {
        $('html,body').animate({
            scrollTop: $('#directory-start').offset().top
        }, 2000);
    }

    // scroll to contacts
    if (window.location.href.indexOf('?contact-us') > -1) {
        $('html,body').animate({
            scrollTop: $('.contact-section').offset().top
        }, 2000);
    }

    // scroll to thank you message --- show / hide thank you message
    if (window.location.href.indexOf('?thank-you') > -1) {
        $('.message-wrapper h3').css('max-height','100px');
        $('.message-wrapper h3').css('visibility','visible');
        $('.message-wrapper h3').slideDown(1);
        $('html,body').animate({
            scrollTop: $('.thank-you-section').offset().top
        }, 2000);
    }
    
    // events nav directory
    $('.events #nav ul li:first-child a').attr('href', '/?directory');

    // thank-you timer
    setTimeout(function() {
        $('.thank-you-section').slideUp(1000);
    }, 10000);

    // Interactive map show/hide function
    function openMap () {
        $('.interactivemap-head').click(function() {
            if(!$(this).hasClass('up')) {
                $('#imagemap-wrapper').slideDown(900);
                $(this).addClass('up');
                $('.interactivemap-head .interactivebtn-wraper span').fadeOut(1000);
            } else {
                $('#imagemap-wrapper').slideUp(1200);
                $(this).removeClass('up');
                $('.interactivemap-head .interactivebtn-wraper span').fadeIn(1000);
            }
        });
    }

    openMap ();

    // bxslider
    var tempA = $('body').hasClass('template-a');
    var tempAB = $('body').hasClass('template-a-b');
    if(!!tempA || !! tempAB) {
        $('.bxslider').bxSlider();
    }

    // Events -- more/less 
    $('.items-wrapper p span.more-less').click(function () {
        window.location = '/events.html';
    });

});

$(document).scroll(function() {
    // Top nav fade in/out
    var y = $('body.homepage').scrollTop();
    var ffy = $('html, body.homepage').scrollTop();
    if (y > 108 || ffy > 108 ) {
        $('.homepage #header').addClass('header-bg');
        $('.homepage .header-wrapper').fadeIn(1100);
    } else {
        $('.homepage #header').removeClass('header-bg');
        $('.homepage .header-wrapper').fadeOut(1600);
    }
});

// active map function
function activateMap() {
     // change the map tooltip size for mobile device
    if ($(window).width() > 500) {
        $('area').each(function(tooltipster) {
            $(this).tooltipster({
                content: $('<img src="' + $(this).attr("rel") + '"><br>' + '<p><b>' + $(this).attr("title") + '</p>'),
                // setting a same value to minWidth and maxWidth will result in a fixed width
                minWidth: 190,
                maxWidth: 240,
                position: 'left' 
            });
        });
    }
    else {
        $('area').each(function(tooltipster) {
            $(this).tooltipster({
                content: $('<img src="' + $(this).attr("rel") + '"><br>' + '<p><b>' + $(this).attr("title") + '</p>'),
                minWidth: 130,
                maxWidth: 95,
                position: 'right'
            });   
        });
    }
    
    // Retailers list hover state
    $('area').each(function() {
        $(this).on('mouseenter', function() {
            var selectedRetailer = $(this).attr('class');
            // var retailerlistItem = $('.image-map-list li a').attr('class');
            var $retailerlistItem = $('.image-map-list li.' + selectedRetailer);

            if(!!selectedRetailer) {
                $('.image-map-list li a').removeClass('selected');
                $retailerlistItem.addClass('selected');  
            }
            // if(selectedRetailer = retailerlistItem) {
            // // if($('.image-map-list li a').hasClass(selectedRetailer)) {
            //         // console.log(selectedRetailer);
            //         $('.image-map-list li' + 'a.' + selectedRetailer).addClass('selected');
            // } else {
            //     $('.image-map-list li a').removeClass('selected');
            // }
        })
        .on('mouseleave', function() {
            $('.image-map-list li a').removeClass('selected');
        });
    });

    $('img[usemap]').rwdImageMaps();
    

    // Interactive map active tab
    $('.tabs-two').click(function() {
        $('.tabs-two').removeClass('active-tab');
        $(this).addClass('active-tab');
        $('#imagemap-wrapper .image-map').css('max-height','100%');
        
        if($('.active-tab').hasClass('up')) {
            $('.map-container').css('display','none');
            $('.upper-container').css('display','block');
        } else if($('.active-tab').hasClass('lp')) {
            $('.map-container').css('display','none');
            $('.lower-container').css('display','block');
            $('.lower-container').css('visibility','visible');
        }
    });
    
    // Interactive map active tab
    $('.tabs-two').click(function() {
        $('.tabs-two').removeClass('active-tab');
        $(this).addClass('active-tab');
    });
}

// mobile site nav open/close
function navopen() {
    $('#nav').click(function() {
        $(this).toggleClass('open');
    });
}