describe("RoundModel", function() {

  it("should test that JASMINE is running", function() {
    var player = "player";
    expect(typeof player).toBe("string");
  });


  describe("#initialize", function() {
    var round =  new RoundModel( {colors: ["Magenta"], sounds: ["chewbacca growl"]});
      it("creates a new RoundModel instance with the specified color attribute", function(){
        expect(round.color).toEqual("Magenta");
      });

      it("creates a new RoundModel instance with the specified sound attribute", function(){
        expect(round.sound).toEqual("chewbacca growl");
      });

      it("creates a new RoundModel instance with all 4 attributes", function(){
        expect(round.color).toEqual("Magenta");
        expect(round.sound).toEqual("chewbacca growl");
        //
        //
      });

      it("creates a new RoundModel instance with random attributes", function(){
        var round =  new RoundModel( {colors: ["Magenta", "Teal"], sounds: ["chewbacca growl", "rhinoceros roar"]})
        expect(round.color).toBeDefined();
        expect(round.sound).toBeDefined();
      });
  });

  describe("attribues", function() {
    it("acceptes color and sound attributes", function(){
      var round =  new RoundModel( {colors: ["Magenta"], sounds: ["chewbacca growl"]})
      expect(round.color).toEqual("Magenta");
      expect(round.sound).toEqual("chewbacca growl");
    });

    it("acceptes a color attribute without a sound attribute", function() {
    var round =  new RoundModel( {colors: ["Magenta"]});
      expect(round.color).toEqual("Magenta");
    });

    it("acceptes a sound attribute without a color attribute", function() {
    var round =  new RoundModel( {sounds: ["chewbacca growl"]});
      expect(round.sound).toEqual("chewbacca growl");
    });

    it("acceptes a positional attribute", function() {
    var round =  new RoundModel( {positions: ["center"]});
      expect(round.position).toEqual("center");
    });

    it("acceptes an image attribute", function() {
    var round =  new RoundModel( {images: ["puppy"]});
      expect(round.image).toEqual("puppy");
    });

    it("acceptes all 4 attributes", function(){
      var round =  new RoundModel( {colors: ["Magenta"], sounds: ["chewbacca growl"]})
      expect(round.color).toEqual("Magenta");
      expect(round.sound).toEqual("chewbacca growl");
      //
      //
    });
  });
});


