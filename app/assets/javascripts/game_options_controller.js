function GameOptionsController(){
    this.gameOptionsView = new GameOptionsView('.pagination ul li', '#game-mode', this);
    this.gameModeModel = new GameModeModel();
    this.nBack = 1;
    this.gameOptionsView.listenForOptions();
}
GameOptionsController.prototype = {
    newGameMode: function(gameMode){
        this.gameModeModel.updateGameMode(gameMode);
        this.gameOptionsView.updateGameModeDropdown(gameMode);
    },
    fetchGameMode: function(){
        return this.gameModeModel.assessGameMode();
    },
    setNBack: function(nBack){
        this.nBack = nBack;
        this.gameOptionsView.updateNBackPicker(nBack);
    }
}