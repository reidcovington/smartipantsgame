

describe("GameModel", function() {

  describe("Game Model initialization", function() {

    it("should be initialized with an n-back number and roundAttributes as arguments", function() {

      var gameModel = new GameModel(2, { color: ['blue', 'green', 'orange'] })

      expect(gameModel.n).toBeDefined();
      expect(gameModel.roundAttributes).toBeDefined();
      expect(gameModel).toBeDefined();
    })

    it("should have a rounds property which is an array", function() {

      var gameModel = new GameModel(2, { color: ['blue', 'green', 'orange'] })
      gameModel.rounds.push('test')

      expect(gameModel.rounds[gameModel.rounds.length - 1]).toEqual('test')
    })
  })

  describe("GameModel methods", function() {
    describe("#makeRounds", function() {
      it('should initialize with a make rounds method', function() {
        var gameModel = new GameModel(2, { color: ['blue', 'green', 'orange'] })
        expect(gameModel.makeRounds).toBeDefined()
      })

      it("should create round objects and push them into gameModel.rounds", function() {
        var gameModel = new GameModel(2, { colors: ['blue', 'green', 'red'] })

        gameModel.rounds = []
        gameModel.makeRounds()
        expect(gameModel.rounds.length).toEqual(22);
      })

    describe('#scoreGuess', function() {
      it('should set attributeGuess to true if user indicates a match correctly', function() {
        var gameModel = new GameModel(2, { colors: ['blue', 'blue', 'blue', 'blue'] })
        gameModel.scoreGuess('color', 3)
        expect(gameModel.rounds[3]['colorGuess']).toEqual(true)
      })

      it('should not set attributeGuess if user guesses incorrectly', function() {
        var gameModel = new GameModel(2, { colors: [] })
        gameModel.rounds[0].color = 'blue'
        gameModel.rounds[2].color = 'red'
        gameModel.scoreGuess('color', 2)
        expect(gameModel.rounds[2]['colorGuess']).toBeUndefined();
      })
    })

    describe('#scoreNonGuess', function() {
      it('should set attributeGuess to true if user correctly gives no input', function() {
        var gameModel = new GameModel(2, { colors: [] })

        gameModel.rounds[0].color = 'blue'
        gameModel.rounds[2].color = 'red'

        gameModel.scoreNonGuess('color', 2)

        expect(gameModel.rounds[2].colorGuess).toEqual(true)
      })

      it('should not set attributeGuess to true if user INcorrectly gives no input', function() {
        var gameModel = new GameModel(2, { colors: [] })

        gameModel.rounds[0].color = 'blue'
        gameModel.rounds[2].color = 'blue'

        gameModel.scoreNonGuess('color', 2)

        expect(gameModel.rounds[2].colorGuess).toBeUndefined();
      })
    })
    })
  })
})
