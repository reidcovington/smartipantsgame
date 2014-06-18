describe("RoundModel", function() {
  describe("#initialize", function() {
    var round =  new RoundModel(1, {colors:  ["#FFFFFF"], sounds: ["/assets/1.mp3"], positions: [1]});
      it("creates a new RoundModel instance with the specified color attribute", function(){
        expect(round.color).toEqual("#FFFFFF");
      });

      it("creates a new RoundModel instance with the specified sound attribute", function(){
        expect(round.sound).toEqual("/assets/1.mp3");
      });

      it("creates a new RoundModel instance with the specified positional attribute", function(){
        expect(round.position).toEqual(1);
      });

      it("creates a new RoundModel instance with all 3 attributes", function(){
        expect(round.color).toEqual("#FFFFFF");
        expect(round.sound).toEqual("/assets/1.mp3");
        expect(round.position).toEqual(1);
      });

      it("creates a new RoundModel instance with random attributes", function(){
        var round =  new RoundModel(1, {colors: ["#FFFFFF", "#FFFFF0"], sounds: ["/assets/1.mp3", "/assets/2.mp3"], positions: [1, 2]})
        expect(round.color).toBeDefined();
        expect(round.sound).toBeDefined();
        expect(round.position).toBeDefined();
      });
  });

  describe("attribues", function() {
    it("acceptes position, color and sound attributes", function(){
       var round =  new RoundModel(1, {colors:  ["#FFFFFF"], sounds: ["/assets/1.mp3"], positions: [1]});
      expect(round.color).toEqual("#FFFFFF");
      expect(round.sound).toEqual("/assets/1.mp3");
      expect(round.position).toEqual(1);
    });

    it("acceptes a positional attribute without other attributes", function() {
    var round =  new RoundModel(1, {positions: [1]});
      expect(round.position).toEqual(1);
    });

    it("acceptes a color attribute without other attributes", function() {
    var round =  new RoundModel(1, {colors: ["#FFFFFF"]});
      expect(round.color).toEqual("#FFFFFF");
    });

    it("acceptes a sound attribute without other attributes", function() {
    var round =  new RoundModel(1, {sounds: ["/assets/1.mp3"]});
      expect(round.sound).toEqual("/assets/1.mp3");
    });

    it("acceptes an object with round attributes and randomly assigns all 3 attributes to the instance of the round object", function(){
      var round =  new RoundModel(1, {colors: ["#FFFFFF", "#FFFFF0"], sounds: ["/assets/1.mp3", "/assets/2.mp3"], positions: [1, 2]})
      expect(round.color).toBeDefined();
      expect(round.sound).toBeDefined();
      expect(round.position).toBeDefined();
    });
  });
});


