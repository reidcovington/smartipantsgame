$(document).ready( function() {
    new ApplicationController (new GameController(
        new GameModel(),
        new RoundModel(),
        new StartingView(),
        new RoundView(),
        new ScoreView())
    ).initEvents();
})

// CONTROLLERS ------------------------------------

var ApplicationController = function(gameController){
    this.gameController = gameController;
    this.startGameSelector = '#start-button';
}

ApplicationController.prototype = {
    initEvents: function() {
        var self = this;
        $(document).on( 'submit', self.startGameSelector, function(event){
            event.preventDefault();
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

var StartingView = function(selector1){
    this.selector1 = selector1;
}

StartingView.prototype = {

}

var RoundView = function(selector1){
    this.selector1 = selector1;
}

RoundView.prototype = {

}

var SoundView = function(selector1){
    this.selector1 = selector1;
}

SoundView.prototype = {

}

var ScoreView = function(selector1){
    this.selector1 = selector1;
}

ScoreView.prototype = {

}
















