$(document).ready(function() {
   new ApplicationController("#game-section")
})

//CONTROLLERS ------------------------------------

function ApplicationController(jQSelector){
    this.jQSelector = jQSelector;
    this.announcer = new Announcer(jQSelector, this);
    this.gameController = null;
};
ApplicationController.prototype = {
    buildGame: function(n, gameMode){
        this.gameController = new GameController(n, gameMode, this.jQSelector, this);
    },
    announceResult: function(points){
        this.announcer.postResult(points);
    }
};

function GameController(n, gameMode, jQSelector, delegate){
    this.n = n;
    this.delegate = delegate;
    this.gameModel = new GameModel(n, this.fetchGameStructure(n, gameMode));
    this.roundView = new RoundView(jQSelector, this);
    this.currentRound = 0;
    this.initiateGame();
};
GameController.prototype = {
    fetchGameStructure: function(n, gameMode){
        return {colors: ['red', 'green', 'blue', 'yellow']}; //replace with server request
    },
    initiateGame: function(){
        this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
        var timeInt = window.setInterval(function(){
            this.evalRound();
            if(this.currentRound < this.gameModel.rounds.length - 1){
                this.currentRound++
                this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
            }
            else {
                this.endGame(this.gameModel.rounds);
                clearInterval(timeInt);
            }
        }.bind(this), 400);
    },
    evalGuess: function(keyCode){
        if(keyCode === 81){
            this.gameModel.scoreGuess('color', this.currentRound);
        }else if(keyCode === 82){
            this.gameModel.scoreGuess('sound', this.currentRound);
        };
    },
    evalRound: function(){
        if(this.currentRound >= this.n){
            this.gameModel.scoreNonGuess('color', this.currentRound);
            this.gameModel.scoreNonGuess('sound', this.currentRound);
        }
    },
    endGame: function(rounds){
        var points = 0;
        for(var i = 0; i < rounds.length; i++){
            if(rounds[i].colorGuess){ points++ };
            if(rounds[i].soundGuess){ points++ };
        };
        this.delegate.announceResult(points);
    }
};

function GameModel(n, roundAttributes){
    this.n = n;
    this.roundAttributes = roundAttributes;
    this.rounds = [];
    this.makeRounds();
};
GameModel.prototype = {
    makeRounds: function(){
        for(var i = 0; i < 20 + this.n; i++){
            this.rounds[i] = new RoundModel(this.roundAttributes);
        }
    },
    scoreGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        currentRound[attribute + 'Key'] = true;
        if(currentRound[attribute] === pastRound[attribute]){
            currentRound[attribute + 'Guess'] = true;
        }
    },
    scoreNonGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        console.log("past round: " + pastRound.color + " : current round: " + currentRound.color)
        if(!currentRound[attribute + 'Key'] && !(currentRound[attribute] === pastRound[attribute])){
            currentRound[attribute + 'Guess'] = true;
        }
    }
};

function RoundModel(attributes){
    this.color = this.pickColor(attributes);
    this.sound = this.pickSound(attributes);
};
RoundModel.prototype = {
    pickColor: function(attributes){
        var colors = attributes.colors;
        if( colors ){
            return colors[Math.floor(Math.random() * colors.length)];
        };
        return null;
    },
    pickSound: function(attributes){
        var sounds = attributes.sounds;
        if( sounds ){
            return sounds[Math.floor(Math.random() * sounds.length)];
        };
        return null;
    }
};

function RoundView(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
};
RoundView.prototype = {
    constructRound: function(roundData){
        if(roundData.color){
            $(this.jQSelector).css('background-color', roundData.color)
        };
        if(roundData.sound){
            //do sound thing
        };
        this.turnOnBuzzers();
    },
    turnOnBuzzers: function(){
        $(document).on('keyup', function(event){
            event.preventDefault();
            this.delegate.evalGuess(event.keyCode);
        }.bind(this));
    }
};

function Announcer(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
    this.postIntro();
};
Announcer.prototype = {
    postIntro: function(){
        $(this.jQSelector).empty();
        $(this.jQSelector).append("<form id='game-type'><input id='n' type='number'><input type='submit' value='start game'></form>")
        this._listenForSubmit('#game-type', '#n');
    },
    postResult: function(points){
        $(this.jQSelector).empty().append("<h3>You scored "+points+" out of 20 possible points!</h3><br><a href='#'>Play again!</a>")
    },
    _listenForSubmit: function(jQSelector, inputId){
        $(jQSelector).on('submit', function(event){
            event.preventDefault();
            this.delegate.buildGame(parseInt($(inputId).val()), 'dual');
        }.bind(this))
    }
}





// var ApplicationController = function(selector){
//     this.selector = selector;
//     this.startingView = new StartingView(selector, this);
//     this.gameController = new GameController(this.selector);
// }

// ApplicationController.prototype = {
//     buildGame: function(n, gameType){
//         this.gameController.initEvents(n, gameType);
//     }
// }

// var GameController = function(selector){
//     this.selector = selector;
//     this.gameModel;
//     this.roundView = new RoundView(selector, this);
//     this.scoreView = new ScoreView(selector, this);
// }

// GameController.prototype = {
//     initEvents: function(n, gameType) {
//         var self = this;
//         this.gameModel = new GameModel(n, gameType)
//         this.roundView.listenForCueClicks();
//         self.currentRound = 0;
//         self.executeRound(self.currentRound, gameType);
//         var gamePlay = window.setInterval(function(){
//             if (this.currentRound > this.gameModel.rounds.length - 2) {
//                 this.gameModel.evalEndOfRoundColor(this.currentRound)
//                 this.roundView.stopListening();
//                 console.log(this.gameModel.rounds)
//                 clearInterval(gamePlay);
//             }

