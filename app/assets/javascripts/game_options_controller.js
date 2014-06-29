function GameOptionsController(){
    this.gameOptionsView = new GameOptionsView('.pagination ul li', '#game-mode', this);
    this.gameModeModel = new GameModeModel();
    this.gameOptionsView.listenForOptions();
    this.nBack = 1;
}
GameOptionsController.prototype = {
    newGameMode: function(gameMode){
        this.gameModeModel.updateGameMode(gameMode)
    },
    fetchGameMode: function(){
        return this.gameModeModel.assessGameMode();
    }
}