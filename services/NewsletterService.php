<?php

$config = array(
	'fileLocation' => 'email_database.csv'
);

$record = array(
	'emailAddress' => $_GET['newsletter_text']
);

$nls = new NewsletterService($config);
$return_value = $nls->saveAddress($record); 

class NewsletterService {
	
	public $config = array();
	
	function __construct($config) {
		$this->config = $config;		
	}
	
	public function saveAddress($record) {
		$this->openDatabase();
		$record['date'] = date("Y-m-d H:i:s");
		$this->addToDatabase($record);
		$this->closeDatabase();
		
		return 1;
	}

	function openDatabase() {
		$this->fp = fopen($this->config['fileLocation'],'a+');
	}
	
	function closeDatabase() {
		fclose($this->fp);
	}
	
	function addToDatabase($record) {
		$str = '';
		foreach($record as $field) {
			$str .= $field . ',';
		}
		
		fwrite($this->fp, $str . "\n");
	}
}

echo $return_value;