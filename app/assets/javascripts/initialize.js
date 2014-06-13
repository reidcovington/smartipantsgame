$(document).ready(function() {
   new ApplicationController ("#game-section")
})

// CONTROLLERS ------------------------------------

var ApplicationController = function(selector){
    this.selector = selector;
    this.startingView = new StartingView(selector, this);
    this.gameController = new GameController(this.selector);
}

ApplicationController.prototype = {
    buildGame: function(n, gameType){
        this.gameController.initEvents(n, gameType);
    }
}

var GameController = function(selector){
    this.selector = selector;
    this.gameModel;
    this.roundView = new RoundView(selector, this);
    this.scoreView = new ScoreView(selector, this);
}

GameController.prototype = {
    initEvents: function(n, gameType) {
        var self = this;
        this.gameModel = new GameModel(n, gameType)
        this.roundView.listenForCueClicks();
        var round = 0;
        var gamePlay = setInterval(function(){
            // debugger
            if (round === self.gameModel.rounds.length - 1) { clearInterval(gamePlay) }
            self.executeRound(round, gameType)
            round += 1
        }, 200)
    },

    executeRound: function(roundNum, gameType){
        if (gameType == 1){
            console.log('log in loop');
            this.roundView.drawColor(this.gameModel.rounds[roundNum].color)
        } else {
            this.roundView.drawColor(this.gameModel.rounds[roundNum].color)
            this.roundView.playSound(this.gameModel.rounds[roundNum].sound)
        }
    },

    // evalKeyup: function(this){

    // }
}

// MODELS ----------------------------------------

var GameModel = function(n, gameType){
    this.game = {};
    this.rounds = [];
    this.generateGame(n, gameType);
}

GameModel.prototype = {

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateGame: function(n, gameType){
        var numOfRounds = n + 20;
        if (gameType ==  1) {
            for(var round = 0; round < numOfRounds; round++) {
                var colorIndex = this.getRandomInt(0, 3);
                this.rounds.push( new RoundModel( colorIndex ) );
            }
            for(var round = 0; round < numOfRounds; round++) {
                if (round - n > 0) {
                    if (this.rounds[round].color === this.rounds[round - n].color) {
                        this.rounds[round].color_match = true
                    };
                }
            };
        };

        if (gameType == 2) {
            for(var round = 1; round < numOfRounds; round++) {
                var colorIndex = this.getRandomInt(0, 3)
                var soundIndex = this.getRandomInt(0, 2)
                this.rounds[round] = new RoundModel( colorIndex, soundIndex )
            }
            // debugger

            for(var round = 1; round < numOfRounds; round++) {
                if (round - n > 0) {
                    if (this.rounds[round].color === this.rounds[round - n].color) {
                        this.rounds[round].color_match = true
                    };

                    if (this.rounds[round].sound === this.rounds[round - n].sound) {
                        this.rounds[round].audio_match = true
                    };
                }
            }
        };

        return this.rounds
    }


}

var RoundModel = function(colorIndex, soundIndex){
    this.colors = ['blue', 'red', 'green', 'orange']
    this.sounds = ['a', 'b', 'c']
    var color = this.colors[colorIndex]
    var sound = this.sounds[soundIndex]

    return { color: color, sound: sound, color_match: false, audio_match: false, correct: true }
}

// VIEWS ------------------------------------------

var StartingView = function(selector, delegate){
    this.selector = selector;
    this.delegate = delegate;
    this.drawIntro(selector);
    this.listenForGameParams();
    // this.gameScreenSelector = gameScreenSelector;
}

StartingView.prototype = {
    drawIntro: function(gameScreenSelector){
        $(gameScreenSelector).append('<h1>Welcome, play your happy self off!</h1><br><form id="intro-form"><input type="integer" id="n"><input type="integer" id="game-type"><input type="submit" value="submit"></form>');
    },
    listenForGameParams: function(){
        var self = this;
        $('#intro-form').on('submit', function(event){
            event.preventDefault();
            self.delegate.buildGame(parseInt($('input#n').val()), parseInt($('input#game-type').val()));
            $(self.selector).empty();
        })
    }
}

var RoundView = function(selector, delegate){
    this.delegate = delegate;
    this.selector = selector;
}

RoundView.prototype = {
    drawColor: function(color){
        var self = this;
        $(this.selector).css('background-color', color)
    },
    playSound: function(sound){
        $(this.selector).append('thing that makes sound');
    },
    listenForCueClicks: function(){
        var self = this;
        $(document).on('keyup', function(event){
            event.preventDefault();
            self.delegate.evalKeyup(this);
        })
    }
}



var ScoreView = function(selector, delegate){
    this.delegate = delegate;
    this.selector1 = selector;
}

ScoreView.prototype = {
    //make cool methods that do things here
}
















