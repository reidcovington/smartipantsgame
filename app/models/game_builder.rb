class GameBuilder
  def self.create_game(user_id, params)
    puts params
    puts "#"*50
    game = build_game(user_id, params["game"]["n"], params["game"])
    build_rounds(params[:game][:rounds]).each do |round|
      game.rounds << round
    end
    game.save
  end

  private

  def self.build_game(user_id, n, game_hash)
    Game.new(user_id: user_id, n: n, json_string: game_hash.to_s)
  end

  def self.build_rounds(rounds_hash)
    new_rounds = []
    rounds_hash.each do |round_num, round_data|
      round_data[:round_number] = round_num
      new_rounds << build_round(round_data)
    end
    new_rounds
  end

  def self.build_round(round_data)
    Round.new(round_data)
  end
end