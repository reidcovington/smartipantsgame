function GameOptionsController(){
    this.gameOptionsView = new GameOptionsView();
    this.nBackModel = new NBackModel();
    this.gameModeModel = new GameModeModel();
    this.gameOptionsView.listenForOptions();
}
GameOptionsController.prototype = {

}