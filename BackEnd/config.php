<?php

//Dar acceso a consultas desde servidor remoto
header("Access-Control-Allow-Origin: *");

//Mostrar todos los errores
ini_set('display_errors',1);
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';
