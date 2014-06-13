$(document).ready(function() {
   new ApplicationController (new GameController(GameModel, new RoundView('selector1')))
})

// CONTROLLERS ------------------------------------

var ApplicationController = function(gameController){
    this.gameController = gameController;
    this.startingView = new StartingView;
    this.scoreView = new ScoreView;
    this.startingView.drawIntro('#game-section')
}

// ApplicationController.prototype = {

// }

var GameController = function(gameModel, roundView){
        this.gameModel = gameModel;
        this.roundView = roundView;
        // this.startGameSelector = '#start-button';
        this.initEvents();
}

GameController.prototype = {
    initEvents: function() {
        var self = this;
        // debugger
        $('#game-section').on('click', '#start-button', function(event){
            event.preventDefault();
            var new_game = new GameModel(2, 'dual')
            console.log(new_game)
        })
    }
}

// MODELS ----------------------------------------

var GameModel = function(n, gameType){
    this.board = {};
    this.rounds = [];
    this.generateBoard(n, gameType);
}

GameModel.prototype = {

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateBoard: function(n, gameType){
        var numOfRounds = n + 20

        for(var round = 1; round < numOfRounds; round++) {
            this.board[round] = new RoundModel( this.getRandomInt(0, 3), this.getRandomInt(0, 2) )
        }

        for(var round = 1; round < numOfRounds; round++) {
            if (round - n > 0) {
                if (this.board[round].color === this.board[round - n].color) {
                    this.board[round].color_match = true
                };

                if (this.board[round].sound === this.board[round - n].sound) {
                    this.board[round].audio_match = true
                };
            }
        }
        return this.board
    },
}

var RoundModel = function(colorIndex, soundIndex){
    this.colors = ['blue', 'red', 'green', 'orange']
    this.sounds = ['a', 'b', 'c']
    var color = this.colors[colorIndex]
    var sound = this.sounds[soundIndex]

    return { color: color, sound: sound, color_match: false, audio_match: false, correct: true }
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
















