$(document).ready(function(){
    /*
        Registration form validation
    */
	$('.registration-form input[type="text"], .registration-form input[type="password"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
	// on click Sign in! button 
	$('.registration-form').on('submit', function(e) {
		var send  =true;
		var values = [];
		$(this).find('input[type="text"], input[type="password"]').each(function(){

    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    			send = false;// all inputs must be filled
    		}
    		else {
    			e.preventDefault();
    			values.push( $(this).val() );//save value if it's not empty
    			$(this).removeClass('input-error');
    		}
    		
    	});
    	if(send){
            
            var reg_btn = document.getElementById("registerbtn");
            var success = document.getElementById("success");
            reg_btn.disabled = true;
    		e.preventDefault();
    		var newRoom = false;
    		if($('#createNewRoom:checked').length == 1){
    			newRoom = true
    		}
			e.preventDefault(); 
			$.ajax({
                            type: "POST",
		  					url: "registration.php",         
                            data:{username:values[0],password:values[1],registerRoom:values[2],newroom:newRoom},
                            success:function(data){
                                e.preventDefault();
		  						var result = eval(data);
                                if(result[0] == 409){
                                    $("#errorMessage").css("color", "red");
                                    document.getElementById("errorMessage").innerHTML = result[1];
                                    reg_btn.disabled = false;
                                }
                                else if(result[0] == 200){ //successful registration
                                    document.getElementById("errorMessage").innerHTML = "";
                                    success.innerHTML = "Registration was successful, now you can login!";
                                    reg_btn.disabled = false;
                                }
		  					},
                            error: function (request, status, error) {
                                e.preventDefault();
                                alert(request.responseText);
                            }

			});
		}
    });


});