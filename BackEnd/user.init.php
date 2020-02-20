<?php

require './auth.php';
include 'config.php';
require __DIR__ . '/vendor/autoload.php';

$token = $_POST['token'];		
try {
	$res = Auth::GetData($token);
	$ret = array(
		'status' => 'succes',
		'code' => '200',
		'data' => $res
	);
}	
catch(Exception $e){
	$ret = array(
		'status' => 'succes',
		'code' => '204',
		'data' => 'token no valido'
	);
}

echo json_encode($ret);
exit();