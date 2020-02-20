<?php

require './auth.php';


include 'config.php';
include 'dbh.php';


$email = $_POST['email'];

$query = "SELECT * FROM users WHERE email='".$email."'";
$result = sqlsrv_query($conn, $query);

$res = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);

if(!$res){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'No se ha encontrado un usuario con ese mail'
	); 
   	echo json_encode($ret);
   	exit();
}



$data = array(
	'nombre' => $res['username'],
	'email' => $res['email'],
	'activo' => $res['activo'],
	'permiso' => $res['permiso'],
	'admin' => $res['admin']
);

$ret_data = json_encode($data);

$ret = array(
	'status' => 'success',
	'code' => 200,
	'data' => $data
); 	

echo json_encode($ret);	
exit();