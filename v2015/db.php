<?php
function getDB() {   
	$dbhost="rafaelwms.com.br";
	$dbuser="rafae573_enduser";
	$dbpass="wms-enduser_78";
	$dbname="rafae573_visitas";
	$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbConnection;
}
?>