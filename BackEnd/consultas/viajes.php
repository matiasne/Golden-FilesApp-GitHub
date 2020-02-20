<?php


	include '../config.php';
	include '../dbh.php';
	require '../auth.php';
	
	//echo $contrato;
	$id_buque = $_POST['id_buque'];

	verificarPermiso();

	$ret = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Error al realizar la consulta de viajes'
	); 

	$query = "SELECT DISTINCT no_viaje FROM MANI_EMBARQUES_DET_BUQUES WHERE ID_BUQUE = '".$id_buque."' order by 1";

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