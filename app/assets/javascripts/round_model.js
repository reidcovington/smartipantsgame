function RoundModel(roundNumber, attributes){
    this.roundNumber = roundNumber;
    this.color = this.pickColor(attributes);
    this.sound = this.pickSound(attributes);
    this.position = this.pickPosition(attributes);
};
RoundModel.prototype = {
    pickColor: function(attributes){
        var colors = attributes.colors;
        if (colors){
            this.colorId = Math.floor(Math.random() * colors.length) + 1;
            return colors[this.colorId - 1];
        };
        return null;
    },
    pickSound: function(attributes){
        var sounds = attributes.sounds;
        if (sounds){
            this.soundId = Math.floor(Math.random() * sounds.length) + 1;
            return sounds[this.soundId - 1];
        };
        return null;
    },
    pickPosition: function(attributes){
        var positions = attributes.positions;
        if (positions){
            return positions[Math.floor(Math.random()*positions.length)]
        }
        return null
    }
};