(function(w){
	var sw = document.body.clientWidth;

	//On Window Resize
	$(w).resize(function(){
		sw = document.body.clientWidth; //Update screen width
	});
	
	//
	// Primary Navigation
	//
	

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
	
	//Remove errenous nav active state for events, jobs
	if ($('body').hasClass('tribe-events-page-template') || $('body').hasClass('page-template-single-job-php')) {
		$('#menu-item-172').removeClass('current_page_parent');
	}
	
	//
	// Accordion
	//

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
	
	//
	// Text Widows
	//
    
    //Fix text widows http:/justinhileman.info/article/a-jquery-widont-snippet/
	$('h1, .page-title, .page-intro, .b-title, .b-excerpt').each(function() {
        $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
    });
    
    //
	// Get Help Directory
	//
	
	$('.block-directory-extra').addClass('is-vishidden');
	$('.block-directory').append('<a href="#" class="text-btn">More info</a>');
	
	$('.block-directory .text-btn').on('click', function(e) {
		var $this = $(this),
			$directoryExtra = $this.prev();
		
		e.preventDefault();
		
		if($directoryExtra.hasClass('is-vishidden')) {
			$directoryExtra.removeClass('is-vishidden');
			$this.text('Less Info');
		} else {
			$directoryExtra.addClass('is-vishidden');
			$this.text('More Info');
		}
	});
	
	//
	// Recipe Rainbow
	//
	$('.block-recipe').hover(
		function(){
			$(this).find('.btn').addClass('active');
		}, 
		function() {
			$(this).find('.btn').removeClass('active');
		}
	);

})(this);