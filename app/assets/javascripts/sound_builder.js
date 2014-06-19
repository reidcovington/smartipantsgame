function SoundBuilder(){};

SoundBuilder.prototype = {
    buildSounds: function(soundUrlArray){
        for(var i = 0; i < soundUrlArray.length; i++){
            this._buildSound(i+1, soundUrlArray[i]);
        }
    },
    _buildSound: function(i, url){
        $('.container-fluid').append("<audio id='soundElem"+i+"'><source src='"+url+"' type='audio/mpeg'></audio>");
    }
};