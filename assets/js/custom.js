//Change condition
jQuery(document).ready(function($){
	$('.condition').click(function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}
		else{
			$(this).removeClass('active');
		}
	})

//Add new character button

$('.character-wrapper:last-child').after('<p id="new-char-button" class="button">Add new character</p>');

//Make new character modal appear and hide.

$('#new-char-button').click(function(){
	if($('.new-char-modal.open').length == 0){
		$('.new-char-modal').addClass('open');
	}
	else{
		$('.new-char-modal').removeClass('open');
	}
})

//Change level or health
$('.arrow-wrapper img').click(function(){

	var session_id = $(this).parents('.character-wrapper').data('session');
	var id = $(this).parents('.character-wrapper').data('id');
	var direction = $(this).attr('class');
	var type = $(this).parents('.arrow-wrapper').data('type');

	var form_data = {'session_id': session_id,'id': id, 'direction': direction, 'type': type}
	//start the ajax
			$.ajax({
				//this is the php file that processes the data
				url: "character_changes.php",				 
				//POST method is used
				type: "POST",	 
				//pass the data        
				data: form_data,    							
				//success
				success: function (response) {         
					if(type == "level"){
						$('[data-id='+id+']').find('.level').html('LVL: '+ response); 
					}
   					else if (type == "health"){
						$('[data-id='+id+']').find('.max-health').html('Max Health: '+ response); 
					}
				}      
			});			 
			//cancel the submit button default behaviours
			return false;
    });

//Add new character
$('#new-char-submit').click(function(){

	if($('#new-name').val().length > 0 && $('#new-level').val().length > 0 && $('#new-max-health').val().length > 0 ){
	
		var name = $('#new-name').val();
		var level = $('#new-level').val();
		var max_health = $('#new-max-health').val();
		var form_data = {'name': name,'level': level, 'max_health': max_health}
		//start the ajax
				$.ajax({
					//this is the php file that processes the data
					url: "character_changes.php",				 
					//POST method is used
					type: "POST",	 
					//pass the data        
					data: form_data,    							
					//success
					success: function (response) {   
						 location.reload();
					}      
				});			 
				//cancel the submit button default behaviours
				return false;
		}
		else{
			alert('Missing info');
		}
 });

//Remove character
$('.remove-character').click(function(){

		var id = $(this).parent().data('id');
		var form_data = {'id': id}
		//start the ajax
				$.ajax({
					//this is the php file that processes the data
					url: "character_changes.php",				 
					//POST method is used
					type: "POST",	 
					//pass the data        
					data: form_data,    							
					//success
					success: function (response) {   
						$("div[data-id='" + response + "']").detach();
					}      
				});			 
				//cancel the submit button default behaviours
				return false;
	
 });

})



