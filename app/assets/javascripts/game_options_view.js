function GameOptionsView(nBackSelector, gameModeSelector, delegate){
    this.nBackSelector = nBackSelector;
    this.dropdownSelector = gameModeSelector;
    this.delegate = delegate;
}
GameOptionsView.prototype = {
    listenForOptions: function(){
        this._listenForNBack();
        this._listenForGameModeDropdown();
    },
    _listenForNBack: function() {
        var self = this;
        $(this.nBackSelector).click(function(event) {
            event.preventDefault();
            self.delegate.setNBack(parseInt(this.textContent));
        })
    },
    updateNBackPicker: function(nBack){
        $(this.nBackSelector).removeClass('active');
        $(this.nBackSelector + "#" + nBack).addClass('active');
    },
    _listenForGameModeDropdown: function() {
        $(this.dropdownSelector).click(function(event){
            event.preventDefault();
            this._listenForGameModeSelection();
        }.bind(this))
    },
    _listenForGameModeSelection: function(){
        $(this.dropdownSelector + '-selection').click(function(event) {
            event.preventDefault();
            var gameMode = event.target.innerHTML;
            this.delegate.newGameMode(gameMode);
        }.bind(this))
    },
    updateGameModeDropdown: function(gameMode){
        $(this.dropdownSelector).text(gameMode).append('<span class="caret"></span>');
    }
}