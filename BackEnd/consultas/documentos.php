<?php
	
	include '../config.php';
	include '../dbh.php';
	require '../auth.php';

	verificarPermiso();

	$id_buque = $_POST['id_buque'];
	$nro_viaje = $_POST['nro_viaje'];
	$id_destino = $_POST['id_destino'];	
	
	$parametros_consulta = "";

	$parametros_consulta .= "MANI_EMBARQUES_DET_BUQUES.NO_VIAJE = '".$nro_viaje."' AND MANI_EMBARQUES.ID_DESTINO = '".$id_destino."' AND MANI_EXPO_PROFORMA.ID_BUQUE = '".$id_buque."'";

	if($_POST['id_embarque']!="null"){
		$parametros_consulta .= " AND MANI_EMBARQUES.ID_EMBARQUE = '".$_POST['id_embarque']."'";
	}

	if($_POST['id_entidad']!="null"){
		$parametros_consulta .= " AND MANI_CONTRATOS.ID_ENTIDAD = '".$_POST['id_entidad']."'";
	}

	if($_POST['id_contrato']!="null"){
		$parametros_consulta .= " AND MANI_CONTRATOS.ID_CONTRATO = '".$_POST['id_contrato']."'";
	}

	if($_POST['id_lote']!="null" && $_POST['id_lote']!="0"){
		$parametros_consulta .= " AND MANI_LOTES_EMBARQUES.ID_LOTE = '".$_POST['id_lote']."'";
	}
		
	$parametros_consulta .="ORDER BY MANI_CONTRATOS.ID_CONTRATO_TERCERO, MANI_EMBARQUES.NO_EMBARQUE_SIM,  MANI_CONTRATOS_DOCUMENTOS.ID_CONTRATO_TIPO_DOC";
	
	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Documento no encontrado'
	); 


	 

	$query = "SELECT DISTINCT  MANI_CONTRATOS_TIPO_DOC.DC_TIPO_DOC, MANI_CONTRATOS.ID_CONTRATO_TERCERO, MANI_EMBARQUES.NO_EMBARQUE_SIM,
                  MANI_CONTRATOS_DOCUMENTOS.ID_CONTRATO_DOCUMENTO, MANI_CONTRATOS_DOCUMENTOS.ID_CONTRATO, MANI_CONTRATOS_DOCUMENTOS.ID_CONTRATO_TIPO_DOC,
                  MANI_CONTRATOS_DOCUMENTOS.DS_RUTA, MANI_CONTRATOS_DOCUMENTOS.DT_FECHA_SUBIDA, MANI_CONTRATOS_DOCUMENTOS.ID_USUARIO, 
                  MANI_CONTRATOS_DOCUMENTOS.CD_LOTE, MANI_CONTRATOS_DOCUMENTOS.CD_USNUMBER, MANI_CONTRATOS_DOCUMENTOS.ID_EMBARQUE 
                  FROM MANI_CONTRATOS_DOCUMENTOS 
                  INNER JOIN MANI_CONTRATOS ON MANI_CONTRATOS_DOCUMENTOS.ID_CONTRATO = MANI_CONTRATOS.ID_CONTRATO 
                  INNER JOIN MANI_SOM_LOTE_CONTRATO ON MANI_CONTRATOS.ID_CONTRATO = MANI_SOM_LOTE_CONTRATO.ID_CONTRATO 
                  INNER JOIN MANI_LOTES_EMBARQUES ON MANI_SOM_LOTE_CONTRATO.ID_LOTE = MANI_LOTES_EMBARQUES.ID_LOTE 
                  INNER JOIN MANI_EMBARQUES_DET_BUQUES ON MANI_LOTES_EMBARQUES.ID_EMBARQUE = MANI_EMBARQUES_DET_BUQUES.ID_EMBARQUE 
                  INNER JOIN MANI_EMBARQUES ON MANI_EMBARQUES_DET_BUQUES.ID_EMBARQUE = MANI_EMBARQUES.ID_EMBARQUE AND MANI_CONTRATOS_DOCUMENTOS.ID_EMBARQUE = MANI_EMBARQUES.ID_EMBARQUE 
                  INNER JOIN MANI_CONTRATOS_TIPO_DOC ON MANI_CONTRATOS_DOCUMENTOS.ID_CONTRATO_TIPO_DOC = MANI_CONTRATOS_TIPO_DOC.ID_CONTRATO_TIPO_DOC
		  INNER JOIN MANI_EXPO_PROFORMA_DET ON MANI_EMBARQUES.ID_EMBARQUE = MANI_EXPO_PROFORMA_DET.ID_EMBARQUE 
		  INNER JOIN MANI_EXPO_PROFORMA ON MANI_EXPO_PROFORMA_DET.ID_PROFORMA = MANI_EXPO_PROFORMA.ID_PROFORMA AND MANI_EXPO_PROFORMA.NO_BL IS NOT NULL
		   
                  WHERE ".$parametros_consulta;

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