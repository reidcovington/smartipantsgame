function GameView(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
    this.gameModeSelector = '#game-mode'
    this._waitForStartBtnClick();
};
GameView.prototype = {
    _waitForStartBtnClick: function(){
        $(document).on('click', "#start-button", function(event){
            event.preventDefault();
            this.delegate.buildGame()
        }.bind(this))
    },
    drawGameBoard: function(){
        $(this.jQSelector).empty().append('<tr><td class="1"></td><td class="2"></td></tr><tr><td class="3"></td><td class="4"></td></tr>');
    },
    postResult: function(points, rounds){
        $('#cue-buttons td button').slideUp(150);
        $(this.jQSelector).empty().append('<tr><td><center><p id="points-total">You scored '+points+' out of ' + rounds + ' possible points.</p><button id="start-button" class="btn btn-hg btn-primary">Play Again!</button></center></td></tr>');
    }
};