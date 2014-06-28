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
        var self = this;
        $(nBackSelector).click(function(event) {
            event.preventDefault();
            self.delegate.nBack = parseInt(this.textContent);
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
            var gameMode = event.target.innerHTML;
            this.delegate.changeGameMode(gameMode.toLowerCase())
            $(gameModeSelector).text(gameMode).append('<span class="caret"></span>');
        }.bind(this))
    }
}