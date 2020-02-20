<?php

	
	include '../config.php';
	include '../dbh.php';
	require '../auth.php';
	
	verificarPermiso();
	
	$id_buque = $_POST['id_buque'];
	$nro_viaje = $_POST['nro_viaje'];

	$ret = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Error al realizar la consulta de viajes'
	); 

	$query = "SELECT ID_DESTINO,DS_DESTINO FROM MANI_EMBARQUES_DESTINOS WHERE ID_DESTINO IN (SELECT ID_DESTINO FROM MANI_EMBARQUES INNER JOIN   MANI_EMBARQUES_DET_BUQUES ON MANI_EMBARQUES.ID_EMBARQUE =  MANI_EMBARQUES_DET_BUQUES.ID_EMBARQUE WHERE MANI_EMBARQUES_DET_BUQUES.ID_BUQUE = '".$id_buque."' AND NO_VIAJE = '".$nro_viaje."') ORDER BY 2";

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