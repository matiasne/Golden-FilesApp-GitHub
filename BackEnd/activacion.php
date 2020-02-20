<?php

include 'config.php';
include 'dbh.php';

$id = $_GET['id'];

$query = "SELECT user FROM users WHERE codigo_activacion='".$id."'";
$result = sqlsrv_query($conn, $query);

$r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
$row_count = count($r);	

if ($row_count > 0){

	$query = "UPDATE users SET activo='1' WHERE codigo_activacion='".$id."'";
	sqlsrv_query($conn, $query);
	
	$ret = array(
		'status' => 'success',
		'code' => 200,
		'message' => 'Usuario activado'
	); 
   	echo json_encode($ret);
   	header("Location: http://www.goldenpeanut.com.ar/filesApp/activacion_completa");
   	exit();

}else{

	$ret = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'ID de activacion no encontrado'
	); 
   	echo json_encode($ret);

   	header("Location: http://www.goldenpeanut.com.ar/filesApp/");
   	exit();

}