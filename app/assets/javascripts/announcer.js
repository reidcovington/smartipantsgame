function Announcer(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
    this.nSelector = '.pagination';
    this.gameModeSelector = '#game-mode'
    this.postIntro();
};
Announcer.prototype = {

    postIntro: function(){
        $("#graph_container").hide();
        // $(this.jQSelector).append("Hello")
        this._listenForNbackNumber();
        this._listenForGameMode(this.gameModeSelector);
        this._listenForStartClick(this.jQSelector, this.gameModeSelector);
    },
    _listenForNbackNumber: function() {
        $('.pagination ul li').click(function(event) {
            event.preventDefault();
            $('.pagination ul li').removeClass('active');
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
    _listenForStartClick: function(jQSelector, gameModeSelector){
        var activeNBack = this.nSelector + ' .active';
        $(document).on('click', "#start-button", function(event){
            event.preventDefault();
            $(this.jQSelector).empty().append('<tr><td class="1"></td><td class="2"></td></tr><tr><td class="3"></td><td class="4"></td></tr>');
            $("#start-button").hide();
            $("#cue-buttons").append("<tr><td><button id='position-button' class='btn btn-inverse'>Position (Q)</button></td><td><button id='sound-button' class='btn btn-inverse'>Sound (W)</button></td><td ><button id='color-button' class='btn btn-inverse'>Color (E)</button></td></tr>")
            this.delegate.buildGame(parseInt( $(activeNBack).attr('id' )), $(gameModeSelector).text().toLowerCase())
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
        $('#cue-buttons').empty()
        $(this.jQSelector).empty().append('<p>You scored '+points+' out of ' + rounds + ' possible points!</p><br><p> See full results <a hre="#">below</a><br><br>OR<br><br><button id="start-button" class="btn btn-hg btn-primary">Play Again!</button>');
        $('#graph_container').show();
    },
};