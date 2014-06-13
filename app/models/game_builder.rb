class GameBuilder
  def create_game(game_json)
    game_hash = JSON.parse(game_json)
    game = build_game(game_hash[:n], game_json)
    game.rounds << build_rounds(game_hash[:rounds])
    game.save
  end

  private

  def build_game(n, game_json)
    User.find(session[:user_id]).games.build(n: n, json_string: game_json)
  end

  def build_rounds(rounds_hash)
    new_rounds = []
    rounds_hash.each do |round_num, round_data|
      round_data[:round_number] = round_num.to_i
      new_rounds << build_round(round_data)
    end
    new_rounds
  end

  def build_round(round_data)
    Round.build(round_data)
  end
end