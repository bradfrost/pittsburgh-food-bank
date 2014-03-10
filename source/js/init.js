(function(w){
	var sw = document.body.clientWidth,
		sh = document.body.clientHeight;

	//On Window Resize
	$(w).resize(function(){
		sw = document.body.clientWidth; //Update screen width
		sh = document.body.clientHeight; //Update screen height
	});


	//Navigation toggle for small screens
	$('.nav-toggle-menu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
		return false;
	});
	
	//Search form toggle for small screens
	$('.nav-toggle-search').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.header .search-form').toggleClass('active');
	});

	//Primary Navigation
	$('body').on('click',function() {
		$('.nav-subnav-link, .nav-subnav').removeClass('active');
	});

	$('.nav-subnav-link').on('click',function(e){
		var $this = $(this),
			$subnav = $this.next('.nav-subnav');
		e.stopPropagation();

		if($this.hasClass('active')) {
			$subnav.removeClass('active');
			$this.removeClass('active');
		} else {
			$this.addClass('active');
			$subnav.addClass('active');
		}

		//$('.nav-subnav-link, .nav-subnav').removeClass('active'); //Close other open subnav menus
		
	});

	//
	// Donate Form
	//

	//Hide steps 2 and three
	$('.donate-step').not('#donate-step-1').hide();

	//Watch for changes in slider
	function startSliderWatch() {
		$(".donate-range").change(function(){
			var $thisVal = $(this).val();
			updateSliderValue($thisVal);
			updateSliderMessage($thisVal);
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
	function updateSliderMessage(val) {
		if (val < 2) {
			$donateSliderMessage.html('Every dollar counts. 96% of every dollar goes to services to feed the hungry.');
		} else if (val >= 2 && val < 10) {
			$donateSliderMessage.html('By donating this amount, you can feed a child for one week');
		} else if (val >= 10 &&  val < 25) {
			$donateSliderMessage.html('By donating this amount, you can feed a family of 4 for a week');
		} else if (val >= 25 &&  val < 50) {
			$donateSliderMessage.html('By donating this amount, you can feed a family of 4 for a month');
		} else if (val >= 50 &&  val < 100) {
			$donateSliderMessage.html('This donation level helps 25 people eat for a week.');
		} else if (val >= 100 &&  val < 250) {
			$donateSliderMessage.html('This donation level allows us to feed 50 people.');
		} else if (val >= 250) {
			$donateSliderMessage.html('Thank you for your generosity. If you\'d like to consider becoming a <a href="/about/sponsors">sponsor</a>, please <a href="/contact">contact us</a>');
		} else {
			$donateSliderMessage.html('Every dollar counts. 96% of every dollar goes to services to feed the hungry.');
		}
	}

	//Donate Step Link
	$('#donate-step-2-link').on('click',function(e){
		e.preventDefault();
		$('#donate-step-1').hide();
		$('#donate-step-1').show();
	});

	$(".donate-form").submit(function(e){
		e.preventDefault();
		$(".donate-range").val(400).slider("refresh");
	});
})(this);