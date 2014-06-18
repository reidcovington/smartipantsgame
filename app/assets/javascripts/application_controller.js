function ApplicationController(jQSelector){
    this.jQSelector = jQSelector;
    this.announcer = new Announcer(jQSelector, this);
    this.gameController = null;
    this.fetchStatData()
};
ApplicationController.prototype = {
    buildGame: function(n, gameMode){
        // this.announcer.prepareButtons()
        this.gameController = new GameController(n, gameMode, this.jQSelector, this);
    },
    announceResult: function(points, gameMode){
        this.announcer.postResult(points, gameMode);
    },
    fetchStatData: function(){
        $.get('/games/game_data').done(function(response){ gameData = response; });
        $.get('/users/data').done(function(response){ stats = response; });
    }
};