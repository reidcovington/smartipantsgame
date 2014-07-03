function GameModel(n, roundAttributes, gameMode, delegate){
    this.delegate = delegate;
    this.n = n;
    this.gameMode = gameMode;
    this.roundAttributes = roundAttributes;
    this.rounds = [];
    this.makeRounds();
};
GameModel.prototype = {
    makeRounds: function(){
        for (var i = 0; i < 20 + this.n; i++){
            this.rounds[i] = new RoundModel(i+1, this.roundAttributes);
        }
    },
    scoreGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        currentRound[attribute + 'Key'] = true;
        if (currentRound[attribute] === pastRound[attribute]){
            this.delegate.provideFeedback(attribute, 'success')
            currentRound[attribute + 'Guess'] = true;
        } else if (currentRound[attribute] != pastRound[attribute]){
            this.delegate.provideFeedback(attribute, 'danger')
        };
    },
    scoreNonGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        if (!currentRound[attribute + 'Key'] && !(currentRound[attribute] === pastRound[attribute])){
            currentRound[attribute + 'Guess'] = true;
        }
    },
    calculateTotalScore: function(){
        var totalPoints = 0;
        for (var i = 0; i < this.rounds.length; i++){
            if (this.rounds[i].colorGuess){ totalPoints++ };
            if (this.rounds[i].soundGuess){ totalPoints++ };
            if (this.rounds[i].positionGuess){ totalPoints++ };
        };
        return totalPoints;
    }
};