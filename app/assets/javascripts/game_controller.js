 function GameController(n, gameMode, jQSelector, delegate){
    this.n = n;
    this.gameMode = gameMode;
    this.delegate = delegate;
    this.cueButtonView = new CueButtonView(); 
    this.soundBuilder = new SoundBuilder();
    this.roundView = new RoundView(jQSelector, this);
    this.currentRound = 0;
    this.initiateGame();
};

GameController.prototype = {
    fetchGameStructure: function(gameMode){
        var colorArr = [];
        var soundArr = [];
        var positionArr = [1,2,3,4];
        for (var i = 1; i < 5; i++){
            colorArr.push(gameData.colors[i]);
            soundArr.push(gameData.sounds[i]);
        }
        if (gameMode === 'Single') {
            return {positions: positionArr}
        } else if (gameMode === 'Dual') {
            this.soundBuilder.buildSounds(soundArr)
            return {positions: positionArr, sounds: soundArr}
        } else if (gameMode === 'Triple'){
            this.soundBuilder.buildSounds(soundArr)
            return {colors: colorArr, sounds: soundArr, positions: positionArr}
        }
    },
    initiateGame: function(){
        this.setCueButtons(this.gameMode);
        this.gameModel = new GameModel(this.n, this.fetchGameStructure(this.gameMode), this.gameMode, this);
        this.constructRound(this.gameModel.rounds[this.currentRound]);
        var timeInt = window.setInterval(function(){
            this.evalRound();
            if (this.currentRound < this.gameModel.rounds.length - 1){
                this.currentRound++
                this.constructRound(this.gameModel.rounds[this.currentRound]);
            }
            else {
                clearInterval(timeInt);
                this._endGame();
            }
        }.bind(this), 2300);
    },
    setCueButtons: function(gameMode) {
        this.cueButtonView.drawPositionButton();
        if (gameMode === 'Dual' || gameMode === 'Triple'){
            this.cueButtonView.drawSoundButton();
        };
        if (gameMode === 'Triple'){
            this.cueButtonView.drawColorButton();
        };
    },
    constructRound: function(roundData){
        if (roundData.color){
            this.roundView._fillPosition(roundData.position, roundData.color);
            this.roundView.turnOnColorMatch();
        } else {
            this.roundView._fillPosition(roundData.position, '#666');
        };
        if (roundData.sound){
            this.roundView._playSound(roundData.soundId);
        };
        this.roundView.turnOnKeyboardBuzzers();
    },
    evalGuess: function(keyCode){
        if (keyCode === 69 && this.gameMode === 'Triple'){
            this.roundView.markActive('color');
            this.gameModel.scoreGuess('color', this.currentRound);
        } else if (keyCode === 81){
            this.roundView.markActive('position');
            this.gameModel.scoreGuess('position', this.currentRound);
        } else if (keyCode === 87 && this.gameMode != 'Single'){
            this.roundView.markActive('sound');
            this.gameModel.scoreGuess('sound', this.currentRound);
        };
    },
    evalRound: function(){
        if (this.currentRound >= this.n){
            this.gameModel.scoreNonGuess('color', this.currentRound);
            this.gameModel.scoreNonGuess('sound', this.currentRound);
            this.gameModel.scoreNonGuess('position', this.currentRound);
        }
        this.roundView.resetButtons()
    },
    provideFeedback: function(button, feedback){
        this.roundView.updateButtonStatus(button, feedback);
    },
    _endGame: function(){
        var points = this.gameModel.calculateTotalScore();
        this.gameModel.delegate = null;
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
