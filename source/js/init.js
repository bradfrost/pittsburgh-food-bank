(function(w){
	var sw = document.body.clientWidth;

	//On Window Resize
	$(w).resize(function(){
		sw = document.body.clientWidth; //Update screen width
	});

	//Navigation toggle for small screens
	$('.nav-toggle-menu').click(function() {
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
		$('.header .search-form').removeClass('active');
		$('.nav-toggle-search').removeClass('active');
		return false;
	});
	
	//Search form toggle for small screens
	$('.nav-toggle-search').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.header .search-form').toggleClass('active');
		$('.nav').removeClass('active');
		$('.nav-toggle-menu').removeClass('active');
		if($('.header .search-form').hasClass('active')) {
			$('.header .search-field').focus();
		}
	});

	//Primary Navigation
	$('body').on('click',function() {
		$('.nav-subnav-link, .nav-subnav').removeClass('active');
	});

	//Append icon after subnav items
	$('.menu-item-has-children > a').append('<span class="icon-arrow-down5"></span>');
	
	$('.menu-item-has-children > a').on('click',function(){
		var $this = $(this),
			$panel = $this.next('.sub-menu');

		//Close other panels if link isn't a subnavigation item
		$('.menu-item-has-children > a').not($this).removeClass('active');
		$('.sub-menu').not($panel).removeClass('active');

		//Toggle Class
		$this.toggleClass('active');
		$panel.toggleClass('active');

		return false;
	});



	//
	// Donate Form
	//

	//Set initial donate Step
	var donateStep = 1;

	//Hide steps 2 and 3
	$('.donate-step').not('#donate-step-1').addClass('closed');
	$('.field-container-city, .field-container-state').addClass('is-vishidden');
	$('.donate-submit-text').text('Next Step');
	
	//Donation form submit action
	$(".donate-submit").on('click',function(e){
		e.preventDefault();

		//If user is on the first step, advance to step two
		if(donateStep === 1) {
			donateStep++;
			updateDonateStep();
			$('#donate-name').focus();
			smoothScroll($('#donate-step-2'));
		}
		//If user is on the second step, advance to step three
		else if (donateStep === 2) {
			donateStep++;
			updateDonateStep();
			$('#payment-cc-num').focus();
			$('.donate-submit-text').text('Complete Donation');
			smoothScroll($('#donate-step-3'));
		}
		//If user is on the final step, submit the form
		else if (donateStep === 3) {
			$('#donate-form').submit();
		}
	});

	//Advance the form to next major section
	function updateDonateStep() {
		$('#donate-step-'+donateStep).removeClass('closed');
	}

	//Form Validation
	$('.donate-form input').focusout(function() {
		$(this).parsley().validate();
	});

	$('.donate-form').parsley();
	
	$('#donate-name').focusout(function(){
		var $thisVal = $(this).val().split(' '),
			$first = $thisVal.shift(),
			$last = $thisVal.join(' ');
		
		$('#billing-first-name').val($first);
		$('#billing-last-name').val($last);
	});
	
	$('.amount-container').hide();
	
	//Update message on hover
	$('.chicklet-list a, .chicklet-list .input-container').hover(function(){
		var $this = $(this),
			$thisMessage = $this.attr('data-message'),
			$messageContainer = $('#donate-step-1 .donate-step-message');
			
		$messageContainer.text($thisMessage);
	});
	
	//Donate button list
	$('.chicklet-list a').click(function(e){
		var $this = $(this),
			$thisMessage = $this.attr('data-message'),
			$thisAmount = $this.attr('data-amount');
		e.preventDefault();
		$('.chicklet-list a').removeClass('active');
		$(this).addClass('active');
		$('#other-amount').val("");
		$('#donation-amount').val($thisAmount);
	});
	
	$('#other-amount').focus(function(){
		$('.chicklet-list a').removeClass('active');
	});
	
	$('#other-amount').blur(function(){
		$thisAmount = $(this).val();
		if($thisAmount!=="") {
			$('#donation-amount').val($thisAmount);
		}
	});
	
	
	//Payment Type Radio
	$('#payment-type-radio').change(function() {
		var $paymentTypeTarget = $(this).find('input:checked').attr('data-payment-type');
		
		$('.payment-type').removeClass('active');
		$('#'+$paymentTypeTarget).addClass('active');
	});

	//Scroll the body of an 
	function smoothScroll(el) {
		var target = el;
		$('html,body').animate({
			scrollTop: target.offset().top
		}, 1000);
		return false;
	}
	
	function is_int(value){
      if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
        return true;
      } else {
        return false;
      }
    }

	
	$("#donate-zip").keyup(function() {
	  var el = $(this);
	
	  if ((el.val().length == 5) && (is_int(el.val()))) {
	   
	    // Make Ajax call to Ziptastic
	    $.ajax({
		  url: "http://zip.elevenbasetwo.com/v2",
		  cache: false,
		  dataType: "json",
		  type: "GET",
		  data: "zip=" + el.val(),
		  success: function(result, success) {
		    $('.field-container-city, .field-container-state').removeClass('is-vishidden'); /* Show the fields */
		
		    $("#donate-city").val(result.city); /* Fill the data */
		    $("#donate-state").val(result.state);
		
		    $(".zip-error").hide(); /* In case they failed once before */
		
		    $("#donate-city").focus(); /* Put cursor where they need it */
		
		  },
		  error: function(result, success) {
			
		    $('.field-container-city, .field-container-state').removeClass('is-vishidden');
		
		  }
		
		});
	 
	  }
	
	});

	//Prevent links appearing within an accordion handle from firing
	$('.acc-handle a').on('click',function(){
		if (window.matchMedia("(max-width: 46.8em)").matches) {
			$(this).parent().toggleClass('active');
			$(this).parent().next('.acc-panel').toggleClass('active');
			return false;
		}
	});

	//Accordion
	$('.acc-handle').on('click',function(){
		if (window.matchMedia("(max-width: 46.8em)").matches) {
			$(this).toggleClass('active');
			$(this).next('.acc-panel').toggleClass('active');
			return false;
		}
	});
    
    //Fix text widows http:/justinhileman.info/article/a-jquery-widont-snippet/
	$('h1, .page-title, .page-intro, .b-title, .b-excerpt').each(function() {
        $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
    });

})(this);