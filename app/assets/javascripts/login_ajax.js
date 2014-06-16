$(document).ready(function(){
    $('#submit-login').submit(function(e){
        e.preventDefault();
        $.post('/users/login', $( this ).serialize());
        $( '#main-navbar' ).load('../../application.html.erb', function() {
            alert('Load was performed.');
        });
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