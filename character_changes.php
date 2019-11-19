<?php
require('connect.php');

if(isset($_POST['type'])){
$session_id = $_POST['session_id'];
$id = $_POST['id'];
$direction = $_POST['direction'];
$type = $_POST['type'];

/* Increase level of character */
if($direction == 'up' && $type == 'level'){
	$levelUpQuery = mysqli_query($con, "update character_name set level = level + 1 where id = ".$id." and session_id = ".$session_id."");
}
/* Decrease level of character */
else if($direction == 'down' && $type == 'level'){
	$levelDownQuery = mysqli_query($con, "update character_name set level = level - 1 where id = ".$id." and session_id = ".$session_id."");	
}

/* Increase max-health of character */
else if($direction == 'up' && $type == 'health'){
	$levelDownQuery = mysqli_query($con, "update character_name set max_health = max_health + 1 where id = ".$id." and session_id = ".$session_id."");	
}

/* Decrease max-health of character */
else if($direction == 'down' && $type == 'health'){
	$levelDownQuery = mysqli_query($con, "update character_name set max_health = max_health - 1 where id = ".$id." and session_id = ".$session_id."");	
}


//Get new character level

if($type == 'level'){
	$getNewLevelQuery = mysqli_query($con, "select level from character_name where id = ".$id." and session_id = ".$session_id."");

	while($row = mysqli_fetch_assoc($getNewLevelQuery)) {
		echo $row['level'];
	}
}


//Get new character max health

if($type == 'health'){
	$getNewHealthQuery = mysqli_query($con, "select max_health from character_name where id = ".$id." and session_id = ".$session_id."");

	while($row = mysqli_fetch_assoc($getNewHealthQuery)) {
		echo $row['max_health'];
	}
}

}

//Add new character

if(isset($_POST['name'])){
	echo "hello";
	$name = $_POST['name'];
	$level = $_POST['level'];
	$max_health = $_POST['max_health'];

	$addCharacter = mysqli_query($con, "insert into character_name (session_id, name, level, max_health) values (0, '$name', '$level', '$max_health')");
}

//Remove character

if(isset($_POST['char_id'])){
	$char_id = $_POST['char_id'];
	$removeCharacter = mysqli_query($con, "delete from character_name where id = '$char_id'");
	echo $char_id;
}

$con->close();

?>