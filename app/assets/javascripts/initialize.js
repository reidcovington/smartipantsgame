$(document).ready(function() {
   var applicationController = new ApplicationController (new GameController(
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
    gameController.initEvents();
}

ApplicationController.prototype = {
    initEvents: function() {
        var self = this;
        self.gameController.startingView.drawIntro('#game-section')
    }
}

var GameController = function(gameModel, roundModel, startingView, roundView, scoreView){
        this.gameModel = gameModel;
        this.roundModel = roundModel;
        this.startingView = startingView;
        this.roundView = roundView;
        this.scoreView = scoreView;
        this.startGameSelector = '#start-button';
}

GameController.prototype = {
    initEvents: function() {
        var self = this;
        debugger
        $(document).on( 'click', self.startGameSelector, function(event){
            event.preventDefault();
            console.log(this.gameModel);
            debugger
        })
    }
}

// MODELS ----------------------------------------

var GameModel = function(){
    this.board = {};
    this.rounds = [];
}

GameModel.prototype = {
    init: function(){
        this.generateBoard();
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateBoard: function(n, gameType){
        var numOfRounds = n + 20

        for(var round = 1; round < numOfRounds; round++) {
            debugger
            this.board[round] = new RoundModel( GameModel.getRandomInt(1, 4), GameModel.getRandomInt(1, 3) )
        }
        console.log(this.board)
    }
}

var RoundModel = function(colorIndex, soundIndex){
    this.colors = ['blue', 'red', 'green', 'orange']
    this.sounds = ['a', 'b', 'c']
    var color = this.colors[colorIndex]
    var sound = this.sounds[soundIndex]

    return { color: color, sound: sound, match: false, correct: true }
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
















