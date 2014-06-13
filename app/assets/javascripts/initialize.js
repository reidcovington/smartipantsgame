$(document).ready( function() {
    new ApplicationController (new GameController(
        new GameModel(),
        new RoundModel(),
        new StartingView(),
        new RoundView('selector1'),
        new ScoreView('selector1'))
    ).initEvents();


})

// CONTROLLERS ------------------------------------

var ApplicationController = function(gameController){
    this.gameController = gameController;
    this.startGameSelector = '#start-button'
}

ApplicationController.prototype = {
    initEvents: function() {
        var self = this;
        self.gameController.startingView.drawIntro('#game-section')
        $(document).on( 'click', self.startGameSelector, function(event){
            event.preventDefault();
            alert("hello");
        })
    }
}

var GameController = function(gameModel, roundModel, startingView, roundView, scoreView){
        this.gameModel = gameModel;
        this.roundModel = roundModel;
        this.startingView = startingView;
        this.roundView = roundView;
        this.scoreView = scoreView;
}

GameController.prototype = {

}

// MODELS ----------------------------------------

var GameModel = function(data){
    this.data = data;
    this.rounds = [];
}

GameModel.prototype = {

}

var RoundModel = function(memoryTypes){

}

// VIEWS ------------------------------------------

var StartingView = function(){
    // this.gameScreenSelector = gameScreenSelector;
}

StartingView.prototype = {
    drawIntro: function(gameScreenSelector){
        $(gameScreenSelector).append('<h1>Welcome, play your BALLZ off!</h1><br><button id="start-button" type="button">Start FUCKER!</button>');
    }
}

var RoundView = function(selector1){
    this.selector1 = selector1;
}

RoundView.prototype = {
    drawColor: function(roundColor){

    },
    playSound: function(roundSound){

    }
}



var ScoreView = function(selector1){
    this.selector1 = selector1;
}

ScoreView.prototype = {

}
















