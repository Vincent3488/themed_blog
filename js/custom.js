/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */


(function ($) { 
	'use strict';
	/* ----------------------------------------------------------- */
	/*  Site search
	/* ----------------------------------------------------------- */

 // overlay search

    $('.search_toggle').on('click', function(e) {
        e.preventDefault();
        $('.search_toggle').toggleClass('active');
        $('.overlay').toggleClass('open');
        setTimeout(function(){
            $('.search-form .form-control').focus();
        },400);

    });

 // instafeed Js 

 if (($('#instafeed').length) !== 0) {
    var userId = $('#instafeed').attr('data-userId');
    var accessToken = $('#instafeed').attr('data-accessToken');
      var userFeed =  new Instafeed({
      get: 'user',
      userId: '8987997106',
      resolution: 'standard_resolution',
      accessToken: '8987997106.924f677.8555ecbd52584f41b9b22ec1a16dafb9',
      limit: 4,
      template: '<div class="instagram-post col-lg-3 col-md-3 col-sm-6 col-6" id="{{id}}" ><a href="{{link}}" target="_blank" ><img src="{{image}}" class="img-fluid w-100"/><div class="intsa-meta"><span>{{likes}}</span><span>{{comments}}</span></div></a></div>'

      });
    userFeed.run();
  }


/* ----------------------------------------------------------- */
  /*  Slick Carousel
  /* ----------------------------------------------------------- */

  $('.slider-wrap').slick({
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplaySpeed: 4000,
    items:3,
    loop:true,
    autoplay:true,
    dots:true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },{
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
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
 
 // post gallery

        $('.post_gallery').owlCarousel({
            loop:true,
            margin:1,
            nav:true,
            dots: false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
	


	$('.post-slide').slick({
		fade: true,
    autplay:true
	});		

	// magnific Popup iframe

      $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
          disableOn: 300,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
      });

	// -----------------------------


	/* ----------------------------------------------------------- */
	/*  Scroll To Top
	/* ----------------------------------------------------------- */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

})(jQuery);
// Change color when the page is scrolled
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) { // Change 50 to whatever scroll threshold you'd prefer
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});
function searchBlogs() {
  // Get the search query
  let searchQuery = document.getElementById('searchInput').value.toLowerCase();

  // Get all blog posts
  let posts = document.querySelectorAll('.post-grid');

  // Loop through all posts and hide those that don't match the query
  posts.forEach(function(post) {
      let postTitle = post.getAttribute('data-title').toLowerCase();
      if (postTitle.includes(searchQuery)) {
          post.style.display = 'block';  // Show post
      } else {
          post.style.display = 'none';   // Hide post
      }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Create an intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Adjust the threshold as needed

  // Select all elements with the fade-in class
  document.querySelectorAll('.fade-in').forEach((element) => {
    observer.observe(element);
  });
});



