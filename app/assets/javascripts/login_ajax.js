$(document).ready(function(){
    $('#submit-login').submit(function(e){
        e.preventDefault();
        $.post('/users/login', $( this ).serialize());      
    });

    $('#submit-signup').submit(function(e){
        e.preventDefault();
        alert('hi')
        $.post('/users', $( this ).serialize());      
    });

    $('#logout').click(function(e){
        e.preventDefault();
        $.get('/users/logout');
    });
  });