$(document).ready( function() {
  new ApplicationController (new GameController(
    new GameModel(),
    new StartingView(),
    new RoundView(),
    new SoundView(),
    new ScoreView())
  ).initEvents();
})

var ApplicationController = function(gameController, gameModel, startingView, roundView,                                  soundView, scoreView){
  this.
}

ApplicationController.prototype = {
  this.GameController.GameModel.generateBoard

}

