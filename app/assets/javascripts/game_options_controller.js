function GameOptionsController(){
    this.gameOptionsView = new GameOptionsView('.pagination ul li', '#game-mode', this);
    this.gameModeModel = new GameModeModel();
    this.gameOptionsView.listenForOptions();
    this.nBack;
}
GameOptionsController.prototype = {

}