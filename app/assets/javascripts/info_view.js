function InfoView(){};

InfoView.prototype = {
    drawInstructions: function(){
        $('#instructions-pane').show();
    },
    drawAboutPage: function(){
        $('#about-modal').show();
    }
}