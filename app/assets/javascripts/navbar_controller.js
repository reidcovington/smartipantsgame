function NavbarController(){
    this.sessionView = new SessionView();
    this.infoView = new InfoView();
    this.navbarListener = new NavbarListener();
}
NavbarController.prototype = {
    askForSessionInfo: function(selector){
        if (selector === 'signup'){
            this.sessionView.drawSignupForm();
        } else {
            this.sessionView.drawLoginForm();
        }
    },
    produceGameInfo: function(selector){
        if (selector === 'instructions'){
            this.infoView.drawInstructions();
        } else {
            this.infoView.drawAboutPage();
        }
    }
}