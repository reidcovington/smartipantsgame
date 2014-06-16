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
    announceResult: function(points, gameMode){
        this.announcer.postResult(points, gameMode);
    }
};

function GameController(n, gameMode, jQSelector, delegate){
    this.n = n;
    this.gameMode = gameMode;
    this.delegate = delegate;
    this.soundBuilder = new SoundBuilder()
    this.gameModel = new GameModel(n, this.fetchGameStructure(gameMode));
    this.roundView = new RoundView(jQSelector, this);
    this.currentRound = 0;
    this.initiateGame();
};
GameController.prototype = {
    fetchGameStructure: function(gameMode){
        var colorArr = [];
        var soundArr = [];
        for(var i = 1; i < 6; i++){
            colorArr.push(gameData.colors[i]);
            soundArr.push(gameData.sounds[i]);
        }
        if (gameMode == 'single') {
            return {colors: colorArr}
        } else if (gameMode == 'dual') {
            this.soundBuilder.buildSounds(soundArr)
            return {colors: colorArr, sounds: soundArr}
        }
    },
    initiateGame: function(){
        this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
        var timeInt = window.setInterval(function(){
            console.log(this.gameModel.rounds[this.currentRound])
            this.evalRound();
            if(this.currentRound < this.gameModel.rounds.length - 1){
                this.currentRound++
                this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
            }
            else {
                clearInterval(timeInt);
                this.endGame(this.gameModel.rounds);
            }
        }.bind(this), 1000);
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
        console.log(this.gameModel);
        $.ajax({
            url: '/games',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(this.gameModel),
            processData: false,
            dataType: 'json'
        });
        this.delegate.announceResult(points, this.gameMode);
    }//,
    // _buildJSONGame: function(){
    //     console.log(gameData)
    //     var fixRounds = this.gameModel.rounds;
    //     for(var i = 0; i < fixRounds.length; i++){
    //         fixRounds[i].round_number = i+1;
    //         fixRounds[i].color_id = gameData.colors.indexOf(fixRounds[i].color);
    //         fixRounds[i].audio_id = fixRounds[i].soundData[0] + 1;
    //     }
    //     this.gameModel.rounds = fixRounds;
    //     console.log(this.gameModel)
    //     return JSON.stringify(this.gameModel);
    // }
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
            this.rounds[i] = new RoundModel(i+1, this.roundAttributes);
        }
    },
    scoreGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        currentRound[attribute + 'Key'] = true;
        if(currentRound[attribute] === pastRound[attribute]){
            currentRound[attribute + 'Guess'] = true;
            console.log(currentRound[attribute + 'Guess'])
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

function RoundModel(roundNumber, attributes){
    this.roundNumber = roundNumber;
    this.color = this.pickColor(attributes);
    this.sound = this.pickSound(attributes);
};
RoundModel.prototype = {
    pickColor: function(attributes){
        console.log(attributes)
        var colors = attributes.colors;
        if( colors ){
            this.colorId = Math.floor(Math.random() * colors.length) + 1;
            return colors[this.colorId - 1];
        };
        return null;
    },
    pickSound: function(attributes){
        var sounds = attributes.sounds;
        if( sounds ){
            this.soundId = Math.floor(Math.random() * sounds.length) + 1;
            return sounds[this.soundId - 1];
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
            $(this.jQSelector).fadeOut(200)
            $(this.jQSelector).css('background-color', roundData.color)
            $(this.jQSelector).fadeIn(300)

        };
        console.log('roundData.sound: ' + roundData.sound)
        if(roundData.sound){
            setTimeout(function(){
                $("#soundElem"+roundData.soundId)[0].play();
            }, 400)
        };
        this.turnOnBuzzers();
        this.turnOnColorMatch();
        this.turnOnSoundMatch();
    },
    turnOnBuzzers: function(){
        $(document).on('keyup', function(event){
            event.preventDefault();
            this.delegate.evalGuess(event.keyCode);
        }.bind(this));
    },
    turnOnColorMatch: function(){
        $("#color-button").on('click', function(event){
            event.preventDefault();
            this.delegate.evalGuess(81);
        }.bind(this));
    },
    turnOnSoundMatch: function(){
        $("#sound-button").on('click', function(event){
            event.preventDefault();
            this.delegate.evalGuess(82);
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
            if ($(gameModeSelector).text().toLowerCase() == 'game mode') {
                alert("Please select a Game Mode!");
            } else {
                $("#start-button").hide();
                $( jQSelector ).css("pointer-events", "none")
                this.delegate.buildGame(parseInt( $(activeNBack).attr('id' )), $(gameModeSelector).text().toLowerCase())
            };
        }.bind(this))
    },
    postResult: function(points, gameMode){
        var rounds;
        if (gameMode == 'single') {
            rounds = 20;
        } else if (gameMode == 'dual') {
            rounds = 40;
        };
        $(this.jQSelector).empty().append('<p>You scored '+points+' out of ' + rounds + ' possible points!</p><br><button id="start-button" class="btn btn-hg btn-primary">Play Again!</button>');
    }
}
function SoundBuilder(){}
SoundBuilder.prototype = {
    buildSounds: function(soundUrlArray){
        // debugger
        for(var i = 0; i < soundUrlArray.length; i++){
            this._buildSound(i+1, soundUrlArray[i]);
        }
    },
    _buildSound: function(i, url){
        $('.container-fluid').append("<audio id='soundElem"+i+"'><source src='"+url+"' type='audio/mpeg'></audio>");
    }
};
