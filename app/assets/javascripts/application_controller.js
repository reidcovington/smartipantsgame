function ApplicationController(jQSelector){
    this.jQSelector = jQSelector;
    this.announcer = new Announcer(jQSelector, this);
    this.gameOptionsController = new GameOptionsController();
    this.fetchStatData()
};
ApplicationController.prototype = {
    buildGame: function(){
        var n = this.gameOptionsController.nBack;
        var gameMode = this.gameOptionsController.fetchGameMode();
        this.gameController = new GameController(n, gameMode, this.jQSelector, this);
    },
    announceResult: function(points, gameMode){
        var rounds;
        if (gameMode == 'single') {
            rounds = 20;
        } else if (gameMode == 'dual') {
            rounds = 40;
        } else if (gameMode == 'triple'){
            rounds = 60;
        };
        this.announcer.postResult(points, rounds);
    },
    fetchStatData: function(){
        $.get('/games/game_data').done(function(response){ gameData = response; });
        $.get('/users/data').done(function(response){ stats = response; });
    }
};