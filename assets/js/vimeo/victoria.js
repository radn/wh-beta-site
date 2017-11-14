/*
 * Victoria v1.0
 * Copyright 2014 Limitless LLC
 */

jQuery(document).ready(function($) {
   'use strict';

	//Default Settings
	var homeVideoMuted = true;

   	//Vars
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	//Basics
	$(".header .logo").click(function(e){
		if($('section.home').length){
			$('html,body').animate({scrollTop: 0}, 'slow');
		} else {
			window.open("index.html", "_self");
		}
		
	});
	
	$(document).scroll(function() { 
		var h = window.innerHeight / 1.3;
        var st = $(this).scrollTop();
        $('.home .content').css('opacity', (1-st/h) );

		if($('section.home').length && $(this).scrollTop() < 180) {
			$('.header').stop().animate({ backgroundColor: 'rgba(17,17,17,0)' }, 'fast');
		} else {
			$('.header').stop().animate({ backgroundColor: 'rgba(17,17,17,1)' }, 'fast');
		}

	});
	//Basics

	//Navigation Menu
    $(".header .menu").click(function(e){
    	if ($('.header .navigation').is(":hidden")) {
    		$('.header').stop().animate({ height: windowHeight }, 'slow');
    		$('.header .logo').stop().animate({ top: windowHeight - 55 }, 'fast');
    		$('.header .menu').stop().animate({ top: windowHeight - 45 }, 'fast');
			$('.header .navigation').slideDown("fast","easeInQuart");
			var md = windowHeight - $('.header .navigation ul').height();
    		$('.header .navigation ul').stop().animate({ marginTop: md / 2 }, 'fast');
		} else {
    		$('.header .logo').stop().animate({ top: 15 }, 'fast');
    		$('.header .menu').stop().animate({ top: 27 }, 'fast');
			$('.header .navigation').slideUp("fast","easeOutQuart");
    		$('.header').stop().animate({ height: 70 }, 'slow');
		}
    });

	$(".navigation li").click(function(e){
		var type = $(this).attr("data-type");
		if(type==="in") {

			var name = $(this).attr("data-url");
			$('.navigation li[data-url="' + name + '"]').addClass('active', {duration:300});
			$('.navigation li[data-url="' + name + '"]').siblings().removeClass('active', {duration:300});
			
	    	if (!$('.header .navigation').is(":hidden")) {
				$('.header .logo').stop().animate({ top: 15 }, 'fast');
	    		$('.header .menu').stop().animate({ top: 27 }, 'fast');
	    		if (!$('.header .menu').is(":hidden")) $('.header .navigation').slideUp("fast","easeOutQuart");
	    		$('.header').stop().animate({ height: '80px' }, 'fast', function() {
	    			$('html,body').stop().animate({scrollTop: $("section."+name).position().top - 60}, 'slow');
				});
			}

		} else {
			var url = $(this).attr("data-url");
			window.location = url;
		}
		
	});
	//Navigation Menu

	//Navigate
	$(".about .browse").click(function(){
		$('html,body').animate({scrollTop: $("section.projects").position().top - 60}, 'slow');
	});

	$(".projects .contact").click(function(){
		$('html,body').animate({scrollTop: $("section.contact").position().top - 60}, 'slow');
	});

	$(".error-page .back").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, "_self");
	});
	//Navigate

	//Home
	$(".home .scroll").hover(function(e){
		$(this).removeClass("fadeInDownHalf");
		$(this).removeClass("animated");
	});

	$(".home .scroll").click(function(){
		$('html,body').animate({scrollTop: $("section.about").position().top - 60}, 'slow');
	});

	$(".home .slide").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-url")+")");
	});

	$('.home').flexslider({
	    animation: "fade",
	    animationLoop: true,
	    animationSpeed: 1500,
	    easing: "easeOutBack",
	    slideshow: true,
	    pauseOnHover: false,
	    controlNav: true,
	    directionNav: true
 	});
	//Home

	//Team
	$(".team .member").hover(function(e){
		$(".team .member").stop().animate({ opacity: 0.5 }, 'slow');
		$(this).stop().animate({ opacity: 1 }, 'slow');
	}, function(){ 
		$(".team .member").stop().animate({ opacity: 1 }, 'slow');
	});
	//Team

	//Work
	$(".project").hover(function(e){
		$(this).find(".info").addClass("active");
	}, function(){
		$(this).find(".info").removeClass("active");
	});

	$(".project").click(function(){
		var projectUrl = $(this).attr("data-url");
		var projectLocation = $(this).offset().top;
        $.ajax({
            url: projectUrl
        }).success(function (data) {

            $('.projects .preview').fadeIn("fast");
            $('.projects .preview').html(data);

            $('html,body').animate({
                scrollTop: $('.projects .preview').offset().top - 80
            }, 500);

            $('.projects .preview .close').click(function () {

            	$('.projects .preview').fadeOut("fast");
                $('html,body').animate({ scrollTop: projectLocation - 140 }, 500);
                setTimeout(function () {
                    $('.projects .preview').html('');
                }, 1000);
            });

			$('.projects .preview .slider').flexslider({
				animation: "slide",
				slideshow: true,
				directionNav: false,
				controlNav: true,
				animationSpeed: 600
			});

			var t = $('.projects .preview .player').attr("data-type");
			var u = $('.projects .preview .player').attr("data-url");

			if(t==="youtube") {

				var d = '<iframe width="530" height="299" src="//www.youtube.com/embed/'+ u +'?rel=0" frameborder="0" allowfullscreen></iframe>';
				$('.projects .preview .player').html(d);

			} else if (t==="vimeo") {
				var d = '<iframe src="//player.vimeo.com/video/'+ u + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="530" height="299" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
				$('.projects .preview .player').html(d);

			} else if (t==="soundcloud") {
				var d = '<iframe width="530" height="299" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + u + '&amp;auto_play=false&amp;hide_related=false&amp;visual=true"></iframe>'
				$('.projects .preview .player').html(d);
			}

        });

		return false;
	});

	$(".works .start button").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_self');
	});
	//Work

	//Services
	$('.services .grid').flexslider({
	    animation: "slide",
	    animationLoop: false,
	    slideshow: false,
	    itemWidth: 300,
	    itemMargin: 20,
	    controlNav: false,
	    directionNav: true
 	});
	//Services

	//Blog
	$('.blog .slider').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    animationSpeed: 600,
	    easing: "easeOutBack",
	    slideshow: true,
	    pauseOnHover: false,
	    controlNav: true,
	    directionNav: false
 	});

 	$('section.article .cover').css("background-image", "url("+$('section.article .cover').attr("data-url")+")");
 	$('section.article .navigate').css("background-image", "url("+$('section.article .navigate').attr("data-url")+")");
	//Blog

	//Contact
	$('.contact .submit').click(function(){ 

		$('.contact input#name').removeClass("input-error");
		$('.contact input#subject').removeClass("input-error");
		$('.contact textarea#message').removeClass("input-error");
		$('.contact input#email').removeClass("input-error");
		
		var error = false; 
		var name = $('input#name').val(); 
		if(name == "" || name == " ") { 
			error = true; 
			$('.contact input#name').addClass(".contact input-error");
		} 

		var subject = $('.contact input#subject').val(); 
		if(subject == "" || subject == " ") { 
			error = true; 
			$('.contact input#subject').addClass(".contact input-error");
		}
		
		var msg = $('.contact textarea#message').val(); 
		if(msg == "" || msg == " ") {
			error = true;
			$('.contact textarea#message').addClass(".contact input-error");
			
		}
		
		var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
		var email = $('.contact input#email').val(); 
		if (email == "" || email == " ") { 
			$('.contact input#email').addClass(".contact input-error");
			error = true;
		}else if (!email_compare.test(email)) { 
			$('.contact input#email').addClass(".contact input-error");
			error = true;
		}

		if(error == true) {
			return false;
		}

		var data_string = $('.contact form').serialize(); 
		
		$.ajax({
			type: "POST",
			url: $('.contact form').attr('action'),
			data: data_string,
			
			success: function(message) {
				if(message === 'ok'){
					$('.contact .message-success').fadeIn('slow');
					$('.contact input#name').val('');
					$('.contact input#email').val('');
					$('.contact input#subject').val('');
					$('.contact textarea#message').val('');
				}
				else{
					$('.contact .message-error').fadeIn('slow');
				}
			}
		});

		return false; 
	});
	//Contact

	//Footer
	$("footer .top").click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow');
	});

	$("footer .social li").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_blank');
	});
	//Footer

});


