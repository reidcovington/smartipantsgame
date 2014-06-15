$(document).ready(function(){
    $('#submit-login').submit(function(e){
        e.preventDefault();
        $.post('/users/login', $( this ).serialize()));      
    });

    $('#submit-signup').submit(function(e){
        e.preventDefault();
        var userInfo = {username: $(usernameinputselector).val(), email: $(emailinputselector).val(), password: $(passwordinputselector).val()};
        $.post('/users/create', userInfo);
    });

    $('#logout').click(function(e){
        e.preventDefault();
        $.get('/users/logout');
    });
  });