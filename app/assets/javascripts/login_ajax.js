$(document).ready(function(){
    $('#submit-login').submit(function(e){
        e.preventDefault();
        $.get('/users/login', $( this ).serialize());      
    });

    $('#submit-signup').submit(function(e){
        e.preventDefault();
        $.post('/users', $( '#submit-signup' ).serialize());
    })

    $('#logout').click(function(e){
        e.preventDefault();
        $.post('/users/logout').done(function(response){
            location.reload();
        });
    });
});