$(window).load(function() {

	fixSizes();

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	if($('section.home').length && $(this).scrollTop() < 180) {
		$('.header').stop().animate({ backgroundColor: 'rgba(17,17,17,0)' }, 'fast');
	} else {
		$('.header').stop().animate({ backgroundColor: 'rgba(17,17,17,1)' }, 'fast');
	}


	var sectionOffset = '15%';
	$("section").waypoint({
		handler: function(event, direction) {
			var name=$(this).attr("id");
			if (direction === "up")  name = $(this).prev().attr("id");
			if (direction === "up")  sectionOffset = '30%';
			$('.navigation li[data-url="' + name + '"]').addClass('active', {duration:300});
			$('.navigation li[data-url="' + name + '"]').siblings().removeClass('active', {duration:300});
	  	},
		offset: sectionOffset
	});



	$(".loader").delay(1000).fadeOut('slow');

	//Animations
	setTimeout(function(){$('.header').addClass('animated fadeInDown')},1300);
	setTimeout(function(){$('#home .content').addClass('animated fadeInDown')},1600);

    $('#about').waypoint(function() {
        setTimeout(function(){$('#about .story').addClass('animated fadeInDown')},0);
    }, { offset: '50' });

    $('#team').waypoint(function() {
        setTimeout(function(){$('#team .member').addClass('animated fadeInDown')},0);
    }, { offset: '50' });

    $('#quotes').waypoint(function() {
        setTimeout(function(){$('#quotes .slider').addClass('animated fadeInLeft')},0);
    }, { offset: '50' });

    $('#services').waypoint(function() {
        setTimeout(function(){$('#services .service').addClass('animated fadeInLeft')},0);
    }, { offset: '50' });

    $('#projects').waypoint(function() {
        setTimeout(function(){$('#projects .project').addClass('animated fadeInUp')},0);
    }, { offset: '50' });

    $('#contact').waypoint(function() {
        setTimeout(function(){$('#contact .form').addClass('animated fadeInUp')},0);
        setTimeout(function(){$('#contact .info').addClass('animated fadeInDown')},0);
    }, { offset: '50' });
    //Animations

});


