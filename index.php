<?php


echo '<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="assets/css/style.css" />
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="crossorigin="anonymous"></script>
  <script src="assets/js/custom.js"></script>
</head>
<body>
<div class="site-container">';

echo '<div class="new-char-modal">
		<h2>New Character</h2>
		<div class="modal-input-wrapper">
			<label>Name: </label><input id="new-name" type="text" />
		</div>
		<div class="modal-input-wrapper">
			<label>Level: </label><input type="text" id="new-level" />
		</div>
		<div class="modal-input-wrapper">
			<label>Max Health: </label><input type="text" id="new-max-health" />
		</div>
		<input type="hidden" value="0" />
		<p id="new-char-submit" class="button">Submit</p>
	  </div>';

renderCharacters();


echo '</div></body>
</html>';



function renderCharacters(){
		// Check connection
		require('connect.php');

		if (!$con) {
		    die("Connection failed: " . mysqli_connect_error());
		}

		$characterQuery = mysqli_query($con, "select * from character_name");

		if (mysqli_num_rows($characterQuery) > 0) {
		    // output data of each row
		    while($row = mysqli_fetch_assoc($characterQuery)) {
			    	echo '<div data-session="'.$row['session_id'].'" data-id="'.$row['id'].'"  class="character-wrapper">
			    		<p class="remove-character">X</p>
						<div class="character-heading">
						    <div class="name-level">
			  					<h1>'.$row['name'].'</h1>
			  					<div data-type="level" class="arrow-wrapper level-wrapper">
								    <p class="level">LVL: '.$row['level'].'</p>
								    <img class="up" src="assets/images/arrowup.png" />
								    <img class="down" src="assets/images/arrowdown.png" />
							    </div>
							</div>
							<div class="health-wrapper">
			  					<div data-type="health" class="arrow-wrapper max-health-wrapper">
								    <p class="max-health">Max Health: '.$row['max_health'].'</p>
								    <img class="up" src="assets/images/arrowup.png" />
								    <img class="down" src="assets/images/arrowdown.png" />
							    </div>
								<label>Current Health:</label><input class="current_health" type="text">
							</div>
						</div>
						<div class="character-info">
							<div class="conditions-wrapper">';
			$conditionQuery = mysqli_query($con, "select * from conditions");
			   while($row2 = mysqli_fetch_assoc($conditionQuery)) {
								echo '<div class="single-condition">
										<p class="condition" id='.$row2['name'].'>'.$row2['initial'].'<span>'.$row2['name'].'</span></p>
										<input type="number" min="0" max="100" disabled />
									  </div>';
				}
							echo '</div>
						</div>	
					</div>';
		    }
		} 

		else {
			echo '<p id="new-char-button" class="button">Add new character</p>';
		}

		$con->close();
}



?>