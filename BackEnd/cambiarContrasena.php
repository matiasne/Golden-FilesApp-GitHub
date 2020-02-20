<?php



include 'config.php';
include 'dbh.php';

$id = $_POST['id'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

$query = "SELECT user FROM users WHERE codigo_activacion='".$id."'";
$result = sqlsrv_query($conn, $query);

if($password != $confirm_password){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 1
		'message' => 'No coincide la verificación del password'
	); 
   	echo json_encode($ret);
   	exit();
}

if(!$result){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 2,
		'message' => 'Verificar link'
	); 
   	echo json_encode($ret);
   	exit();
}

$query = "UPDATE users SET password='".$password."' WHERE codigo_activacion='".$id."'";
$result = sqlsrv_query($conn, $query);

$ret = array(
	'status' => 'success',
	'code' => 200,
	'id_message' => 3,
	'message' => 'Contraseña cambiada correctmente'
); 
echo json_encode($ret);
exit();