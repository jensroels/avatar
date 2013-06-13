<?php
include_once "config.php"; 

$haar = $mysqli->real_escape_string($_POST['haar']);
$mond = $mysqli->real_escape_string($_POST['mond']);
$bril = $mysqli->real_escape_string($_POST['bril']);
$neus = $mysqli->real_escape_string($_POST['neus']);
$body = $mysqli->real_escape_string($_POST['body']);
$acc = $mysqli->real_escape_string($_POST['acc']);
$achtergrond = $mysqli->real_escape_string($_POST['achtergrond']);
$naam = $mysqli->real_escape_string($_POST['naam']);



	$query = "INSERT INTO ".$table."(haar, mond, bril, neus, body, achtergrond, acc, naam) values ('".$haar."', '".$mond."', '".$bril."', '".$neus."', '".$body."','".$achtergrond."','".$acc."','".$naam."')";
	
if (!$mysqli->query($query)) {
   $data['status'] = 'fail';
   $data['message'] = $mysqli->error;
}else{
$data['status'] = 'success';   
$data['link'] = "http://jensroels.be/eindpresentatie/index.html?id".$mysqli->insert_id;
$data['message'] =  "Succesvol opgeslagen manneke";	
}
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
echo json_encode($data);
$mysqli->close();
?>