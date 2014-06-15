$(document).ready(function(){
    $('#submit-login').submit(function(e){
        e.preventDefault();
        var userInfo = {email: $(emailinputselector).val(), password: $(passwordinputselector).val()};
// SIYAN: Change the above to match your form and debug.
        $.post('/users/login', userInfo);
    });

    $('submit-signup').submit(function(e){
        e.preventDefault();
        var userInfo = {username: $(usernameinputselector).val(), email: $(emailinputselector).val(), password: $(passwordinputselector).val()};
        $.post('/users/create', userInfo);
    });

    $('#logout').click(function(e){
        e.preventDefault();

        $.get('/users/logout');
    });

  });