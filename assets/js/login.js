$(document).ready(function(){
	/*
        Login form validation
    */
	$('.login-form input[type="text"], .login-form input[type="password"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
        var send  =true;
        var values = [];
    	$(this).find('input[type="text"], input[type="password"]').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
                send = false;
    			$(this).addClass('input-error');
    		}
    		else {
                e.preventDefault();
    			$(this).removeClass('input-error');
                values.push( $(this).val() )
    		}
    	});
        if(send){
            e.preventDefault(); 
            $.ajax({
                            type: "POST",
                            url: "login.php",         
                            data:{username:values[0],password:values[1],registerRoom:values[2]},
                            success:function(data){
                                e.preventDefault();
                                var result = eval(data);
                                
                                if(result[0] == 401){
                                    $("#errorMessageLogin").css("color", "red");
                                    document.getElementById("errorMessageLogin").innerHTML = result[1];
                                }
                                else{
                                    document.getElementById("errorMessageLogin").innerHTML = "";
                                    window.location = "./home.php";
                                }
                            },
                            error: function (request, status, error) {
                                e.preventDefault();
                            }

            });
        }
    	
    });
});