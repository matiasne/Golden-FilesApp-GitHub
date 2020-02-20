<?php

include '../config.php';
include '../dbh.php';
require '../auth.php';

verificarPermiso();

$ret = array(
	'status' => 'error',
	'code' => 404,
	'message' => 'Error al realizar la consulta de buques'
); 

$query = "SELECT ID_BUQUE, DS_BUQUE FROM MANI_EMBARQUES_BUQUES  ORDER BY 2";

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