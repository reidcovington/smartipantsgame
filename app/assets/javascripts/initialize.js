var stats;
var gameData;
$(document).ready(function() {
    $.get('/games/game_data').done(function(response){
        gameData = response;
    });

    $.get('/users/data').done(function(response){
            stats = response;
            // console.log(response);
        });
    new ApplicationController("#game-section")
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
        var positionArr = [1,2,3,4];
        for(var i = 1; i < 5; i++){
            colorArr.push(gameData.colors[i]);
            soundArr.push(gameData.sounds[i]);
        }
        if (gameMode == 'single') {
            return {positions: positionArr}
        } else if (gameMode == 'dual') {
            this.soundBuilder.buildSounds(soundArr)
            return {positions: positionArr, sounds: soundArr}
        } else if (gameMode == 'triple'){
            this.soundBuilder.buildSounds(soundArr)
            return {colors: colorArr, sounds: soundArr, positions: positionArr}
        }
    },
    initiateGame: function(){
        this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
        var timeInt = window.setInterval(function(){
            this.evalRound();
            $('#color-button').attr("class", "btn btn-inverse");
            $('#sound-button').attr("class", "btn btn-inverse");
            $('#position-button').attr("class", "btn btn-inverse");
            if(this.currentRound < this.gameModel.rounds.length - 1){
                this.currentRound++
                this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
            }
            else {
                clearInterval(timeInt);
                this.endGame(this.gameModel.rounds);
            }
        }.bind(this), 2500);


    },
    evalGuess: function(keyCode){
        if(keyCode === 69 && this.gameMode === 'triple'){
            $('#color-button').addClass('active');
            this.gameModel.scoreGuess('color', this.currentRound);
        } else if(keyCode === 81){
            $('#position-button').addClass('active');
            this.gameModel.scoreGuess('position', this.currentRound);
        } else if(keyCode === 87 && this.gameMode != 'single'){
            $('#sound-button').addClass('active');
            this.gameModel.scoreGuess('sound', this.currentRound);
        };
    },
    evalRound: function(){
        if(this.currentRound >= this.n){
            this.gameModel.scoreNonGuess('color', this.currentRound);
            this.gameModel.scoreNonGuess('sound', this.currentRound);
            this.gameModel.scoreNonGuess('position', this.currentRound);
        }
    },
    endGame: function(rounds){
        var points = 0;
        for(var i = 0; i < rounds.length; i++){
            if(rounds[i].colorGuess){ points++ };
            if(rounds[i].soundGuess){ points++ };
            if(rounds[i].positionGuess){ points++ };
        };
        $.ajax({
            url: '/games',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(this.gameModel),
            processData: false,
            dataType: 'json'
        });
        this.delegate.announceResult(points, this.gameMode);
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
            this.rounds[i] = new RoundModel(i+1, this.roundAttributes);
        }
    },
    scoreGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        currentRound[attribute + 'Key'] = true;
        if(currentRound[attribute] === pastRound[attribute]){
            $('#' + attribute + '-button').attr("class", "btn btn-success")
            currentRound[attribute + 'Guess'] = true;
        } else if (currentRound[attribute] != pastRound[attribute]){
            $('#' + attribute + '-button').attr("class", "btn btn-danger")
        };
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
    this.position = this.pickPosition(attributes);
};
RoundModel.prototype = {
    pickColor: function(attributes){
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
    },
    pickPosition: function(attributes){
        var positions = attributes.positions;
        if( positions ){
            return positions[Math.floor(Math.random()*positions.length)]
        }
        return null
    }
};

function RoundView(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
};
RoundView.prototype = {
    constructRound: function(roundData){
        $('#game-section td').fadeOut(200)
        setTimeout(function(){
            $('#game-section td').css('background-color', 'transparent')
            if(roundData.color){
                $('td.'+roundData.position).css('background-color', roundData.color)
            } else{
                $('td.'+roundData.position).css('background-color', '#fff51b')
            };
            $('#game-section td').fadeIn(200)
        }, 200)
        if(roundData.sound){
            setTimeout(function(){
                $("#soundElem"+roundData.soundId)[0].play();
            }, 400)
        };
        this.turnOnBuzzers();
        this.turnOnColorMatch();
        this.turnOnSoundMatch();
        this.turnOnPositionMatch();
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
            this.delegate.evalGuess(69);
        }.bind(this));
    },
    turnOnSoundMatch: function(){
        $("#sound-button").on('click', function(event){
            event.preventDefault();
            this.delegate.evalGuess(82);
        }.bind(this));
    },
    turnOnPositionMatch: function(){
        $("#position-button").on('click', function(event){
            event.preventDefault();
            this.delegate.evalGuess(69);
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
        $("#graph_container").hide();
        // $(this.jQSelector).append("Hello")
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
        $("#start-button").on('click', function(event){
            event.preventDefault();
            if ($(gameModeSelector).text().toLowerCase() == 'game mode') {
                alert("Please select a Game Mode!");
            } else {
                $("#start-button").hide();
                // $( "#start-button" ).css("pointer-events", "none");
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
        } else if (gameMode == 'triple'){
            rounds = 60;
        };
        $(this.jQSelector).empty().append('<p>You scored '+points+' out of ' + rounds + ' possible points!</p><br><p> See full results <a hre="#">below</a><br><br>OR<br><br><button id="start-button" class="btn btn-hg btn-primary">Play Again!</button>');
        // $( "#start-button" ).css("pointer-events", "auto");
        $('#graph_container').show();
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
