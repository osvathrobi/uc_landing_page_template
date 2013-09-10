<?php

$config = array(
	'yourEmail' => 'admin@yourdomain.com', /* This is where the message will be sent to */
	'adminEmail' => 'admin@yourdomain.com' /* This is the sender address that will appear in the email you get */
);

$record = array(
	'name' => $_POST['name'],
	'email' => $_POST['email'],
	'message' => $_POST['message']
);

$nls = new ContactformService($config);
$return_value = $nls->sendMessage($record); 

class ContactformService {
	
	public $config = array();
	
	function __construct($config) {
		$this->config = $config;		
	}
	
	public function sendMessage($record) {
		$to      = $this->config['yourEmail'];
		$subject = 'New message from ' . $record['name'];
		$message = "Message from: " + $record['name'] . " [ " . $record['email']. "] \n" . $record['message'];
		$headers = 'From: '.$this->config['adminEmail'] . "\r\n" .
			'Reply-To: '.$record['email'].'' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

		if(@mail($to, $subject, $message, $headers)) {
			return 1;
		} else {
			return 0;
		}
	}
}

echo $return_value;