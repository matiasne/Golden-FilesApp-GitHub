<?php


include 'config.php';
include 'dbh.php';

$usuario = $_POST['usuario'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

if(empty($usuario)){			
   	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 12,
		'message' => 'Usuario vacio'
	); 
   	echo json_encode($ret);
   	exit();
}

if(empty($email)){			
   	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 13,
		'message' => 'Por favor rellene el campo email'
	); 
   	echo json_encode($ret);
   	exit();
}

if(empty($password)){		
   	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 14,
		'message' => 'Contraseña vacia'
	); 
   	echo json_encode($ret);
   	exit();
}

$query = "SELECT user FROM users WHERE username='".$usuario."'";
$result = sqlsrv_query($conn, $query);

$r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
$row_count = count($r);	

if ($row_count > 0){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 17,
		'message' => 'Usuario ya existe'
	); 
   	echo json_encode($ret);
   	exit();
}

$query = "SELECT user FROM users WHERE email='".$email."'";
$result = sqlsrv_query($conn, $query);

$r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
$row_count = count($r);	

if ($row_count > 0){
	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 17,
		'message' => 'Ya se encuentra un usuario con el email que intenta asignar'
	); 
   	echo json_encode($ret);
   	exit();
}


if(strlen($password) < 8){			
   	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 15,
		'message' => 'La contraseña debe contener al menos 8 caracteres'
	); 
   	echo json_encode($ret);
   	exit();
}

if($password != $confirm_password){		
   	$ret = array(
		'status' => 'error',
		'code' => 404,
		'id_message' => 16,
		'message' => 'La confirmación de la contraseña no es identica a la contraseña ingresada'
	); 
   	echo json_encode($ret);
   	exit();
}
else{

	$query = "SELECT user FROM users WHERE username='".$usuario."'";
	$result = sqlsrv_query($conn, $query);

	$r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
		
	if(!$result){
		$ret = array(
			'status' => 'error',
			'code' => 404,
			'id_message' => 18,
			'message' => 'Error al buscar usuario'
		); 
	   	echo json_encode($ret);
	   	exit();
	}
	else{

		$codigo_activacion = uniqid();

				

        $mensaje = "Registro de usuario Golden Peanut\n\n";
        $mensaje .= "Bienvenido ".$usuario."!\n\n";
		$mensaje .= "Solo resta activar tu cuenta pulsando este enlace: http://www.goldenpeanut.com.ar/filesApp/includes/activacion.php?id="; 
		$mensaje .= $codigo_activacion;

		$asunto = "Activación Golden Peanut"; 

		if(mail($email,$asunto,$mensaje,"From: goldenpeanut@goldenpeanut.com")){ 

			$query = "INSERT INTO users (username,email,password,codigo_activacion,activo,permiso,admin) VALUES ('".$usuario."','".$email."','".$password."','".$codigo_activacion."','0','0','0')";
		
			if (!sqlsrv_query($conn, $query))
	        {            
	            if( ($errors = sqlsrv_errors() ) != null) {
		        	foreach( $errors as $error ) {
			            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
			            echo "code: ".$error[ 'code']."<br />";
			            echo "message: ".$error[ 'message']."<br />";
		        	}
		        	die();
		    	}
	        }

		    $ret = array(
				'status' => 'success',
				'code' => 200,
				'id_message' => 19,
				'message' => 'Se necesita autentificacion via mail'
			); 
			
		   	echo json_encode($ret);
		   	exit();

		}else{ 

		    $ret = array(
				'status' => 'error',
				'code' => 404,
				'id_message' => 20,
				'message' => 'Error al enviar mail'
			); 
		   	echo json_encode($ret);
		   	exit();

		} 	

		
	}
}
