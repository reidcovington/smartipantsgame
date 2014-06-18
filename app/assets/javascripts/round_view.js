function RoundView(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
};
RoundView.prototype = {
    constructRound: function(roundData){
        if(roundData.color){
            this._fillPosition(roundData.position, roundData.color)
            this.turnOnColorMatch();
        }else{
            this._fillPosition(roundData.position, '#666')
        }
        if(roundData.sound){
            this._playSound(roundData.soundId);
        };
        this.turnOnBuzzers();
    },
    _fillPosition: function(position, color){
        $('#game-section td').fadeOut(200)
        setTimeout(function(){
            $('#game-section td').css('background-color', 'transparent')
            $('td.'+position).css('background-color', color)
            this.turnOnPositionMatch();
            $('#game-section td').fadeIn(200)
        }.bind(this), 200)
    },
    _playSound: function(soundId){
        setTimeout(function(){
            $("#soundElem"+soundId)[0].play();
            this.turnOnSoundMatch();
        }.bind(this), 300)
    },
    turnOnBuzzers: function(){
        $(document)
        .off('keyup')
        .on('keyup', function(event){
            event.preventDefault();
            this.delegate.evalGuess(event.keyCode);
        }.bind(this));
    },
    turnOnColorMatch: function(){
        $(document).on('click', "#color-button", function(event){
            event.preventDefault();
            this.delegate.evalGuess(69);
        }.bind(this));
    },
    turnOnSoundMatch: function(){
        $(document).on('click', "#sound-button", function(event){
            event.preventDefault();
            this.delegate.evalGuess(87);
        }.bind(this));
    },
    turnOnPositionMatch: function(){
        $("#position-button").on('click', function(event){
            event.preventDefault();
            this.delegate.evalGuess(81);
        }.bind(this));
    },
    resetButtons: function(){
        $('#color-button').attr("class", "btn btn-inverse");
        $('#sound-button').attr("class", "btn btn-inverse");
        $('#position-button').attr("class", "btn btn-inverse");
    },
    markActive: function(button){
        $('#'+button+'-button').addClass('active');
    },
    updateButtonStatus: function(button, feedback){
        $('#' + button + '-button').attr("class", "btn btn-" + feedback );
    }
};