<?php


	
	include '../config.php';
	include '../dbh.php';
	require '../auth.php';

	verificarPermiso();
	
	$id_buque = $_POST['id_buque'];
	$nro_viaje = $_POST['nro_viaje'];
	$id_entidad = $_POST['id_entidad'];
	$id_contrato = $_POST['id_contrato'];

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Entidad no encontrada'
	); 

	

	$parametros_consulta = "";

	if($_POST['id_buque']!="null"){
		$parametros_consulta .= "MANI_EMBARQUES_DET_BUQUES.ID_BUQUE = '".$_POST['id_buque']."'";
	}
	
	if($_POST['nro_viaje']!="null"){
		$parametros_consulta .= "AND NO_VIAJE = '".$_POST['nro_viaje']."'";
	}

	if($_POST['id_entidad']!="null"){
		$parametros_consulta .= "AND MANI_CONTRATOS.ID_ENTIDAD ='".$_POST['id_entidad']."'";
	}	

	if($_POST['id_contrato']!="null"){
		$parametros_consulta .= " AND MANI_CONTRATOS.ID_CONTRATO =  '".$_POST['id_contrato']."'";
	}

	$query = "SELECT  DISTINCT   MANI_EMBARQUES.ID_EMBARQUE, MANI_EMBARQUES.NO_EMBARQUE_SIM FROM MANI_CONTRATOS INNER JOIN MANI_SOM_LOTE_CONTRATO ON MANI_CONTRATOS.ID_CONTRATO = MANI_SOM_LOTE_CONTRATO.ID_CONTRATO INNER JOIN MANI_LOTES_EMBARQUES ON MANI_SOM_LOTE_CONTRATO.ID_LOTE = MANI_LOTES_EMBARQUES.ID_LOTE INNER JOIN MANI_EMBARQUES_DET_BUQUES ON MANI_LOTES_EMBARQUES.ID_EMBARQUE = MANI_EMBARQUES_DET_BUQUES. ID_EMBARQUE INNER JOIN MANI_EMBARQUES ON MANI_EMBARQUES_DET_BUQUES.ID_EMBARQUE = MANI_EMBARQUES.ID_EMBARQUE  WHERE ".$parametros_consulta;

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