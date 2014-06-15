var gameData;
$(document).ready(function() {
    // if (window.location.href.indexOf('/games/play') > -1){
    $.get('/games/game_data').done(function(response){
        gameData = response;
    });
    new ApplicationController("#game-section")
    // }

})

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
    this.soundBuilder = new SoundBuilder()
    this.gameModel = new GameModel(n, this.fetchGameStructure(gameMode));
    this.roundView = new RoundView(jQSelector, this);
    this.currentRound = 0;
    this.initiateGame();
};
GameController.prototype = {
    fetchGameStructure: function(gameMode){
        var roundAttributes = {colors: ['orange', 'lightgreen', 'lightblue', 'yellow'],
                            sounds: ['/assets/1.ogg', '/assets/2.ogg', '/assets/3.ogg', '/assets/4.ogg', '/assets/5.ogg', '/assets/6.ogg', '/assets/7.ogg', '/assets/8.ogg']}; //replace with server request
        if (gameMode == 'single') {
            return {colors: roundAttributes.colors}
        } else if (gameMode == 'dual') {
            this.soundBuilder.buildSounds(roundAttributes.sounds)
            return roundAttributes
        }
    },
    initiateGame: function(){
        this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
        var timeInt = window.setInterval(function(){
            this.evalRound();
            console.log(this.gameModel.rounds.length)
            if(this.currentRound < this.gameModel.rounds.length - 1){
                this.currentRound++
                this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
            }
            else {
                this.endGame(this.gameModel.rounds);
                clearInterval(timeInt);
            }
        }.bind(this), 3000);
    },
    evalGuess: function(keyCode){
        if(keyCode === 81){
            this.gameModel.scoreGuess('color', this.currentRound);
        } else if(keyCode === 82){
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
        if(!currentRound[attribute + 'Key'] && !(currentRound[attribute] === pastRound[attribute])){
            currentRound[attribute + 'Guess'] = true;
        }
    }
};

function RoundModel(attributes){
    this.color = this.pickColor(attributes);
    this.soundData = this.pickSound(attributes);
    this.sound = this.soundData[1];
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
            var index = Math.floor(Math.random() * sounds.length)
            return [index, sounds[index]];
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
            $(this.jQSelector).fadeOut(300)
            $(this.jQSelector).css('background-color', roundData.color)
            $(this.jQSelector).fadeIn(300)

        };
        if(roundData.sound){
            // debugger
            setTimeout(function(){
                $("#soundElem"+roundData.soundData[0])[0].play();
            }, 400)
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
    this.nBackNumberSelector = ".pagination";
    this.gameModeSelector = '#game-mode'
    this.postIntro();
};
Announcer.prototype = {

    postIntro: function(){
        this._listenForNbackNumber(this.nBackNumberSelector);
        this._listenForGameMode(this.gameModeSelector);
        this._listenForClick(this.jQSelector, this.nBackNumberSelector, this.gameModeSelector);
    },
    _listenForNbackNumber: function(nBackNumberSelector) {
        var nBackNumberElement = ' li';
        var activeNBack = this.nBackNumberSelector + ' .active';
        $(nBackNumberSelector + nBackNumberElement).click(function(event) {
            event.preventDefault();
            $(activeNBack).removeClass('active')
            this.className = 'active'
        })
    },
    _listenForGameMode: function(gameModeSelector) {
        var self = this
        $(gameModeSelector).click(function(event) {
            event.preventDefault();

            self._listenForGameModeSelection(gameModeSelector);

        })
    },
    _listenForGameModeSelection: function(gameModeSelector){
        $(gameModeSelector + '-selection').click(function(event) {
            event.preventDefault();
            $(gameModeSelector).text(event.target.innerHTML).append('<span class="caret"></span>');
        })
    },
    _listenForClick: function(jQSelector, nBackNumberSelector, gameModeSelector){
        var activeNBack = this.nBackNumberSelector + ' .active';
        $(jQSelector).on('click', function(event){
            event.preventDefault();
            console.log(this + "clicked")
            if ($(gameModeSelector).text().toLowerCase() == 'game mode') {
                alert("Please select a Game Mode!");
            } else {
                $("#start-button").hide();
                $( jQSelector ).css("pointer-events", "none")
                this.delegate.buildGame(parseInt( $(activeNBack).attr('id' )), $(gameModeSelector).text().toLowerCase())
            };
        }.bind(this))
    },
    postResult: function(points){
        $(this.jQSelector).empty().append("<h3>You scored "+points+" out of 40 possible points!</h3><br><a href='#'>Play again!</a>")
    }
}
function SoundBuilder(){}
SoundBuilder.prototype = {
    buildSounds: function(soundUrlArray){
        // debugger
        for(var i = 0; i < soundUrlArray.length; i++){
            this._buildSound(i, soundUrlArray[i])
        }
    },
    _buildSound: function(i, url){
        $('.container-fluid').append("<audio id='soundElem"+i+"'><source src='"+url+"' type='audio/ogg'></audio>")
    }
}
