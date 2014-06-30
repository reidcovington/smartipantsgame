function CueButtonView(delegate) {
	this.delegate = delegate;
    this.positionButton = '#position-button';
	this.soundButton = '#sound-button';
	this.colorButton = '#color-button';
};
CueButtonView.prototype = {
	drawPositionButton: function(){
		$(this.positionButton)
        .slideDown(150)
        .off("click")
        .on("click", function(event){
            event.preventDefault();
            this.delegate.evalGuess(81);
        }.bind(this));
	},
	drawSoundButton: function(){
		$(this.soundButton)
        .slideDown(150)
        .off("click")
        .on("click", function(event){
            event.preventDefault();
            this.delegate.evalGuess(87);
        }.bind(this));
	},
	drawColorButton: function(){
		$(this.colorButton)
        .slideDown(150)
        .off("click")
        .on("click", function(event){
            event.preventDefault();
            this.delegate.evalGuess(69);
        }.bind(this));
	}
};