//             if (this.gameModel.rounds[this.currentRound].keyed_color === false ) {
//                 this.gameModel.evalEndOfRoundColor(this.currentRound)
//             }

//             this.currentRound++;
//             this.executeRound(this.currentRound, gameType)
//         }.bind(this), 1500)
//     },

//     executeRound: function(roundIndex, gameType){
//         if (gameType == 1){
//             this.roundView.drawColor(this.gameModel.rounds[roundIndex].color)
//         } else {
//             this.roundView.drawColor(this.gameModel.rounds[roundIndex].color)
//             this.roundView.playSound(this.gameModel.rounds[roundIndex].sound)
//         }
//     },

//     evalKeyup: function(key){
//         if(key == 81) { this.gameModel.evalColorMatch(this.currentRound) };
//         if(key == 82) { this.gameModel.evalSoundMatch(this.currentRound) };
//     }
// }

// // MODELS ----------------------------------------

// var GameModel = function(n, gameType){
//     this.game = {};
//     this.rounds = [];
//     this.generateGame(n, gameType);
// }

// GameModel.prototype = {

//     getRandomInt: function(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     },

//     generateGame: function(n, gameType){
//         var numOfRounds = n + 20;
//         if (gameType ==  1) {
//             for(var round = 0; round < numOfRounds; round++) {
//                 var colorIndex = this.getRandomInt(0, 3);
//                 this.rounds.push( new RoundModel( colorIndex ) );
//             }
//             for(var round = 0; round < numOfRounds; round++) {
//                 if (round - n >= 0) {
//                     if (this.rounds[round].color === this.rounds[round - n].color) {
//                         this.rounds[round].color_match = true
//                     };
//                 }
//             };
//         };
//         if (gameType == 2) {
//             for(var round = 1; round < numOfRounds; round++) {
//                 var colorIndex = this.getRandomInt(0, 3)
//                 var soundIndex = this.getRandomInt(0, 2)
//                 this.rounds[round] = new RoundModel( colorIndex, soundIndex )
//             }
//             for(var round = 1; round < numOfRounds; round++) {
//                 if (round - n > 0) {
//                     if (this.rounds[round].color === this.rounds[round - n].color) {
//                         this.rounds[round].color_match = true
//                     };

//                     if (this.rounds[round].sound === this.rounds[round - n].sound) {
//                         this.rounds[round].audio_match = true
//                     };
//                 }
//             }
//         };
//         return this.rounds
//     },

//     evalColorMatch: function(currentRound) {
//         this.rounds[currentRound].keyed_color = true;
//         if(this.rounds[currentRound].color_match === false) {
//             this.rounds[currentRound].color_correct = false;
//         }
//     },

//     evalSoundMatch: function(currentRound) {
//         this.rounds[currentRound].keyed_sound = true;
//         if(this.rounds[currentRound].audio_match === false) {
//             this.rounds[currentRound].audio_correct = false;
//         }
//     },

//     evalEndOfRoundColor: function(currentRound) {
//         if(this.rounds[currentRound].color_match === true) {
//             this.rounds[currentRound].color_correct = false;
//         };
//     },

//     evalRoundSound: function(currentRound) {
//         if(this.rounds[currentRound].audio_match === true) {
//             this.rounds[currentRound].audio_correct = false;
//         };
//     }
// }

// var RoundModel = function(colorIndex, soundIndex){
//     this.colors = ['blue', 'red', 'green', 'orange']
//     this.sounds = ['a', 'b', 'c']
//     var color = this.colors[colorIndex]
//     var sound = this.sounds[soundIndex]

//     return { color: color, sound: sound, color_match: false, color_correct: true, audio_match: false, audio_correct: true, keyed_color: false, keyed_sound: false }
// }

// // VIEWS ------------------------------------------

// var StartingView = function(selector, delegate){
//     this.selector = selector;
//     this.delegate = delegate;
//     this.drawIntro(selector);
//     this.listenForGameParams();
// }

// StartingView.prototype = {
//     drawIntro: function(gameScreenSelector){
//         $(gameScreenSelector).append('<h1>Welcome, play your happy self off!</h1><br><form id="intro-form"><input type="integer" id="n"><input type="integer" id="game-type"><input type="submit" value="submit"></form>');
//     },
//     listenForGameParams: function(){
//         var self = this;
//         $('#intro-form').on('submit', function(event){
//             event.preventDefault();
//             self.delegate.buildGame(parseInt($('input#n').val()), parseInt($('input#game-type').val()));
//             $(self.selector).empty();
//         })
//     }
// }

// var RoundView = function(selector, delegate){
//     this.delegate = delegate;
//     this.selector = selector;
// }

// RoundView.prototype = {
//     drawColor: function(color){
//         var self = this;
//         $(this.selector).css('background-color', color)
//     },
//     playSound: function(sound){
//         $(this.selector).append('thing that makes sound');
//     },
//     listenForCueClicks: function(){
//         var self = this;
//         $(document).on('keyup', function(event){
//             event.preventDefault();
//             self.delegate.evalKeyup(event.keyCode);
//         })
//     },
//     stopListening: function(){
//         $(document).unbind('keyup');
//     }
// }

// var ScoreView = function(selector, delegate){
//     this.delegate = delegate;
//     this.selector1 = selector;
// }

// ScoreView.prototype = {
//     //make cool methods that do things here
// }
















