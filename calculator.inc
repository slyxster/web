	<div id="shadow"></div>
	<div id="calculator">

		<div class="panel roller-data">
			<h1> 1. Specify Roller Parameters </h1>
	
			<div class="fields">
				<h3> Roller Data </h3>
				<p> Type 
					<span>
						<select name="roller_type" id="roller_type">
							<option value=""> Select a Type</option>
							<!-- Removed this option for now -->
							<!-- <option value="LS"> LS </option>	-->
							
						</select>
					</span>
				</p>
				<p> Roll Face <span><input type="text" value="50" name="roll_face" class="roll_face editable"> in</span></p>
				<br clear="all" />
				<h3> Web Parameters </h3>
				<p> Web Tension <span><input type="text" value="2.00" name="web_tension" class="web_tension editable decimal green"> lb/in </span> </p>
				<p> Web Width <span><input type="text" value="46.00" name="web_width" class="web_width editable"> in </span> </p>
				<p> Wrap Angle <span><input type="text" value="90" name="wrap_angle" class="wrap_angle editable"> deg </span> </p>
			</div>

			<div class="toggle">
				<h3>Show Roller Details</h3>
			</div>

			<div class="details hidden">
				<p> Sectional Area <span class="sectional-area"><input type="text" disabled="disabled" name="sectional_area" class="sectional_area" /> in<sup>2</sup></span></p>
				<p> Weight <span class="weight"><input type="text" disabled="disabled" name="roller_weight" class="roller_weight" /> lb</span></p>
				<p> Area Inertia<sub>XX</sub> <span class="area-inertia"> <input type="text" disabled="disabled" name="area_inertia" class="area_inertia" /> in<sup>4</sup></span></p>
				<p> Radius of Gyration, kZ <span class="radius-gyration"><input type="text" disabled="disabled" name="radius_gyration" class="radius_gyration" /> in</span> </p>
				<p> Rotational Inertia, Wk2 <span class="rotational-inertia"><input type="text" disabled="disabled" name="rotational_inertial" class="rotational_inertia" /> lb-in<sup>2</sup></span></p>
				<p class="bordered"> Resultant Tension Force <span class="tension-force"><input type="text" disabled="disabled" name="tension_force" class="tension_force" /> lbs</span></p>
				<p> Deflection by Gravity <span class="deflection-gravity"><input type="text" disabled="disabled" name="deflection_gravity" class="deflection_gravity" /> in</span></p>
				<p> Deflection by Tension <span class="deflection-tension"><input type="text" disabled="disabled" name="deflection_tension" class="deflection_tension" /> in</span></p>
				<p class="total"> Total Roller Deflection <span class="total-deflection"><input type="text" disabled="disabled" name="total_deflection" class="total_deflection" /> in</span></p>
				<p class="note">Note: Deflection and misalignment totals are worse case scenarios where all loads act in the same direction and sum together. </p>	
			</div>
		</div>	

		<div class="panel web-parameters">
			<h1> 2. Specify Shaft Parameters </h1>
			<div class="fields">
				<h3> Shaft Data </h3>
				<p> Shaft Length <span> <input type="text" value="54.00" name="shaft_length" class="shaft_length editable" /> in </span></p>

				<div class="error-msg">
					<p><img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" /></p>
				</div>
			</div>

			<div class="toggle">
				<h3>Show Shaft Details</h3>
			</div>

			<div class="details hidden">
				<p> Sectional Area <span><input type="text" value="" name="shaft_sectional_area" class="shaft_sectional_area" /> in<sup>2</sup></span></p>
				<p> Weight <span><input type="text" value="" name="shaft_weight" class="shaft_weight" /> lb</span> </p>
				<p> Area InertiaXX <span><input type="text" value="" name="shaft_area_inertia" class="shaft_area_inertia" /> in<sup>4</sup></span></p>
				<p class="bordered"> Idler Load <span ><input type="text" value="" name="total_idler_load" class="total_idler_load" /> lbs</span></p>
				<p> Roll ID <span><input type="text" value="" name="roll_clearance" class="roll_clearance" /> in</span></p>
				<p> Shaft OD <span><input type="text" value="" name="shaft_id" class="shaft_od" /> in</span></p>
				<p> Shaft Clearance <span><input type="text" value="" name="shaft_clearance" class="shaft_clearance" /> in</span></p>
				<p> Deflection by Gravity <span><input type="text" value="" name="shaft_deflection_gravity" class="shaft_deflection_gravity" /> in</span></p>
				<p> Deflection by Idler Load <span><input type="text" value="" name="shaft_deflection_idler" class="shaft_deflection_idler"/> in</span></p>
				<p class="total bordered"> Total Shaft Deflection <span class="total-shaft-deflection"><input type="text" value="" name="shaft_total_deflection" class="shaft_total_deflection"/> in</span></p>
				<p> Bearing Misalign by Weight <span><input type="text" value="" name="brg_misalign_weight" class="brg_misalign_weight"/> deg</span></p>
				<p> Bearing Misalign by Idler Load <span><input type="text" value="" name="brg_misalign_idler_load" class="brg_misalign_idler_load"/> deg</span></p>
				<p class="total bordered"> Total Bearing Misalignment <span class="total-bearing-misalignment"><input type="text" value="" name="total_brg_misalignment" class="total_brg_misalignment" /> deg</span></p>
			</div>
		</div>	

		<div class="panel over-ride p3">
			<h1> 3. Calculate and Quote </h1>
			<div class="fields">
				<h3> Recommendation / Customize </h3>
				<p> Roll Size <span> <select name="roll_size" class="roll_size" disabled="disabled"></select> </span></p>
				<p> Shaft Size <span><select name="shaft_size" class="shaft_size" disabled="disabled"></select></span></p>
				<p> Roll Deflection: <span><input type="text" value="" disabled="disabled" class="allowable_deflection" /></span></p>					
				<p class="note"><input type="checkbox" class="customize" value="Y" />Customize – Manually select the roll or shaft size.</p>
				<span class="btn quote">Quick Quote </span>
			</div>

			<div class="toggle">
				<h3>Show Deflection Classifications</h3>
			</div>

			<div class="details hidden">
				<p><span class="txt"> Class A - precision or nipped</span><span><input type="text" name="precision_nipped" class="classA" value="0" /> in </span></p>
				<p><span class="txt"> Class B - most applications</span><span><input type="text" name="most_applications" class="classB" value="0" /> in </span></p>
				<p><span class="txt"> Class C - rigid materials</span><span><input type="text" name="flexible_materials" class="classC" value="0" /> in </span></p>
				<p><span class="txt"> Class D - conveyors & cores</span><span><input type="text" name="conveyors_cores" class="classD" value="0" /> in </span></p>							
			</div>
		</div>	
	</div>

			<div id="quoteform" class="mfp-hide">
				<form action="">
				<h1>Quick Quote </h1>

				<p class="note"> If you have any questions, please email us at <a href="mailto:info@componex.net">info@componex.net</a> or give us a call at <a href="tel:6088842201">608-884-2201</a>. </p>					
	
				<div class="column">
					<h2> Contact Information </h2>
					<p> Name (<span class="required-label">Required</span>) <input class="required" type="text" name="First_Name" /> </p>					
					<p> Email (<span class="required-label">Required</span>) <input class="required" type="email" name="Email" /> </p>
					<p> Company Name (<span class="required-label">Required</span>) <input class="required" type="text" name="Company_Name" /> </p>					
					<p> Phone (<span class="required-label">Required</span>) <input class="required" type="phone" name="Phone" /> </p>
					<span class="divider"></span>
					
					<h2> Additional Details </h2>
					<p> Quantity <input type="text" name="qty" /> </p>
					<p> Tap Size <input type="text" name="tap_size" /> </p>
					<p> Web Speed <input type="text" name="web_speed" /> </p>
					<p> Coating Options <input type="text" name="coating_options" /> </p>
					<p> Notes <textarea name="textarea" id="textarea"></textarea> </p>
					<span class="divider"></span>
				</div>

				<div class="column">
					<h2> Roller Details </h2>
					<p class="note">For your convenience, we've imported these values from the calculator based on your configuration. </p>
					<span class="divider"></span>
					<p class="roll_face"> Roll Face (in) <span>in <input type="hidden" name="Roll_Face" /></span></p>
					<p class="web_tension"> Web Tension (lb/in) <span> in <input type="hidden" name="Web_Tension" /></span></p>
					<p class="web_width"> Web Width (in) <span>  in  <input type="hidden" name="Web_Width" /></span></p>
					<p class="wrap_angle"> Wrap Angle (deg) <span>  deg  <input type="hidden" name="Wrap_Angle" /></span></p>
					<p class="shaft_length"> Shaft Length <span> in <input type="hidden" name="Shaft_Length" /></span></p>
					<p class="roll_size"> Roll Size <span> in <input type="hidden" name="Roll_Size" /></span></p>
					<p class="shaft_size"> Shaft Size <span>  in <input type="hidden" name="Shaft_Size" /></span></p>
					<p class="allowable_deflection"> Roll Deflection <span>  in <input type="hidden" name="Roll_Deflection" /></span></p>
					<input type="submit" value="Submit" name="Submit Quote" class="btn quote" />
					<span class="errors"><img src="../wp-content/themes/componex/images/error-triangle.png" width="16" height="16" /></span>
			</div>

				</form>
			</div>
