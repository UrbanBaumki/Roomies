<?php
	$username=$_POST['username'];
	$password=$_POST['password'];
	$registerRoom=$_POST['registerRoom'];
	$url = 'http://lazykiller.herokuapp.com/login';
		//Initiate cURL.
	$ch = curl_init($url);
	//The JSON data.
	$data = array(
		"username" => $username, 
		"password" => $password,
		"room" => array("name" => $registerRoom)
		); 
	
	//Encode the array into JSON.
	$data_json = json_encode($data);
	//Tell cURL that we want to send a POST request.
	curl_setopt($ch, CURLOPT_POST, 1);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	//Attach our encoded JSON string to the POST fields.
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
	//Set the content type to application/json
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
	//Execute the request
	$response = json_decode(curl_exec($ch));
	$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	curl_close($ch);
	if($http_code ==401){// return error
		$return = array($http_code,$response->error);
		echo json_encode($return);
	}
	else{
		$return = array($http_code,$response ->_id, $response ->room,$response->username);
		session_start();
		$_SESSION["username"] = $response->username;		
		echo json_encode($return);

	}
?>