//Change condition and activate textbox
jQuery(document).ready(function($){
	$('.condition').click(function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
			$(this).siblings('input').prop("disabled", false);
		}
		else{
			$(this).removeClass('active');
			$(this).siblings('input').prop("disabled", true);
			$(this).siblings('input').val('');
		}
	})

//Deactivate condition when it reaches 0.
$('.single-condition input').change(function(){
	if(jQuery(this).val() == 0){
		jQuery(this).siblings('p').trigger('click');
	}
})

//Decrement status when round increases.

$('.battle-modal input').change(function(){
  	$(this).attr('min', $('.battle-modal input').val())
	$('.single-condition input').each(function(){
		$(this).val(parseInt($(this).val()) - 1);
		if($(this).prop('disabled') == false && $(this).val() == 0){
			jQuery(this).siblings('p').trigger('click');
		}
	})
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

//Make battle modal appear and hide.

$('#battle-button').click(function(){
	if($('.battle-modal.open').length == 0){
		$('.battle-modal').addClass('open');
		$(this).html('End Battle');
	}
	else{
		$('.battle-modal').removeClass('open');
		$(this).html('Start Battle');
		$('.battle-modal input').val('1');
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
		if(confirm("Are you sure?")){
			var char_id = $(this).parent().data('id');
			var remove_data = {'char_id': char_id}
			//start the ajax
					$.ajax({
						//this is the php file that processes the data
						url: "character_changes.php",				 
						//POST method is used
						type: "POST",	 
						//pass the data        
						data: remove_data,    							
						//success
						success: function (response) {
						console.log(response);   
							$("div[data-id='" + response + "']").detach();
						}      
					});			 
					//cancel the submit button default behaviours
					return false;
		}
		else{
			return false;
		}

	
 });

})



