(function(w){


	//
	// Donate Form
	//

	//Set initial donate Step
	var $donateForm = $('.donate-form'),
		donateStep = 1,
		initialFormID = $('input[name=form_id]').attr('value');

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
			
			if ($donateForm.requestAutocomplete) {
			    $donateForm.requestAutocomplete();
			} else {
				return;
			}
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
	$('.chicklet-list label, .chicklet-list .input-container').hover(function(){
		var $this = $(this),
			$thisMessage = $this.attr('data-message'),
			$messageContainer = $('#donate-step-1 .donate-step-message');
			
		$messageContainer.text($thisMessage);
	},
	function(){
		var $activeMessage = $('.chicklet-list input:checked').next('label').attr('data-message'),
			$messageContainer = $('#donate-step-1 .donate-step-message');
		
		if($('#other-amount').val()!=="") {
			$messageContainer.text();
		} else {
			$messageContainer.text($activeMessage);
		}
		
	});
	
	//Donate button list
	$('.chicklet-list input:radio').change(function(){
		var $this = $(this),
			$thisMessage = $this.next('label').attr('data-message'),
			$thisAmount = $this.next('label').attr('data-amount'),
			$messageContainer = $('#donate-step-1 .donate-step-message');
			
		$('#other-amount').val("");
		$('#donation-amount').val($thisAmount);
		$messageContainer.text($thisMessage);
		$('#donate-amount-other').prop('checked', false);
	});
	
	$('#other-amount').focus(function(){
		$('.chicklet-list input').prop('checked', false);
		$('#donate-amount-other').attr('checked','checked');
	});
	
	$('#other-amount').blur(function(){
		$thisAmount = $(this).val();
		if($thisAmount!=="") {
			$('#donation-amount').val($thisAmount);
			$('#donate-amount-other').attr('checked','checked');
		} else {
			$('#donate-amount-other').prop('checked', false);
		}
	});
	
	$('#donate-monthly').change(function() {
		if($(this).is(':checked')) {
			updateForm('monthly');
		} else {
			updateForm('one-time');
		}
	});
	
	//Form type logic, for toggling between one-time donation, and monthly donation
	function updateForm(donationType) {
		
		//If monthly checkbox is checked
		if(donationType=="monthly") {
			var form_id = $('input[name=form_id]').attr('data-monthly-id');
			
			$('.chicklet-list input:radio').each(function(){
				$(this).attr('value',$(this).attr('data-monthly-value'));
			});
			
		} else { //If monthly checkbox is unchecked
			var form_id = initialFormID;
			
			$('.chicklet-list input:radio').each(function(){
				$(this).attr('value',$(this).attr('data-onetime-value'));
			});
		}
		
		$('input[name=form_id]').attr('value',form_id); //Set the form_id value to the appropriate value
	}
	
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
		
		    $("#donate-city").val(result.city).parsley(); /* Fill the data */
		    $("#donate-state").val(result.state).parsley();
		
		    $(".zip-error").hide(); /* In case they failed once before */
		
		    $(".donate-submit").focus(); /* Put cursor where they need it */
		
		  },
		  error: function(result, success) {
			
		    $('.field-container-city, .field-container-state').removeClass('is-vishidden');
		
		  }
		
		});
	 
	  }
	});
})(this);