class AudioGraphBrain
  def self.user(player)
    @user = player
  end

  def self.audio_true(player)
    @user = User.find(player)
    @game = @user.games.last

    @audio_true_array = 
      Game.collection.aggregate(
        {
          "$match" => { "_id" => @last_game_id } 
        },
          
        { 
          "$unwind" => "$rounds"
        },

        { 
          "$match" => { 'rounds.positionGuess' => true }
        },

        {
          "$project" => { 'rounds.position' => 1, '_id' => 0 }
        }
      ).map! { |round| round = round[:rounds][:audio] }

    # @true_rounds.each do |round|
    #     @audio_true_array << round.audio_id
    #   end

     @audio_hash = Hash.new(0)
     @audio_true_array.each { | v | @audio_hash.store(v, @audio_hash[v]+1) }
     @audio_hash
  end

end
