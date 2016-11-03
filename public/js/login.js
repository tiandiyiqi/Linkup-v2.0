/*jslint white:true, nomen:true, sloppy:true, vars:true*/
/*global $, document, window, api_async, api_sync*/


function login(event)
{
    event.preventDefault();
	var l_username = $('#username').val();
	var l_password = $('#password').val();
    var l_Storefront = 'Storefront';
    var l_start ='Storefront';
	api_async.auth.login(l_username, l_password,
		function (p_data)
		{
			$.cookie('user_id', p_data.user_id, { expires: 2, path: '/' });
			$.cookie('user_hash', p_data.user_hash, { expires: 2, path: '/' });
			$.cookie('expiration_date', p_data.expiration_date, { expires: 2, path: '/' });
            var session = api_sync.auth.get_current_user();
             window.location = '/';
            if (session.scope)
            {
                if(session.scope_name[0] == '')  
                {
                    window.location = '/';
                   $('#error_msg').text('Succes');
                }
                
                else
                {
                    window.location = '/';
                    $('#error_msg').text('Succes');
                }
            }
		},
		function ()
		{
			$('#password').val('');
			$('#error_msg').text('Wrong Credentials!');
		});
}


$(document).ready(function() {
   $('#login_button').on('click',login);      
   $('#login_form').on('submit',login);      
            
});


