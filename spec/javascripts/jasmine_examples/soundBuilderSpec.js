describe('SoundBuilder', function(){
    it('responds to buildSounds', function(){
        soundBuilder = new SoundBuilder;
        expect(soundBuilder.buildSounds).toBeDefined();
    });
    it('responds to _buildSound', function(){
        soundBuilder = new SoundBuilder;
        expect(soundBuilder._buildSound).toBeDefined();
    });
});