$(window).resize(function() {
	fixSizes();
});


function fixSizes() {

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	$(".fullscreen").css('height', windowHeight);

	var rat = windowWidth / windowHeight;
	
	if (rat > (16/9)) {

		var v = windowWidth * (16/9);
		$(".home video").css('width', windowWidth);
		$(".home video").css('height', v);

		var vc = ($(".home video").height() - windowHeight) / 2;
		$(".home video").css('margin-top', '-'+vc+'px');
		$(".home video").css('margin-left', '0px');

	} else {

		var v = windowHeight * (16/9);
		$(".home video").css('height', windowHeight);
		$(".home video").css('width', v);

		var vc = ($(".home video").width() - windowWidth) / 2;
		$(".home video").css('margin-top', '0px');
		$(".home video").css('margin-left', '-'+vc+'px');

	}

	$(".project").each(function() {

		if ( windowWidth > 960 ) { 
			$(this).css('width', (windowWidth / 4));
			$(this).css('height', (windowWidth / 4));
		} else if ( windowWidth > 767) { 
			$(this).css('width', (windowWidth / 3));
			$(this).css('height', (windowWidth / 3));
		} else if ( windowWidth > 480) { 
			$(this).css('width', (windowWidth / 2));
			$(this).css('height', (windowWidth / 2));
		} else {
			$(this).css('width', windowWidth);
			$(this).css('height', windowWidth);
		}

		$(this).find(".content").css('margin-top', (($(this).height() - $(this).find(".content").height()) / 2));
	});

	$(".vertical-center").each(function() {
		$(this).css('margin-top', ($(this).parent().height() - $(this).height()) / 2);
	});

	var z = (windowHeight - $(".home .flex-control-nav").height()) / 2;
	$(".home .flex-control-nav").css('top', z);
	$(".home .flex-prev").css('top', z - 60);
	$(".home .flex-next").css('top', z + $(".home .flex-control-nav").height() + 55);

	var t = $(".services .filter").width() - ($(".services .filter li").length * 40);
	var p = t / $(".services .filter li").length;
	$(".services .filter li").each(function() {
		$(this).css('margin-right', p/2);
		$(this).css('margin-left', p/2);
	});

	loadServices();

}


function loadServices() {

	if($(".services .filter li").length) {
		$('.services .filter li:eq(0)').trigger( "click" );
	}

}