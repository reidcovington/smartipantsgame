  $(document).ready(function(){
    $(".login_hide").hide();
    $(document).on('click', '#login',  function(e){
      e.preventDefault();
      $('.login_hide').show();
    });

  })

