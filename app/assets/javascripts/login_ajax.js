  $(document).ready(function(){
    $('#submit-login').submit(function(e){
        e.preventDefault();
        var userInfo = {email: $(emailinputselector).val(), password: $(passwordinputselector).val()}
// SIYAN: Change the above to match your form and debug.
        $.post('/users/login', userInfo);
    });

    $('#logout').click(function(e){
        e.preventDefault();

        $.get('/users/logout');
    });
  });

