function Announcer(jQSelector, delegate){
    this.delegate = delegate;
    this.jQSelector = jQSelector;
    this.gameModeSelector = '#game-mode'
    this.postIntro();
};
Announcer.prototype = {

    postIntro: function(){
        this._activateNBackPicker();
        this._activateGameModeDropdown(this.gameModeSelector);
        this._waitForStartBtnClick(this.jQSelector, this.gameModeSelector);
    },
    _activateNBackPicker: function() {
        $('.pagination ul li').click(function(event) {
            event.preventDefault();
            $('.pagination ul li').removeClass('active');
            this.className = 'active'
        })
    },
    _activateGameModeDropdown: function(gameModeSelector) {
        $(gameModeSelector).click(function(event) {
            event.preventDefault();
            this._updateGameModeSelection(gameModeSelector);

        }.bind(this))
    },
    _updateGameModeSelection: function(gameModeSelector){
        $(gameModeSelector + '-selection').click(function(event) {
            event.preventDefault();
            $(gameModeSelector).text(event.target.innerHTML).append('<span class="caret"></span>');
        })
    },
    _waitForStartBtnClick: function(jQSelector, gameModeSelector){
        $(document).on('click', "#start-button", function(event){
            event.preventDefault();
            var nBack = parseInt($('.pagination .active').attr('id'));
            var gameMode = $('#game-mode').text().toLowerCase();
            this._drawGameBoard();
            this._drawCueButtons(gameMode);
            this.delegate.buildGame(nBack, gameMode)
        }.bind(this))
    },
    _drawGameBoard: function(){
        $("#start-button").hide();
        $(this.jQSelector).empty().append('<tr><td class="1"></td><td class="2"></td></tr><tr><td class="3"></td><td class="4"></td></tr>');
    },
    postResult: function(points, rounds){
        $('#cue-buttons td button').slideUp(150);
        $(this.jQSelector).empty().append('<tr><td><center><p id="points-total">You scored '+points+' out of ' + rounds + ' possible points.</p><button id="start-button" class="btn btn-hg btn-primary">Play Again!</button></center></td></tr>');
    },
    _drawCueButtons: function(gameMode){
        $('#position-button').slideDown(150);
        if(gameMode === 'dual' || gameMode === 'triple'){
            $('#sound-button').slideDown(150);
        };
        if(gameMode === 'triple'){
            $('#color-button').slideDown(150);
        };
    },
};