<?php

include 'config.php';
include 'dbh.php';
require './auth.php';

verificarPermiso();


$email = $_POST['email'];
$activo = $_POST['activo'];
$permiso = $_POST['permiso'];
$admin = $_POST['admin'];


$query = "SELECT user FROM users WHERE email='".$email."'";
$result = sqlsrv_query($conn, $query);

$res = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);

if(!$res){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Usuario no encontrado'
	); 
   	echo json_encode($ret);
   	exit();
}
else{

	$query = "UPDATE users SET activo='".$activo."', permiso='".$permiso."', admin='".$admin."' WHERE email='".$email."'";
	$result = sqlsrv_query($conn, $query);
		
	$ret = array(
		'status' => 'success',
		'code' => 200,
		'message' => 'Usuario actualizado correctamente'
	); 	

	echo json_encode($ret);	
	exit();
}


