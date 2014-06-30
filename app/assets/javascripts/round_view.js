function RoundView(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
    this.turnOnKeyboardBuzzers();
};
RoundView.prototype = {
    _fillPosition: function(position, color){
        $('#game-section td').fadeOut(150)
        setTimeout(function(){
            $('#game-section td').css('background-color', 'transparent');
            $('td.'+position).css('background-color', color);
            this.turnOnPositionMatch();
            $('#game-section td').fadeIn(150);
        }.bind(this), 150);
    },
    _playSound: function(soundId){
        setTimeout(function(){
            $("#soundElem"+soundId)[0].play();
            this.turnOnSoundMatch();
        }.bind(this), 200);
    },
    turnOnKeyboardBuzzers: function(){
        $(document)
        .off('keyup');
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
        $('#cue-buttons button').attr("class", "btn btn-inverse");
    },
    markActive: function(button){
        $('#'+button+'-button').addClass('active');
    },
    updateButtonStatus: function(button, feedback){
        $('#' + button + '-button').attr("class", "btn btn-" + feedback );
    }
};