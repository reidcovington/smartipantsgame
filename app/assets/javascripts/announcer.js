function Announcer(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
    this.nBackNumberSelector = ".pagination";
    this.gameModeSelector = '#game-mode'
    this.postIntro();
};
Announcer.prototype = {

    postIntro: function(){
        $("#graph_container").hide();
        // $(this.jQSelector).append("Hello")
        this._listenForNbackNumber(this.nBackNumberSelector);
        this._listenForGameMode(this.gameModeSelector);
        this._listenForClick(this.jQSelector, this.nBackNumberSelector, this.gameModeSelector);
    },
    _listenForNbackNumber: function(nBackNumberSelector) {
        var nBackNumberElement = ' li';
        var activeNBack = this.nBackNumberSelector + ' .active';
        $(nBackNumberSelector + nBackNumberElement).click(function(event) {
            event.preventDefault();
            $(activeNBack).removeClass('active')
            this.className = 'active'
        })
    },
    _listenForGameMode: function(gameModeSelector) {
        var self = this
        $(gameModeSelector).click(function(event) {
            event.preventDefault();

            self._listenForGameModeSelection(gameModeSelector);

        })
    },
    _listenForGameModeSelection: function(gameModeSelector){
        $(gameModeSelector + '-selection').click(function(event) {
            event.preventDefault();
            $(gameModeSelector).text(event.target.innerHTML).append('<span class="caret"></span>');
        })
    },
    _listenForClick: function(jQSelector, nBackNumberSelector, gameModeSelector){
        var activeNBack = this.nBackNumberSelector + ' .active';
        $(document).on('click', "#start-button", function(event){
            event.preventDefault();
            $(this.jQSelector).empty().append('<tr><td class="1"></td><td class="2"></td></tr><tr><td class="3"></td><td class="4"></td></tr>');
            if ($(gameModeSelector).text().toLowerCase() == 'game mode') {
                alert("Please select a Game Mode!");
            } else {
                $("#start-button").hide();
                this.delegate.buildGame(parseInt( $(activeNBack).attr('id' )), $(gameModeSelector).text().toLowerCase())
            };
        }.bind(this))
    },
    postResult: function(points, gameMode){
        var rounds;
        if (gameMode == 'single') {
            rounds = 20;
        } else if (gameMode == 'dual') {
            rounds = 40;
        } else if (gameMode == 'triple'){
            rounds = 60;
        };
        $(this.jQSelector).empty().append('<p>You scored '+points+' out of ' + rounds + ' possible points!</p><br><p> See full results <a hre="#">below</a><br><br>OR<br><br><button id="start-button" class="btn btn-hg btn-primary">Play Again!</button>');
        // $( "#start-button" ).css("pointer-events", "auto");
         // $( "#start-button").bind( "click" );
        $('#graph_container').show();
    }
};