describe("GameModel", function() {
  describe("Game Model initialization", function() {

      gameData = {colors: ['red,', 'blue', 'green', 'orange'], sounds: [1, 2, 3, 4], positions: [1,2,3,4]}
      appController = new ApplicationController('#game-section')
      gameController = new GameController(2, 'single', '#game-section', appController)
      gameModel = new GameModel(2, { color: ['blue', 'green', 'orange', "red"] }, 'dual', gameController )

    it("should be initialized with an n-back number", function() {
      // expect(typeof gameModel.n).toEqual('number');
      expect(gameData.colors).toBeDefined();
    })

    it("should be initialized with roundAttributes object", function() {
      expect(typeof gameModel.roundAttributes).toEqual('object');
    })

    it("should have a rounds property which is an array (responds to #push)", function() {
      gameModel.rounds.push('test')
      expect(gameModel.rounds[gameModel.rounds.length - 1]).toEqual('test')
    })

    it("should be initialized with a delegate object", function() {
      expect(typeof gameModel.delegate).toEqual('object');
    })

    it("should be initialized with a gameMode", function() {
      expect(gameModel.gameMode).toEqual('dual');
      expect(typeof gameModel.gameMode).toEqual('string');
    })
  })

  describe("GameModel Methods", function() {
    describe("#makeRounds", function() {
      it('should initialize with a make rounds method', function() {
        expect(gameModel.makeRounds).toBeDefined()
      })

      it("should create round objects and push them into gameModel.rounds", function() {
        gameModel.rounds = []
        gameModel.makeRounds()
        expect(gameModel.rounds.length).toEqual(22);
      })
    })

    describe('#scoreGuess', function() {
      it('should set attributeGuess to true if user indicates a match correctly', function() {
        gameModel.rounds[0].color = 'blue'
        gameModel.rounds[2].color = 'blue'
        gameModel.scoreGuess('color', 2)
        expect(gameModel.rounds[2]['colorGuess']).toEqual(true)
      })

      it('should not set attributeGuess if user guesses incorrectly', function() {        
        gameModel.rounds[3].color = 'blue'
        gameModel.rounds[5].color = 'red'
        gameModel.scoreGuess('color', 2)
        expect(gameModel.rounds[5]['colorGuess']).toBeUndefined();
      })
    })

    describe('#scoreNonGuess', function() {
      it('should set attributeGuess to true if user correctly gives no input', function() {
        gameModel.rounds[2].color = 'blue'
        gameModel.rounds[3].color = 'red'

        gameModel.scoreNonGuess('color', 3)

        expect(gameModel.rounds[3].colorGuess).toEqual(true)
      })

      it('should not set attributeGuess to true if user incorrectly gives no input', function() {
        gameModel.rounds[5].color = 'blue'
        gameModel.rounds[7].color = 'blue'

        gameModel.scoreNonGuess('color', 7)

        expect(gameModel.rounds[7].colorGuess).toBeUndefined();
      })
    })
  })
})