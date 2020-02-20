<?php

require './auth.php';

include 'config.php';
include 'dbh.php';


$usuario = $_POST['usuario'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username = '$usuario' AND password = '".$password."'";
$result = sqlsrv_query($conn, $query);
if(!$result){
	if( ($errors = sqlsrv_errors() ) != null) {
		foreach( $errors as $error ) {
			echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
			echo "code: ".$error[ 'code']."<br />";
			echo "message: ".$error[ 'message']."<br />";
		}
		die();
	}
}
$res = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);



if(!$res){ //Se decide no informar si el mail o la contraseña es incorrecta y hacer algo genérico
	$ret = array(
		'status' => 'error',
		'code' => 204,
		'data' => 'Incorrecto'
	); 
	echo json_encode($ret);
	exit();
}
else{

	$token = Auth::SignIn([
		'id' => $res['id_user'],
		'nombre' => $res['username'],
		'permiso' => $res['permiso'],
		'activo' => $res['activo'],
		'admin' => $res['admin'],
	]);
			

	$ret = array(
		'status' => 'succes',
		'code' => '200',
		'data' => $token
	);

	echo json_encode($ret);
	exit();
}