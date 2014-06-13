class GameBuilder
  def self.create_game(game_hash)
    game = build_game(game_hash[:n], game_hash)
    build_rounds(game_hash[:rounds]).each do |round|
      game.rounds << round
    end
    game.save
  end

  private

  def self.build_game(n, game_hash)
    User.find(1).games.build(n: n, json_string: game_hash.to_s)
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