$(document).ready(function() {
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
        return {colors: ['orange', 'lightgreen', 'lightblue', 'yellow']}; //replace with server request
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
        }.bind(this), 2500);
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
            // this.gameModel.scoreNonGuess('sound', this.currentRound);
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
            $(this.jQSelector).fadeOut(300)
            $(this.jQSelector).css('background-color', roundData.color)
            $(this.jQSelector).fadeIn(300)

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

    listenForNbackNumber: function() {

        $('.pagination li').click(function(event) {
            event.preventDefault();
            $('.pagination .active').removeClass('active')
            this.className = 'active'
        })
    },

    postIntro: function(){
        this._listenForClick(this.jQSelector);
        this.listenForNbackNumber();
    },
    postResult: function(points){
        $(this.jQSelector).empty().append("<h3>You scored "+points+" out of 20 possible points!</h3><br><a href='#'>Play again!</a>")
    },
    _listenForClick: function(jQSelector){
        $(jQSelector).on('click', function(event){
            event.preventDefault();
            alert(this)
            this.delegate.buildGame(parseInt( $('.pagination .active').attr('id' )), 'dual');
        }.bind(this))
    }
}