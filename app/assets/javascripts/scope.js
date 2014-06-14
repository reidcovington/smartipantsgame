var AppController = function(controllers) {
  this.controllers = controllers;
}

AppController.prototype.initEvents = function() {
  var self =this;
  for (var i = 0; i < self.controllers.length; i++) {
    self.controllers[i].initEvents();
  }
}
