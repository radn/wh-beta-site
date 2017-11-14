<?php
error_reporting(0);
date_default_timezone_set ('America/New_York');

if(isset($_POST['submit'])) { 
	check_hidden_value();
}
function check_hidden_value() {
	if($_POST['email_5151'] != '') {
    	header('location: /?thank-you');
    } elseif($_POST['email'] != '' && $_POST['name'] != '') {
		$name = trim(strip_tags($_POST['name']));
		$email = trim(strip_tags($_POST['email']));
		$msg = trim(strip_tags($_POST['msg']));
		
		$post_date = date("F d, Y");
       	$post_time = date("h:i a");

		if($_POST['formselect'] == 'lease') {
			$subject = 'A message from Washington Harbour Leasing';
			$to = 'info@ifmm.com, jyanushonis@rappaportco.com';
		} else {
			$subject = 'A message from Washington Harbour Ice Skating';
			$to = 'info@ifmm.com, skatewashingtonharbour@gmail.com';
		}
		$message = "Contact from ".$_SERVER['SERVER_NAME']." on $post_date at $post_time\n";
      	$message.= "Contact Name: " . $name. "\n";
      	$message.= "Email: " . $email . "\n";
      	$message.= "Message: " . $msg . "\n";

      	$eMail = 'info@ifmm.com';
		
		$result = mail($to, $subject, $message, 'From: ' . $eMail . '\nReply-To: ' . $eMail . '');
		header('location: /?thank-you');
	} else {
		header('location: /index.html');
	}
}
?>