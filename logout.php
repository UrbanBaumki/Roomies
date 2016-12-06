<?php
	session_start();
	if(isset($_SESSION["username"])){
		
	    $iter = array_keys($_SESSION);
	    foreach ($iter as $key){
	        unset($_SESSION[$key]);
	    }
	    session_destroy();

	}

	header("Location: ./index.php");
	exit();
?>