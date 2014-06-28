function GameOptionsView(nBackSelector, gameModeSelector, delegate){
    this.nBackSelector = nBackSelector;
    this.gameModeSelector = gameModeSelector;
    this.delegate = delegate;
}
GameOptionsView.prototype = {
    listenForOptions: function(){
        this._activateNBackPicker(this.nBackSelector);
        this._activateGameModeDropdown(this.gameModeSelector);
    },
    _activateNBackPicker: function(nBackSelector) {
        $(nBackSelector).click(function(event) {
            event.preventDefault();

            $(nBackSelector).removeClass('active');
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