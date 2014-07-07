class PositionGraphBrain

  def self.position_true(player)
    @user = User.find(player)
    @last_game_id = @user.games.last.id
    
    @position_true_array =

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
      ).map! { |round| round = round[:rounds][:position] }


    p @position_true_array
    @position_true_array.each { |i| puts i }

    # @true_rounds = @game.rounds.where(position_correct: true)
    # @true_rounds.each do |round|
    #     @position_true_array << round.position
    #   end
    #   @position_true_array
    @position_hash = Hash.new(0)
    @position_true_array.each { | v | @position_hash.store(v, @position_hash[v]+1) }
    @position_hash
  end

end
