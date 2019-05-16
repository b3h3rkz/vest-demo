(function ($) {
 "use strict";

  // STICKY ACTIVE
  var activeSticky = $('#active-sticky'),
      winD = $(window);
    winD.on('scroll',function() {
      var scroll = $(window).scrollTop(),
  		    isSticky = activeSticky;
      if (scroll < 1) {
       		isSticky.removeClass("is-sticky");
      }
      else{
       	isSticky.addClass("is-sticky");
      }
   });

   // MENU A ACTIVE JQUERY
  var pageUrl = window.location.href.substr(window.location.href.lastIndexOf("/")+1),
      aActive = $('nav ul li a');
  if (aActive.length) {
    aActive.each(function(){
      if($(this).attr("href") === pageUrl || $(this).attr("href") === '' )
      $(this).addClass("active");
    });
  }

  // Scroll UP
  $.scrollUp({
      scrollText: '<i class="ti-angle-up"></i>', // Text for element, can contain HTML
      scrollSpeed: 800
  });

  // Counter Up
  var $countUp = $('.counter');
  $countUp.counterUp({
      delay: 30,
      time: 2000
  });

  // MAIL CHIMP AJAX ACTIVE
	var mCForm = $('#mc-form');
	mCForm.ajaxChimp({
		callback: mailchimpCallback,
		//Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
		url: "http://regaltheme.us16.list-manage.com/subscribe/post?u=9779a0e5298ed51ec0ff0a92b&amp;id=5466926a9f"
	});
	function mailchimpCallback(resp) {
		if (resp.result === 'success') {
			alert(resp.msg);

		} else if(resp.result === 'error') {
			alert(resp.msg);
		}
		return false;
	}

	// CONTACT FORM VALIDATIONS SETTINGS
	var contactForm = $('#contact_form');
	if ($('#contact_form').length) {
		contactForm.validate({
			onfocusout: false,
			onkeyup: false,
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				}
			},
			errorPlacement: function(error, element) {
				error.insertBefore(element);
			},
			messages: {
				name: "What's your name?",
				email: {
					required: "What's your email?",
					email: "Please, enter a valid email"
				}
			},

			highlight: function(element) {
				$(element)
				.text('').addClass('error')
			},

			success: function(element) {
				element
				.text('').addClass('valid')
			}
		});
	}

	// CONTACT FORM SCRIPT
	if ($('#contact_submit').length) {
  	var contactSubmit = $('#contact_submit');
  	contactForm.submit(function() {
  		// submit the form
  		if($(this).valid()){
  		   contactSubmit.button('loading');
  			var action = $(this).attr('action');
  			$.ajax({
  				url: action,
  				type: 'POST',
  				data: {
  					contactname: $('#contact_name').val(),
  					contactemail: $('#contact_email').val(),
  					contactsubject: $('#contact_subject').val(),
  					contactmessage: $('#contact_message').val()
  				},
  				success: function() {
  				   contactSubmit.button('reset');
  				   contactSubmit.button('complete');
  				},
  				error: function() {
  					contactSubmit.button('reset');
  					contactSubmit.button('error');
  				}
  			});
  		// return false to prevent normal browser submit and page navigation
  		} else {
  			contactSubmit.button('reset')
  		}
  		return false;
  	});
  }

  // Window Load function
  jQuery(window).on('load', function(){
    // Preloader
    var preeLoad = $('#fadeout');
    		preeLoad.fadeOut(1000);
  });

})(jQuery);
