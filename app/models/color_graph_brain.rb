 class ColorGraphBrain

  def self.color_true(player)
    @user = User.find(player)
    @game = @user.games.last.id
    @color_true_array = []
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
      ).map! { |round| round = round[:rounds][:colorId] }


    # @true_rounds.each do |round|
    #     @color_true_array << round.color_id
    #   end
    #   @color_true_array
    @color_hash = Hash.new(0)
    @color_true_array.each { | v | @color_hash.store(v, @color_hash[v]+1) }
    @color_hash
  end

end
