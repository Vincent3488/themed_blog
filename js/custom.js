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

// Get the form element by ID
const form = document.getElementById('contact-form');

// Listen for the form submission event
form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Convert the FormData object into a URL-encoded string
    const formEntries = new URLSearchParams(formData).toString();

    // Send the form data using Fetch API
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formEntries
        });

        // Check if the submission was successful
        if (response.ok) {
            alert('Form submitted successfully!');
            // Optionally redirect to a thank you page
            window.location.href = '/thank-you';
        } else {
            alert('There was a problem submitting the form.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    }
});

document.getElementById('search-input').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const posts = document.querySelectorAll('.post-grid');

  posts.forEach(post => {
      const postContent = post.textContent.toLowerCase();

      if (postContent.includes(searchTerm)) {
          // Highlight or show matching post
          post.style.display = 'block'; // Ensure it's visible

          // Scroll smoothly to the matched post
          post.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
          // Hide non-matching posts
          post.style.display = 'none';
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const posts = document.querySelectorAll('.post-grid'); // Select all posts

  searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();

      posts.forEach(post => {
          const title = post.querySelector('.post-title a').textContent.toLowerCase();
          const description = post.querySelector('.post-content p').textContent.toLowerCase();

          if (title.includes(query) || description.includes(query)) {
              post.style.display = 'block'; // Show post if it matches the search query
          } else {
              post.style.display = 'none'; // Hide post if it does not match
          }
      });

      // Scroll to the first visible post (if any)
      const firstVisiblePost = document.querySelector('.post-grid:not([style*="display: none"])');
      if (firstVisiblePost) {
          firstVisiblePost.scrollIntoView({ behavior: 'smooth' });
      }
  });
});


