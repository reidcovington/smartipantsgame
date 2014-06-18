describe("GameController", function() {
  describe("#initialize", function() {
    var applicationController = new ApplicationController
    var gameController =  new GameController( 2, "dual", '#game-section', applicationController);
      it("creates a new GameController instance", function(){
        expect(gameController).toBeDefined();
      });

      it("creates a new GameController with the set number of rounds and game mode", function(){
        expect(gameController.n).toEqual(2);
        expect(gameController.fetchGameStructure).toBeDefined();
      });

      it("when a new GameController is instantiated it creates a new intance of GameModel", function(){
        expect(gameController.gameModel).toBeDefined();
      });

      it("when a new GameController is instantiated it creates a new intance of GameModel, which has n + 20 number of rounds", function(){
        expect(gameController.gameModel.rounds.length).toEqual(22);
      });

      it("when a new GameController is instantiated it creates a new intance of GameModel, which has rounds with gameMode prescribed attributes", function(){
        expect(gameController.gameModel.rounds[0].color).toBeDefined();
        expect(gameController.gameModel.rounds[0].sound).toBeDefined();
      });

       it("when a new GameController is instantiated it creates a new intance of RoundView", function(){
        expect(gameController.roundView).toBeDefined();
      });

  });

  describe("#initiateGame", function() {
    var applicationController = new ApplicationController
    var gameController =  new GameController( 2, "dual", '#game-section', applicationController);
    it("calls #constructRound method, which applies RoundView first round data (color, sounds etc)", function(){
      expect(gameController.roundView.constructRound).toBeDefined();
    });

    it("starts #setInterval timer that cycles through rounds", function(){
      expect(gameController.initiateGame).toBeDefined();
      // should access #setInterval...
    });

  })

  describe("#evalGuess", function() {
    var applicationController = new ApplicationController
    var gameController =  new GameController( 2, "dual", '#game-section', applicationController);
    gameController.currentRound = gameController.gameModel.rounds[3]
    it('if "q" is pressed, calls #scoreGuess method and evals for color match', function(){
      expect(gameController.gameModel.scoreGuess("color", gameController.currentRound )).toBeDefined();
    });
  });

    it("acceptes color and sound attributes", function(){
      var round =  new RoundModel( {colors: ["Magenta"], sounds: ["chewbacca growl"]})
      expect(round.color).toEqual("Magenta");
      expect(round.sound).toEqual("chewbacca growl");
    });
});




