function RoundView(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
};
RoundView.prototype = {
    fillPosition: function(position, color){
        $("#game-section td").fadeOut(150)
        setTimeout(function(){
            $("#game-section td").css("background-color", "transparent");
            $("td."+position).css("background-color", color);
            $("#game-section td").fadeIn(150);
        }.bind(this), 150);
    },
    playSound: function(soundId){
        setTimeout(function(){
            $("[data-audio='"+soundId+"']")[0].play();
        }.bind(this), 200);
    },
    turnOnKeyboardBuzzers: function(){
        $(document)
        .off("keydown")
        .on("keydown", function(event){
            this.delegate.evalGuess(event.keyCode);
        }.bind(this));
    },
    resetButtons: function(){
        $("#cue-buttons button").attr("class", "btn btn-inverse");
    },
    markActive: function(button){
        $("#"+button+"-button").addClass("active");
    },
    updateButtonStatus: function(button, feedback){
        $("#" + button + "-button").attr("class", "btn btn-" + feedback );
    }
};