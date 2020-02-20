<?php
	
	
	include '../config.php';

	include '../dbh.php';
	require '../auth.php';

	verificarPermiso();
	
	//echo $contrato;
	$id_embarque = $_POST['id_embarque'];

	$parametros_consulta="";
	if($_POST['id_contrato']!="null"){
		$parametros_consulta .= "AND Mani_Som_Lote_Contrato.Id_Contrato = '".$_POST['id_contrato']."'";
	}

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Entidad no encontrada'
	); 

	$query = "SELECT  Mani_Lotes.Id_lote,Mani_Lotes.no_lote  FROM Mani_Embarques 
	INNER JOIN Mani_Lotes_Embarques ON Mani_Embarques.Id_embarque = Mani_Lotes_Embarques.Id_embarque 
	INNER JOIN Mani_lotes ON Mani_Lotes_Embarques.Id_lote = Mani_Lotes.Id_lote
        INNER JOIN Mani_Som_Lote_Contrato on Mani_Lotes.Id_Lote = Mani_Som_Lote_Contrato.Id_lote  
	WHERE Mani_Lotes_Embarques.Id_Embarque = '".$id_embarque."' ".$parametros_consulta."
        ORDER BY 2";

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