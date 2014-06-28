function CueButtonView() = {
	this.positionButton = '#position-button';
	this.soundButton = '#sound-button';
	this.colorButton = '#color-button';
};
CueButtonView.prototype = {
	drawPositionButton: function(){
		$(this.positionButton).slideDown(150);
	},
	drawSoundButton: function(){
		$(this.soundButton).slideDown(150);
	},
	drawColorButton: function(){
		$(this.colorButton).slideDown(150);
	};
};

