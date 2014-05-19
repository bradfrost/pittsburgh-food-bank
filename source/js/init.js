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

	//Hide steps 2 and three
	$('.donate-step').not('#donate-step-1').addClass('closed');

	//Watch for changes in slider
	function startSliderWatch() {
		$(".donate-range").change(function(){
			var $thisVal = $(this).val();
			updateSliderValue($thisVal);
			updateSliderMessage($thisVal);
			$('.donate-slider-amount').removeClass('blank').html('$'+$thisVal);
		});

		setTimeout(function(){ updateSliderValue($(".donate-range").val()); },50);
	}

	//On Slider Change
	function updateSliderValue(val) {
		$('.ui-slider-handle').html('$'+val);
	}

	//Donate Slider Init
	$(".donate-range").slider({
		create: startSliderWatch(),
		highlight: true
	});

	//Donate Slider Message
	var $donateSliderMessage = $('.donate-slider-message');
	
	//Update the text information when the donate slider value gets adjusted
	function updateSliderMessage(val) {
		if (val < 2) {
			$donateSliderMessage.html('can go a long way. 96% goes to services to feed the hungry.');
		} else if (val >= 2 && val < 10) {
			$donateSliderMessage.html('can feed a child for one week');
		} else if (val >= 10 &&  val < 25) {
			$donateSliderMessage.html('can feed a family of 4 for a week');
		} else if (val >= 25 &&  val < 50) {
			$donateSliderMessage.html('can feed a family of 4 for two weeks');
		} else if (val >= 50 &&  val < 75) {
			$donateSliderMessage.html('can help 25 people eat for a week.');
		} else if (val >= 75 &&  val < 99) {
			$donateSliderMessage.html('can help us feed 50 people a week.');
		} else if (val >= 99) {
			$donateSliderMessage.html('&nbsp;goes a long way. If you\'d like to consider becoming a <a href="/about/sponsors">sponsor</a>, please <a href="/contact">contact us</a>');
		} else {
			$donateSliderMessage.html('can go a long way. 96% goes to services to feed the hungry.');
		}
	}

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
			smoothScroll($('#donate-step-3'));
		}
		//If user is on the final step, submit the form
		else if (donateStep === 3) {
			$('.donate-form').parsley().submit();
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

	//Scroll the body of an 
	function smoothScroll(el) {
		var target = el;
		$('html,body').animate({
			scrollTop: target.offset().top
		}, 1000);
		return false;
	}

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
})(this);