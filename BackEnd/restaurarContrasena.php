<?php

include 'config.php';
include 'dbh.php';

$email = $_POST['email'];

$codigo_activacion = uniqid();

$query = "SELECT user FROM users WHERE email='".$email."'";
$result = sqlsrv_query($conn, $query);

$r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
$row_count = count($r);	

if ($row_count == 0){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 9,
		'message' => 'El email ingresado no es válido'
	); 
   	echo json_encode($ret);
   	exit();
}

$query = "UPDATE users SET codigo_activacion='".$codigo_activacion."' WHERE email='".$email."'";
$result = sqlsrv_query($conn, $query);

$mensaje = "Para recuperar su contraseña haga click en el siguiente link:\n\n";
$mensaje .= "http://www.goldenpeanut.com.ar/filesApp/cambiar_contrasena?id=".$codigo_activacion; 

$asunto = "Recuperar Contraseña Golden Peanut"; 

if(mail($email,$asunto,$mensaje,"From: goldenpeanut@goldenpeanut.com")){ 
	$ret = array(
		'status' => 'success',
		'code' => 404,
		'id_message' => 10,
		'message' => 'Hemos enviado un mail a la casilla: '.$email.' para recuperar su contraseña'
	); 
   	echo json_encode($ret);
   	exit();

}else{
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 11,
		'message' => 'Error al enviar mail'
	); 
   	echo json_encode($ret);
}
