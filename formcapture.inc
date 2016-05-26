<?php 

	if (!empty($_POST)) { 
		// Capture quote
	
		$to = "rhpotratz@gmail.com";
		$contact_errors = false;
	
    		// get the posted data
    		$company = $_POST["Company_Name"];
    		$name = $_POST["First_Name"]." ".$_POST["Last_Name"];
    		$email_address = $_POST["Email"];
    		$phone_num = $_POST["Phone"];
	
		$address_1 = $_POST['Address_1'];
		$address_2 = $_POST['Address_2'];
		$city = $_POST['City'];
		$state = $_POST['State'];
		$zip = $_POST['Zip'];
			$address = $address_1." ".$address_2."<br/>".$city.",".$state." ".$zip."</br><br/>";
	
		$roll_face = $_POST['Roll_Face'];
		$web_tension = $_POST['Web_Tension'];
		$web_width = $_POST['Web_Width'];
		$roll_size = $_POST['Roll_Size'];
		$shaft_size = $_POST['Shaft_Size'];

		$qty = $_POST['qty'];
		$tap_size = $_POST['tap_size'];
		$web_speed = $_POST['web_speed'];
		$coating = $_POST['coating_options'];
	
    		// write the email content
    		$header .= "MIME-Version: 1.0\n";
    		$header .= "Content-Type: text/html; charset=utf-8\n";
    		$header .= "From: noreply@componex.com\n";
		$header .= "Reply-to: $email_address\n";
	
		$message = "<h3>WINertia Quote Request</h3>";
		$message .= "<br/>";
    		$message .= "<strong>Company Name:</strong> $company <br/>";
    		$message .= "<strong>Name:</strong> $name <br/>";
    		$message .= "<strong>Email Address:</strong> $email_address <br/>";
    		$message .= "<strong>Phone:</strong> $phone_num <br/>";
    		$message .= "<strong>Address:</strong> <br/> $address";

    		$message .= "----------------------------------------------- <br/>";
    		$message .= " <strong> Quote Details <br/>";
    		$message .= "<strong>Roll Face :</strong> $roll_face <br/>";
    		$message .= "<strong>Web Tension:</strong> $web_tension <br/>";
    		$message .= "<strong>Web Width:</strong> $web_width <br/>";
    		$message .= "<strong>Roll Size:</strong> $roll_size <br/>";
    		$message .= "<strong>Shaft Size:</strong> $shaft_size <br/><br/>";
    		$message .= "<strong> Additional Info <br/>";
    		$message .= "<strong>Quantity:</strong> $qty <br/>";
    		$message .= "<strong>Tap Size:</strong> $tap_size <br/>";
    		$message .= "<strong>Web Speed:</strong> $web_speed<br/>";
    		$message .= "<strong>Coating:</strong> $coating<br/>";
		
    		$subject = "Quote Request";

    		// send the email using wp_mail()
    		if( !wp_mail($to, $subject, $message, $header) ) {
        		$contact_errors = true;
    		}
	}
?>
