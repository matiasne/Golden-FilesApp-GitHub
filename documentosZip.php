<?php
	
	include '../config.php';
	include '../dbh.php';
	require '../auth.php';

	//verificarPermiso();

	$id_buque = $_GET['id_buque'];
	$nro_viaje = $_GET['nro_viaje'];
    $id_destino = $_GET['id_destino'];
    
    
    
	$parametros_consulta = "";

	$parametros_consulta .= " MANI_CONTRATOS_DOCUMENTOS_1.ID_BUQUE = '".$id_buque."' AND MANI_CONTRATOS_DOCUMENTOS_1.ID_DESTINO = '".$id_destino."' AND MANI_CONTRATOS_DOCUMENTOS_1.NO_VIAJE = '".$nro_viaje."'";

	if($_GET ['agencia']!="null"){
		$parametros_consulta .= " AND MANI_CONTRATOS_DOCUMENTOS_1.ID_AGENCIA = '".$_GET['agencia']."'";
	}

	if($_GET ['fordwarder']!="null"){
		$parametros_consulta .= " AND MANI_CONTRATOS_DOCUMENTOS_1.ID_FORWARDER = '".$_GET['fordwarder']."'";
	}

	if($_GET ['id_contrato']!="null"){
		$parametros_consulta .= " AND MANI_CONTRATOS_DOCUMENTOS_1.ID_CONTRATO = '".$_GET['id_contrato']."'";
	}

	if($_GET ['id_entidad']!="null" && $_GET ['id_entidad']!="0"){
		$parametros_consulta .= " AND MANI_CONTRATOS_DOCUMENTOS_1.ID_ENTIDAD = '".$_GET['id_entidad']."'";
    }
		
	$parametros_consulta .="ORDER BY MANI_CONTRATOS_DOCUMENTOS_1.ID_CONTRATO";
	
	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Documento no encontrado'
	); 	 

    $query = "SELECT DISTINCT * FROM MANI_CONTRATOS_DOCUMENTOS_1 INNER JOIN MANI_CONTRATOS_TIPO_DOC ON MANI_CONTRATOS_DOCUMENTOS_1.ID_CONTRATO_TIPO_DOC = MANI_CONTRATOS_TIPO_DOC.ID_CONTRATO_TIPO_DOC WHERE".$parametros_consulta;
    
    //echo $query;

    
	$result = sqlsrv_query($conn, $query);	

    $rows = array();
    
    error_reporting(E_ALL);
    $thisdir =dirname(__FILE__);

    $filename = "/download.zip";

    $zip = new ZipArchive;
    if ($zip->open(getcwd() . $filename, ZipArchive::CREATE) === TRUE) {
        
        $partes = array();
        while($r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC)) {		
            $rows[] = $r;  
            
            //echo json_encode($r);

            $partes = explode("\\",$r['DS_RUTA']);

            $path = "../..";
            $i=0; 

            for ($i=4; $i< count($partes);$i++) {

                $path = $path."/".$partes[$i];
            }    


            $partes2 = explode("_",$partes[count($partes)-1]);
            
            
             

        
            $nombre = $r['DC_TIPO_DOC']."_".$partes2[count($partes2)-1];

            $zip->addFile($path,$nombre);
        }   


        $zip->close();  
    } else {
        echo 'failed';
    }


    header( "Pragma: public" );
    header( "Expires: 0" );
    header( "Cache-Control: must-revalidate, post-check=0, pre-check=0" );
    header( "Cache-Control: public" );
    header( "Content-Description: File Transfer" );
    header( "Content-type: application/zip" );
    header( "Content-disposition: attachment; filename=".$_GET['nombre'].".zip" );
    header( "Content-Transfer-Encoding: binary" );
    header( "Content-Length: ".filesize( $thisdir."\download.zip"));


    
    readfile($thisdir."\download.zip");

    register_shutdown_function('unlink', $thisdir."\download.zip");


    unset($zip);
    

    
