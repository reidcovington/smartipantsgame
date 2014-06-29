function GameOptionsView(nBackSelector, gameModeSelector, delegate){
    this.nBackSelector = nBackSelector;
    this.gameModeSelector = gameModeSelector;
    this.delegate = delegate;
}
GameOptionsView.prototype = {
    listenForOptions: function(){
        this._activateNBackPicker(this.nBackSelector);
        this._listenForGameModeDropdown(this.gameModeSelector);
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
    _listenForGameModeDropdown: function(dropdownSelector) {
        $(dropdownSelector).click(function(event) {
            event.preventDefault();
            this._listenForGameModeSelection(dropdownSelector);
        }.bind(this))
    },
    _listenForGameModeSelection: function(dropdownSelector){
        $(dropdownSelector + '-selection').click(function(event) {
            event.preventDefault();
            var gameMode = event.target.innerHTML;
            this.delegate.newGameMode(gameMode.toLowerCase())
            $(dropdownSelector).text(gameMode).append('<span class="caret"></span>');
        }.bind(this))
    }
}