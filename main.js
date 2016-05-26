jQuery(document).ready(function($) {

	//$(".decimal").numeric({ decimalPlaces: 2 });

	$(".details input").prop("disabled", true);
	$(".details input[type='checkbox']").prop("disabled", false);

	var toggleRoller = 0;
        var toggleShaft = 0;
        var toggleQuote = 0;

	var customize = 0;

	// Prepopulate the products
	for (p=0;p<products.length;p++) { 
		var option = "<option value='"+products[p][1]+"'>"+products[p][0]+"</option>";
		$("#roller_type").append(option);
	}

	// Toggle Details
	$(".toggle h3").click(function(e) {
		$(this).parent().parent().find(".details").toggle();
	
                if ($(this).parent().parent().hasClass('roller-data')) { 
			if (toggleRoller == 0) { 
				var text = $(this).addClass('active').text().replace('Show ', 'Hide ');
				toggleRoller=1;
			} else {
				var text = $(this).removeClass('active').text().replace('Hide ', 'Show ');
				toggleRoller=0;
			}
		}

   		if ($(this).parent().parent().hasClass('web-parameters')) { 
			if (toggleShaft == 0) { 
				var text = $(this).addClass('active').text().replace('Show ', 'Hide ');
				toggleShaft=1;
			} else {
				var text = $(this).removeClass('active').text().replace('Hide ', 'Show ');
				toggleShaft=0;
			}
		}

   		if ($(this).parent().parent().hasClass('over-ride')) { 
			if (toggleQuote == 0) { 
				var text = $(this).addClass('active').text().replace('Show ', 'Hide ');
				toggleQuote=1;
			} else {
				var text = $(this).removeClass('active').text().replace('Hide ', 'Show ');
				toggleQuote=0;
			}
		}	


		$(this).text(text);
	});

	// Pre-set value to AV
	$("#roller_type").val("AV");  rbAV_click();

	$("#roller_type").change(function() {
		if ($(this).val() == 'STD') { rbSTD_click(); }
		if ($(this).val() == 'AV') { rbAV_click(); }
		if ($(this).val() == 'LS') { rbLS_click(); }
	});

	$(".fields input").change(function() { worksheetChange(); });

	// PEnding changes
	$(".shaft_size").change(function() {
		worksheetChange();
	});

	$(".roll_size").change(function() {
		worksheetChange();
	});

	//$(".roll_face").change(function() { checkRollLength(); });
	//$(".shaft_length").change(function() { checkShaftLength(); });

	//Customize
	$('.customize').click(function(e) {
		if ($("#roller_type").val()) { } else { e.preventDefault; return false; }
		
		if (customize == 0) { 
			customize=1;
			$(".roll_size").prop("disabled", false);
			$(".shaft_size").prop("disabled", false);
		} else {
			customize=0;
			$(".roll_size").prop("disabled", true);
			$(".shaft_size").prop("disabled", true);
			$(".total_brg_misalignment").removeClass("green").removeClass("red");
            $(".shaft_total_deflection").removeClass("green").removeClass("red");
		}
	});

	// Copy data to request
	$(".btn.quote").click(function(e) {
		var copy_values = ['roll_face', 'web_tension', 'web_width', 'wrap_angle', 'shaft_length', 'roll_size', 'shaft_size', 'allowable_deflection'];

		for (var i = 0; i < copy_values.length; i++) {
			copy_value(copy_values[i]);
		}

			// $("#shadow").show();
			// $("#quoteform").show();

		$.magnificPopup.open({
  			items: {
    			src: $('#quoteform'),
    			type: 'inline'
  			},
			closeBtnInside: false,
			showCloseBtn: true
		});
	});

	$("#quoteform form").submit(function(e) { 
		var errors = 0;
		var url = "";

		$("span.errors").hide();
		
		// Check required fields
		$("input.required").each(function() {
			if ($(this).val() == "") {
				errors = 1;
				$(this).addClass("formerror");
			}
		});		
	
		if (errors == 1) { 
			$("span.errors").show().html("Unable to submit. Please fill out required fields highlighted in light red");
			e.preventDefault();
			return false;	
		} else {	
			// Reset form
			$("input[type='text']").val("");
			$("#shadow").hide();
			$("#quoteform").hide();
			return true;
		}
	});

});
