	// Constant Values	
	var nip = 1;
	var convertToDegrees = 180/Math.PI;
	var ModulusR = 10000000; // lbs per inch squared
	var DensityR = .0975; // lbs per inch cubed
	var idlerSelectorFudgeFactor = .75; // Percentage

	// Enable/Disable
	var cbShaftSize = true;
	var stdBearing = true;
	var saBearing = true;

	// Initialized variables;
	var radioButtonSelection = "";
	var deflection_IS = 0;
	var sineof_wrapangle = 0;
	var areamoment_of_inertia = 0;
	var part_group = 0;
	var recommended = "";

	var allowableBearingMisalignment_standard = 0.25;
	var allowableBearingMisalignment_selfaligning = 2.00;
	var shaftClearanceMargin = 0.050;

	var cbRollSize = "";
	var cbShaftSize = "";
	var section = "";
	var shaft = "";

	var rollerIndex = 0;
	var shaftIndex = 0;
	var shaftGroup = 0;

	var maxAllowable = 2.00;

	function worksheetChange( ) {

		$('input.editable').each(function() {
			if ($.isNumeric($(this).val())) {
				// Its a number
				$(this).removeClass("red");
			} else {
				// Not a number
				$(this).addClass("red");
			}
		});

		calculateIdlerSelectorValues();

		// Update values based on Type
		RollSelector();

		// Calculate Detail Panels
		calculateRollerData();
		calculateShaftData();
		calcAllowableRollerDeflection();

		checkThresholds();
	}

	function checkRollLength() {
		var rollFace = $(".roll_face").val();
		var allowedValue = rollFace;

		var min = 4;
		var max = 41;
		var error = 0;

		if (rollFace < min) { allowedValue = min; error=1; }
		if (rollFace > max) { allowedValue = max; error=1; }

		if (error == 1) { 
			$(".roll_face").addClass("red").removeClass("green");
			$('<span class="alert"> Value cannot exceed ' + allowedValue + '</span>').insertAfter('.roll_face').delay(3000).fadeOut();
		} else {
			$(".roll_face").removeClass("red").addClass("green");
		}
	}
	function checkShaftLength() {
		var shaftLength = $(".shaft_length").val();
		var allowedValue = shaftLength;

		var min = 4;
		var max = 41;
		var error = 0;

		if (shaftLength < min) { allowedValue = min; error=1; }
		if (shaftLength > max) { allowedValue = max; error=1;}


		if (error == 1) { 
			$(".shaft_length").addClass("red").removeClass("green");
			$('<span class="alert"> Value cannot exceed ' + allowedValue + "</span>").insertAfter('.shaft_length').delay(3000).fadeOut();
		} else {
			$(".shaft_length").removeClass("red").addClass("green");
		}
	}

	function checkMainFields() {
		var filled = true;

		var rollFace = $(".roll_face").val();
		
		if (rollFace) {
			$('.web-parameters input').each(function() {
				if ($(this).val()) { filled = true; } else { filled = false; }	
			});
		} else {
			filled = false;
		}

		return filled;
	}

	function rbSTD_click() {
		radioButtonSelection = "STD";
		calculateIdlerSelectorValues();
	
		// Update values based on Type
		RollSelector();

		// Calculate Detail Panels
		calculateRollerData();
		calculateShaftData();
		calcAllowableRollerDeflection();

		checkThresholds();
	}

	function rbAV_click() {
		radioButtonSelection = "AV";
		calculateIdlerSelectorValues();

		// Update values based on Type
		RollSelector();

		// Calculate Detail Panels
		calculateRollerData();
		calculateShaftData();
		calcAllowableRollerDeflection();

		checkThresholds();
	}

	function rbLS_click() {
		radioButtonSelection = "LS";
		calculateIdlerSelectorValues();

		// Update values based on Type
		RollSelector();

		// Calculate Detail Panels
		calculateRollerData();
		calculateShaftData();
		calcAllowableRollerDeflection();

		checkThresholds();
	}

	function RollSelector() {
		var selSize = 1000;	
		var tmpVal = 0;
		var tempShaftLength = getValue('shaft_length');
		var rollLength = getValue('roll_face');

		if (rollLength >= 157) {
			section = "NONE"; 	
			changeRollSize(section);
			changeShaftSize(section);
			return false;
		}
			
		// Assign idler array index and part group
		if (tempShaftLength > 0 && tempShaftLength <= 30) { var tmpVal = 25; part_group = 3; RID = 3; SID = 1.5; shaftIndex=0; recommended = "NONE";}
		if (tempShaftLength > 30 && tempShaftLength <= 75) { var tmpVal = 26; part_group = 1; RID = 1; SID = 2;	shaftIndex=1; recommended = 1; }
		if (tempShaftLength > 75 && tempShaftLength <= 100) { var tmpVal = 27; part_group = 2; RID = 2; SID = 3; shaftIndex=8; recommended = 2; }
		//if (tempShaftLength > 100  { var tmpVal = 28; part_group = 2; RID = 2; SID = 3; shaftIndex=13; recommended = 9; }
		if (tempShaftLength >= 120) { var tmpVal = 28; part_group = 2; RID = 2; SID = 3; recommended = 14; }

		// Assign the shaft index based on idler data array

			//if (tmpVal != 0) { shaftIndex = id_data[tmpVal][2]; } else { shaftIndex = "NONE"; }

		// Assign starting position index
		var rollerSelection = $("#roller_type").val();
	
		if (rollerSelection == "AV") { startNum = 18; stopNum = 33; }	// Rows 21-36
		if (rollerSelection == "STD") { startNum = 1; stopNum = 17; }	// Rows 4-20
		if (rollerSelection == "LS") { startNum = 34; stopNum = 37; }	// Rows 37-40
		if (rollerSelection == "WKT") { startNum = 38; stopNum = 38; }	// Rows 41

		// Assign a section based on deflection
		if (tmpVal == 0) {
                	for(s=startNum;s<stopNum;s++) {
				
				// Check to see if in recommended range
				var optimizerOption = columnIndexText(rollerData, 'optimizer_option', s);	
				var inertia = columnIndex(rollerData, 'I', s);
				var defaultInertia = columnIndex(rollerData, 'I', selSize);

				if (optimizerOption == 'Yes') {
					if (inertia > areamoment_of_inertia) {
						if (inertia < defaultInertia) { 
							selSize = s;	
						} else if (selSize == 1000) {
							selSize = s;	
						}
					}
				}

			}

			// Recommended section size
			if (selSize != 1000) { 
				section = columnIndexText(rollerData, 'section', selSize);

				if (section == "STD 7.5 X 3.0") { 
					section = columnIndexText(rollerData, 'section', selSize-1);
				}

				if (section == "AV 2.5 X 2.0") { 
					section = columnIndexText(rollerData, 'section', selSize-1);
				}

			} else {
				section = "NONE";
			}

			changeRollSize(section);
			changeShaftSize(section);
		} else {
                	for(s=startNum;s<stopNum;s++) {
				// Check to see if in recommended range
				var optimizerOption = columnIndexText(rollerData, 'optimizer_option', s);	
				var group_no = columnIndex(rollerData, 'group', s);

				var inertia = columnIndex(rollerData, 'I', s);
				var inertiaIdx = columnIndex(rollerData, 'I', selSize);

				if (optimizerOption == 'Yes') {
					if (group_no == part_group) {
						if (inertia > areamoment_of_inertia) {
							if ( inertia < inertiaIdx) {
								selSize = s;
							} else if (selSize == 1000) {
								selSize = s;
							}
						}
					}

				}
	
			}

			if (selSize != 1000) {

				section = columnIndexText(rollerData, 'section', selSize);

				if (section == "STD 7.5 X 3.0") { 
					section = columnIndexText(rollerData, 'section', selSize-1);
				}
				if (section == "AV 2.5 X 2.0") { 
					section = columnIndexText(rollerData, 'section', selSize-1);
				}
			} else {
				section = "NONE";
			}

			changeRollSize(section);
			changeShaftSize(section);
		}

	}


	// Same as combo box selections, used to index 
	function indexSelections( ) {
		var rollerType = $("#roller_type").val();
		var rollerSize = getValue('roll_size');
		var shaftSize = getValue('shaft_size');
		rollerIndex = rollerTypes[rollerSize]; // Array index number
		shaftGroup = columnIndex(rollerData,'group',arrayIndex) ; // Array lookup group index using arrayIndex
	}

	// Calculates roller deflection
	function calcAllowableRollerDeflection() {
		var rollFace = parseFloat($('.roll_face').val());

		var classA  = (rollFace*.00008).toFixed(4);
			$("input.classA").val(classA);
		var classB  = (rollFace*.00015).toFixed(4);
			$("input.classB").val(classB);
		var classC  = (rollFace*.0003).toFixed(4);
			$("input.classC").val(classC);
		var classD  = (rollFace*.0006).toFixed(4);
			$("input.classD").val(classD);
	}

	// Alerts based on values outside of thresholds
	function checkThresholds() {

		var allowableDeflection = "";
		var recommendedDeflection =  "";
		var totalDeflection = getValue("total_deflection");

		// Class D value < Total Deflection (color red) else green
			if ($("input.classD").val() >= totalDeflection) {
				allowableDeflection = " " + $(".total_deflection").val() + " (Class D)";
				recommendedDeflection = "We recommend a Class D (" + $("input.classD").val() + ") roll, that has a total deflection of ("+ totalDeflection +")";
				//$('.total_deflection').val($("input.classD").val());
				//$("input.classD").addClass("green").removeClass("red");
			} else {
				//$("input.classD").addClass("red").removeClass("green");
			}

		// Class C value < Total Deflection (color red) else green
			if ($("input.classC").val() >= totalDeflection) {
				allowableDeflection = " " + $(".total_deflection").val() + " (Class C)";
				recommendedDeflection = "We recommend a Class C (" + $("input.classC").val() + ") roll, that has a total deflection of ("+ totalDeflection +")";

				//$('.total_deflection').val($("input.classC").val());
				//$("input.classC").addClass("green").removeClass("red");
			} else {
				//$("input.classC").addClass("red").removeClass("green");
			}

		// Class B value < Total Deflection (color red) else green
			if ($("input.classB").val() >= totalDeflection) {
				allowableDeflection = " " + $(".total_deflection").val() + " (Class B)";
				recommendedDeflection = "We recommend a Class B (" + $("input.classB").val() + ") roll, that has a total deflection of ("+ totalDeflection +")";

				//$('.total_deflection').val($("input.classB").val());
				//$("input.classB").addClass("green").removeClass("red");
			} else {
				//$("input.classB").addClass("red").removeClass("green");
			}

		// Class A value < Total Deflection (color red) else green
			if ($("input.classA").val() >= totalDeflection) {
				allowableDeflection = " " + $(".total_deflection").val() + " (Class A)";
				recommendedDeflection = "We recommend a Class A (" + $("input.classA").val() + ") roll, that has a total deflection of ("+ totalDeflection +")";
				//$('.total_deflection').val($("input.classA").val());
				//$("input.classA").addClass("green").removeClass("red");
			} else {
				//$("input.classA").addClass("red").removeClass("green");
			}

			if ($("input.classA").val() > totalDeflection) {
				//$("input.classD").addClass("green").removeClass("red");
			}

			if ($("input.classD").val() < totalDeflection) {
				//$("input.classD").addClass("red").removeClass("green");
			}

		//------------------------------------------------------------------------------------------------------------

			$(".allowable_deflection").val(allowableDeflection);
			$(".recommendation").html(recommendedDeflection);

		//------------------------------------------------------------------------------------------------------------
		var hasError = 0;
		$(".error-msg p").html("").hide();

		if ( $(".customize").is(":checked") ) { 

			if (getValue("total_brg_misalignment") >= maxAllowable ) {
				var errorMsg = '<img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" class="error-icon" /> Bearing Misalignment exceeds 2.0 degrees. <br/><br/>';
				var hasError = 1;
				$(".error-msg p").append(errorMsg).show(); 
				$(".total_brg_misalignment").addClass("red").removeClass("green");
			} else {
				if (hasError == 0) { $(".error-msg p").html("").hide(); }  // Clear error if needed
				$(".total_brg_misalignment").addClass("green").removeClass("red");
			}

			if (getValue("total_brg_misalignment") < (0.5 * maxAllowable)) {
				$(".shaft_total_deflection").removeClass("red").addClass("green");
			}

			// Total Deflection >= (Roll Clearance - Shaft OD) / 2

 
			if (getValue("shaft_total_deflection") >= ( (getValue("roll_clearance") - getValue("shaft_od"))/2 )) {
				var errorMsg = '<img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" class="error-icon" /> Shaft deflection exceeds shaft clearance. <br/><br/>';
				var hasError = 1;
				$(".error-msg p").append(errorMsg).show(); 
				$(".shaft_total_deflection").removeClass("green").addClass("red");
			} else {
				if (hasError == 0) { $(".error-msg p").html("").hide(); }  // Clear error if needed
				$(".shaft_total_deflection").removeClass("red").addClass("green");
			}

			if (getValue("totalDeflection") >= getValue("brg_misalign_idler_load") ) {
				$(".total_deflection").addClass("red");
			} else {
				$(".total_deflection").removeClass("red");
			}

		// Comment out for now, even though this is in the Sheet 3 formulas
		// Total Deflection < 0.5*(Roll Clearance - Shaft OD) / 2
			//if (getValue("shaft_total_deflection") < ( (0.5 * getValue("roll_clearance") - getValue("shaft_od"))/2 )) {
				//$(".shaft_total_deflection").removeClass("red").addClass("green");
			//} else {
				//$(".shaft_total_deflection").removeClass("green").addClass("red");
			//}

		} else {
			$(".total_brg_misalignment").removeClass("green").removeClass("red");
			$(".total_deflection").removeClass("green").removeClass("red");
		}


		// Roll face <= Web width then color red
			if (getValue("web_width") > getValue("roll_face")) {
				var errorMsg = '<img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" class="error-icon" /> The web width cannot exceed the value of roll face. Please correct this value. <br/><br/>';
				var hasError = 1;
				$(".error-msg p").append(errorMsg).show(); 
				$(".web_width").addClass("red").removeClass("green");
				$(".shaft_length").addClass("red").removeClass("green");
			} else {
				if (hasError == 0) { $(".error-msg p").html("").hide(); } // Clear error if needed
				$(".web_width").removeClass("red").addClass("green");
				$(".shaft_length").removeClass("red").addClass("green");
			}

		// If shaft length < roll face, color red
			if (getValue("roll_face") >= getValue("shaft_length")) {
				var errorMsg = '<img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" class="error-icon" /> The size of the roll face cannot exceed the shaft length. Please correct this value. <br/><br/>';
				var hasError = 1;
				$(".error-msg p").append(errorMsg).show(); 
				$(".roll_face").addClass("red").removeClass("green");
				$(".shaft_length").addClass("red").removeClass("green");
			} else {
				if (hasError == 0) { $(".error-msg p").html("").hide(); }  // Clear error if needed
				$(".roll_face").removeClass("red").addClass("green");
				$(".shaft_length").removeClass("red").addClass("green");
			}

			if (getValue("wrap_angle") >= 360) {
				var errorMsg = '<img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" class="error-icon" /> The wrap angle cannot exceed 360 degrees.';
				var hasError = 1;
				$(".error-msg p").append(errorMsg).show(); 
				$(".wrap_angle").addClass("red").removeClass("green");
			} else {
				if (hasError == 0) { $(".error-msg p").html("").hide(); }  // Clear error if needed
				$(".wrap_angle").removeClass("red").addClass("green");
			}

	}

	function calculateIdlerSelectorValues() {

		var FaceLength = getValue('roll_face');
		var wrapAngle = getValue('wrap_angle');
		var PLI = getValue('web_tension'); // Web Tension

		deflection_IS = (0.00015*idlerSelectorFudgeFactor)*FaceLength;
		sineof_wrapangle = 2*Math.sin( Math.PI * (wrapAngle/360)) * PLI;
		areamoment_of_inertia = ((0.0000000013)*(sineof_wrapangle)*(Math.pow(FaceLength,4))/deflection_IS).toPrecision(5);
	}

	// Calculates all of the values for the roller data
	function calculateRollerData( ) {
	
		var rollerSelection = $(".roll_size").val();  
		var rollerIdx = getRollerIndex(rollerSelection.trim());  

		// Get Values
		var rollFace = getValue('roll_face');
		var PLI = getValue('web_tension');
		var width = getValue('web_width');
			var constantA = (rollFace-width)/2;

		// Set Values
		var sectionalArea = populateValue('sectional_area', columnIndex(rollerData,'A',rollerIdx));

		var weight = populateValue('roller_weight', (sectionalArea * DensityR * rollFace).toPrecision(3));
			var weightActual = (sectionalArea * DensityR * rollFace);
		var inertiaR = populateValue('area_inertia', columnIndex(rollerData,'I',rollerIdx));
			var constantM = 384 * ModulusR * inertiaR;
		var rgyr = populateValue('radius_gyration', columnIndex(rollerData,'K',rollerIdx));
		var rotational = populateValue('rotational_inertia', (weightActual * (Math.pow(rgyr, 2))).toFixed(1) );

		var tensionForce = populateValue('tension_force', (PLI * getValue('web_width') * 2 * Math.sin( Math.PI * getValue('wrap_angle')/360)).toFixed(1));
		var deflectionGravity = populateValue('deflection_gravity', ((5 * weight * Math.pow(rollFace, 3)) / constantM).toFixed(4) );

		var deflectionTension = populateValue('deflection_tension', roundDecimal(((tensionForce/width) * (( 5 * Math.pow(rollFace,4)) - (24 * Math.pow(constantA,2) * Math.pow(rollFace,2)) + 16 * Math.pow(constantA,4)) / constantM), -7).toPrecision(2));

		var deflectionConstant = (5 * nip * Math.pow(rollFace,3)) / constantM; 
		var total_deflection = populateValue("total_deflection", roundDecimal(parseFloat(deflectionGravity) + parseFloat(deflectionTension) + parseFloat(deflectionConstant), -6).toPrecision(2) );

	}

	// Calculates all of the values for the shaft data
	function calculateShaftData( ) {
		
		var rollerSelection = $(".roll_size").val();
		var rollerIdx = getRollerIndex(rollerSelection);

		if ( $(".customize").is(":checked") ) { 
			shaftIndex = getShaftIndex();
		}
	
		// Calc values
		var rollFace = getValue('roll_face');
		var PLI = getValue('web_tension');
		var shaftLen = getValue('shaft_length');
		var constantI = (shaftLen - rollFace)/2;

		// Calculations
		var sectionalArea = populateValue('shaft_sectional_area', columnIndex(shaftData,'a',shaftIndex));

		var weightConstant = columnIndex(shaftData,'d',shaftIndex);
		var shaftWeight = populateValue('shaft_weight', (sectionalArea * shaftLen * weightConstant).toFixed(2));
		var inertiaS = populateValue('shaft_area_inertia', columnIndex(shaftData,'i',shaftIndex));

			// Values from Roller section
			var rollerWeight = getValue('roller_weight');
			var tensionForce = getValue('tension_force');
			var ModulusS = columnIndex(shaftData, 'e', shaftIndex);
			var constantM = 384 * ModulusS * inertiaS;

		var totalIdlerLoad = populateValue('total_idler_load', (tensionForce + rollerWeight + nip).toFixed(1));
		var shaftOD = populateValue('shaft_od', columnIndex(shaftData,'od',shaftIndex).toFixed(3));

		var rollClearanceID = populateValue('roll_clearance', (columnIndex(rollerData,'min_id',rollerIdx) - shaftClearanceMargin).toFixed(3));
		var deflectionGravity = populateValue('shaft_deflection_gravity', ((5 * (sectionalArea * shaftLen * weightConstant) * Math.pow(shaftLen,3)) / constantM).toFixed(4) );
			
			var part1 = tensionForce + rollerWeight + nip;
			var part2 = (3 * Math.pow(shaftLen, 2));
			var part3 = (4 * Math.pow(constantI, 2));
			var part4 = 48 * ModulusS * inertiaS;

		var deflectionIdlerLoad = populateValue('shaft_deflection_idler', ((part1 * constantI)*(part2-part3)/part4).toPrecision(3) );
		var totalDeflection = populateValue('shaft_total_deflection', (parseFloat(deflectionGravity) + parseFloat(deflectionIdlerLoad)).toFixed(3));

		var shaftClearance = populateValue('shaft_clearance', (getValue("roll_clearance") - getValue("shaft_od"))/2 );

		// Brg Misalignment by Weight
		var brgA = populateValue('brg_misalign_weight', (((shaftWeight / (24 * shaftLen * ModulusS * inertiaS)) * ( Math.pow(shaftLen,3) - ((6 * shaftLen * Math.pow(constantI,2)) + (4 * Math.pow(constantI,3))) )) * convertToDegrees ).toPrecision(3)); 
		// Brg Misalignment by Idler Load
		var brgB = populateValue('brg_misalign_idler_load', ( (totalIdlerLoad * constantI * ( (shaftLen/2) - constantI) / (2 * ModulusS * inertiaS))  * convertToDegrees).toPrecision(3) ); 

		var totalBrgMisalignment = populateValue('total_brg_misalignment', (parseFloat(brgA) + parseFloat(brgB)).toPrecision(3) );

		// Check if shaft will deflect too much
		if ( totalDeflection >= ( (rollClearanceID - shaftOD) / 2) ) {
			//buildShaftOptions(0,7,-1);
		} 
	}

	function changeShaftSize(rollerSizeIn) {

		if ( $(".customize").is(":checked") ) { return; }

		var rollerSize = rollerSizeIn.trim();
		var rollerIdx = getRollerIndex(rollerSize); 

		if (rollerIdx > 0) { 
			shaftGroup = columnIndex(rollerData,'group',rollerIdx) ; // Array lookup group index using rollerIndex
		} else {
			shaftGroup = rollerIdx;
		}

		switch(shaftGroup) {
			case 0:
				buildShaftOptions(0,7,-1);
				break;
			case 1:
				buildShaftOptions(0,7,shaftIndex);
				break;
			case 2:
				buildShaftOptions(8,13,shaftIndex);
				break;
			case 3:
				buildShaftOptions(14,15,shaftIndex);
				break;
		}

	}

	function getShaftIndex() {

		var shaftName = $('.shaft_size').val();
		var shaftValues = $.parseJSON(shaftData);
                var options = shaftValues['type'];

                for(i=0;i<=options.length;i++) {
			var item = options[i];	
			if (item == shaftName) { return i; }
		}

		return 0;
	}

	function buildShaftOptions(start, end, initial) {

		var shaftValues = $.parseJSON(shaftData);
                var options = shaftValues['type'];
		
		$('#calculator .shaft_size option').remove();

                for(i=start;i<=end;i++) {
			var item = options[i];
			if (i == initial) { 
              			var option = '<option selected="selected" value="'+options[i]+'">'+options[i].replace(' inch', '"')+'</option>';
			} else {
				if (initial == -1) { 
               				var option = "<option value='NONE'>None</option>";
				} else {
               				var option = '<option value="'+options[i]+'">'+options[i].replace(' inch', '"')+'</option>';
				}
			}

                       	$('#calculator .shaft_size').append(option);
                }

	}

	function getRollerIndex(rollerName) {
		var rollerObj = $.parseJSON(rollerData);
                var rollSizeOptions = rollerObj['section'];

                for(i=1;i<rollSizeOptions.length+1;i++) {
			var item = rollSizeOptions[i]; 
			if (item) { 
				item = item.trim();
				if (rollerName == "NONE") { return 0; }
				if (item == rollerName) { return i; }
			}
                }
	}

	function changeRollSize(recommendedIn) {


		if ( $(".customize").is(":checked") ) { return; }

		var recommended = recommendedIn.trim();
		var rollerType = $("#roller_type").val();
		var rollerObj = $.parseJSON(rollerData);
                var rollSizeOptions = rollerObj['section'];

		$('#calculator .roll_size option').remove();

                for(i=0;i<rollSizeOptions.length;i++) {
			var item = rollSizeOptions[i].trim();
			if (item == "AV 2.5 X 2.0") { continue; }

			if (item.indexOf(rollerType) > -1 && item.indexOf('LS') < 0) { 
				if (recommended) {
					if (item == recommended) { 
                       				var option = '<option selected="selected" value="'+item+'">'+item.replace("STD", "ST")+'</option>';
					} else {
						if (recommended == "NONE") { 
                       					var option = "<option value='NONE'>None</option>";
						} else {
                       					var option = '<option value="'+item+'">'+item.replace("STD", "ST")+'</option>';
						}
					}
				} else {
                       			var option = "<option>"+item+"</option>";
				}
	
                       		$('#calculator .roll_size').append(option);
			}
                }
	}
	
	//******************************************************************
	// Helper Functions
	//******************************************************************

	// Retrieve value from array using index - text
	function columnIndexText(dataArray, columnId, index) {
		var obj = $.parseJSON(dataArray);
		return obj[columnId][index];
	}
	function columnIndex(dataArray, columnId, index) {
		var obj = $.parseJSON(dataArray);
		return parseFloat(obj[columnId][index]);
	}

	// Helper function to grab field value
	function getValue(name) {
		return parseFloat($('.'+name).val());
	}

	function populateValue(name, value) {
		$('.'+name).val(value);
		return value; // Return out the value, in case its need for other calculations
	}

	// Helper function that copies main page parameters to quote form
	function copy_value(name) {
        	var formvalue = $('.panel .' + name).val();
			
        	$('#quoteform .'+ name + ' input').val(formvalue);
        	$('#quoteform .'+ name + ' span').text(formvalue);
	}
	
	//-------------------------------------------------------
	// Grab form values and submit
	//-------------------------------------------------------
	function formSubmit(form) {
		var formdata = '{ "formData": [';
	
		$("#quoteForm input").each(function(i) {
			formname = $(this).attr("name");
			formvalue = $(this).val();
			formitem = {'key':formname, 'value': formvalue};
			formdata += formitem + ",";
		});	

		formdata += "]}";
	}

	//---------------------------------------------------------------
	// Rounding Functions
	//---------------------------------------------------------------
	function decimalAdjust(type, value, exp) {
    		// If the exp is undefined or zero...
    		if (typeof exp === 'undefined' || +exp === 0) {
      			return Math[type](value);
    		}

    		value = +value;
    		exp = +exp;

    		// If the value is not a number or the exp is not an integer...
    		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      			return NaN;
    		}

    		// Shift
    		value = value.toString().split('e');
    		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    		// Shift back
    		value = value.toString().split('e');
    		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  	}

	function roundDecimal(value, exp) {
		return decimalAdjust('ceil', value, exp);
	}
