<?php



//id ophalen van welke ik wil toggelen via post

// een select doen op deze id

// als het al een 1 is een 0 van maken als het een 1 is een 0 van maken


// query voor up te daten 
// UPDATE tblMannekes SET zichtbaar=1 WHERE id=<id>

include_once "config.php"; 


$id = $mysqli->real_escape_string($_POST['id']);



$query = "SELECT * FROM tblMannekes WHERE id=".$id." LIMIT 1";
$result = $mysqli->query($query);

  while($row = $result->fetch_array(MYSQL_ASSOC)) {
            //als het result een nee is omzetten in ja als het ja is omzetten naar nee
           
            if($row[zichtbaar]=="nee"){
            echo "nee";
            $mysqli->query("UPDATE tblMannekes SET zichtbaar='ja' WHERE id=".$id."");
        }else{
	        //op nee zetten
	        echo "ja"; 
	        $mysqli->query("UPDATE tblMannekes SET zichtbaar='nee' WHERE id=".$id."");
        }
}


    /*
header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
*/


//echo json_encode($myArray);
$result->close();
$mysqli->close();
?>