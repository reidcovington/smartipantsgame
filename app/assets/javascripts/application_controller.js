function ApplicationController(jQSelector){
    this.jQSelector = jQSelector;
    this.gameView = new GameView(jQSelector, this);
    this.gameOptionsController = new GameOptionsController();
    this.fetchStatData()
};
ApplicationController.prototype = {
    buildGame: function(){
        var n = this.gameOptionsController.nBack;
        var gameMode = this.gameOptionsController.fetchGameMode();
        this.gameView.drawGameBoard();
        this.gameController = new GameController(n, gameMode, this.jQSelector, this);
    },
    announceResult: function(points, gameMode){
        var rounds;
        if (gameMode === 'Single') {
            rounds = 20;
        } else if (gameMode === 'Dual') {
            rounds = 40;
        } else if (gameMode === 'Triple'){
            rounds = 60;
        };
        this.gameView.postResult(points, rounds);
    },
    fetchStatData: function(){
        $.get('/games/game_data').done(function(response){ gameData = response; });
        $.get('/users/data').done(function(response){ stats = response; });
    }
};