class GameBuilder
  def self.create_game(game_params)
    puts "[LOG] permitted params: #{game_params.inspect}"
    game = build_game(game_hash["n"], game_hash)
    game.rounds << build_rounds(game_hash["rounds"])
    game.save
  end

  private

  def self.build_game(n, game_hash)
    User.find(1).games.build(n: n, json_string: game_hash)
  end

  def self.build_rounds(rounds_hash)
    new_rounds = []
    rounds_hash.each do |round_num, round_data|
      round_data[:round_number] = round_num.to_i
      new_rounds << build_round(round_data)
    end
    new_rounds
  end

  def self.build_round(round_data)
    Round.new(round_data)
  end


end