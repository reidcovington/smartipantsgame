class GameBuilder
  def self.create_game(user_id, params)
    game = build_game(user_id, params[:n], params)
    build_rounds(params[:rounds]).each do |round|
      game.rounds << round
    end
    game.save
  end

  private

  def self.build_game(user_id, n, game_hash)
    Game.new(user_id: user_id, n: n, json_string: game_hash.to_s)
  end

  def self.build_rounds(rounds_arr)
    new_rounds = []
    rounds_arr.each do |round|
      new_rounds << build_round(round)
    end
    new_rounds
  end

  def self.build_round(round)
    Round.new(round_number: round[:roundNumber], color_id: round[:colorId], color_correct: round[:colorGuess], audio_id: round[:soundId], audio_correct: round[:soundGuess])
  end
end