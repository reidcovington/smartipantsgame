var gameData;
if (window.location.href.indexOf('/games/play') > -1){
    $.get('/games/game_data').done(function(response){
        gameData = response;
    });
}