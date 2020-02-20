<?php
		
	include '../config.php';
	include '../dbh.php';

	require '../auth.php';

	verificarPermiso();
	
	//echo $contrato;

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Entidad no encontrada'
	); 

	$query = "SELECT id_entidad,ds_razon_social FROM Mani_Entidades WHERE Id_Entidad IN (SELECT id_entidad FROM Mani_Contratos WHERE tp_contrato = 'E' AND id_cosecha = 38)";

	$result = sqlsrv_query($conn, $query);	

	$rows = array();
	while($r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC)) {		
	    $rows[] = $r;
	}

	$ret = array(
		'status' => 'succes',
		'code' => '200',
		'data' => $rows
	);

	echo json_encode($ret);
	exit();