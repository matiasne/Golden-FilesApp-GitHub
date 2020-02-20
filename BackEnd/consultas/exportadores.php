<?php
	
	include '../config.php';
	include '../dbh.php';
	require '../auth.php';

	verificarPermiso();
	
	
	$id_buque = $_POST['id_buque'];
	$nro_viaje = $_POST['nro_viaje'];

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Error al realizar la consulta de viajes'
	); 

	$query = "SELECT DISTINCT MANI_ENTIDADES.ID_ENTIDAD, MANI_ENTIDADES.DS_RAZON_SOCIAL FROM MANI_ENTIDADES INNER JOIN MANI_CONTRATOS ON MANI_ENTIDADES.ID_ENTIDAD = MANI_CONTRATOS.ID_ENTIDAD INNER JOIN MANI_SOM_LOTE_CONTRATO ON MANI_CONTRATOS.ID_CONTRATO = MANI_SOM_LOTE_CONTRATO.ID_CONTRATO INNER JOIN MANI_LOTES_EMBARQUES ON MANI_SOM_LOTE_CONTRATO.ID_LOTE = MANI_LOTES_EMBARQUES.ID_LOTE INNER JOIN MANI_EMBARQUES_DET_BUQUES ON MANI_LOTES_EMBARQUES.ID_EMBARQUE = MANI_EMBARQUES_DET_BUQUES.ID_EMBARQUE WHERE MANI_EMBARQUES_DET_BUQUES.ID_BUQUE = '".$id_buque."' AND NO_VIAJE = '".$nro_viaje."' ORDER BY 2";

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