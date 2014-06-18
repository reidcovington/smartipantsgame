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
                this.turnOnColorMatch();
            } else{
                $('td.'+roundData.position).css('background-color', '#555')
            };
            this.turnOnPositionMatch();
            $('#game-section td').fadeIn(200)
        }.bind(this), 200)
        if(roundData.sound){
            setTimeout(function(){
                $("#soundElem"+roundData.soundId)[0].play();
                this.turnOnSoundMatch();
            }.bind(this), 300)
        };
        this.turnOnBuzzers();
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