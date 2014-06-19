 function GameController(n, gameMode, jQSelector, delegate){
    this.n = n;
    this.gameMode = gameMode;
    this.delegate = delegate;
    this.soundBuilder = new SoundBuilder()
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
        this.gameModel = new GameModel(this.n, this.fetchGameStructure(this.gameMode), this.gameMode, this);
        this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
        var timeInt = window.setInterval(function(){
            this.evalRound();
            if(this.currentRound < this.gameModel.rounds.length - 1){
                this.currentRound++
                this.roundView.constructRound(this.gameModel.rounds[this.currentRound]);
            }
            else {
                clearInterval(timeInt);
                this.endGame(this.gameModel.rounds);
            }
        }.bind(this), 2300);
    },
    evalGuess: function(keyCode){
        if(keyCode === 69 && this.gameMode === 'triple'){
            this.roundView.markActive('color');
            this.gameModel.scoreGuess('color', this.currentRound);
        } else if(keyCode === 81){
            this.roundView.markActive('position');
            this.gameModel.scoreGuess('position', this.currentRound);
        } else if(keyCode === 87 && this.gameMode != 'single'){
            this.roundView.markActive('sound');
            this.gameModel.scoreGuess('sound', this.currentRound);
        };
    },
    evalRound: function(){
        if(this.currentRound >= this.n){
            this.gameModel.scoreNonGuess('color', this.currentRound);
            this.gameModel.scoreNonGuess('sound', this.currentRound);
            this.gameModel.scoreNonGuess('position', this.currentRound);
        }
        this.roundView.resetButtons()
    },
    provideFeedback: function(button, feedback){
        this.roundView.updateButtonStatus(button, feedback);
    },
    endGame: function(rounds){
        var points = 0;
        for(var i = 0; i < rounds.length; i++){
            if(rounds[i].colorGuess){ points++ };
            if(rounds[i].soundGuess){ points++ };
            if(rounds[i].positionGuess){ points++ };
        };
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
