function GameOptionsView(){

}
GameOptionsView.prototype = {
    listenForOptions: function(){
        this._activateNBackPicker();
        this._activateGameModeDropdown();
    },
    _activateNBackPicker: function() {
        $('.pagination ul li').click(function(event) {
            event.preventDefault();
            $('.pagination ul li').removeClass('active');
            this.className = 'active'
        })
    },
    _activateGameModeDropdown: function(gameModeSelector) {
        $(gameModeSelector).click(function(event) {
            event.preventDefault();
            this._updateGameModeSelection(gameModeSelector);

        }.bind(this))
    },
    _updateGameModeSelection: function(gameModeSelector){
        $(gameModeSelector + '-selection').click(function(event) {
            event.preventDefault();
            $(gameModeSelector).text(event.target.innerHTML).append('<span class="caret"></span>');
        })
    }
}