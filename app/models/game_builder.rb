# class GameBuilder
#   def initialize(user_id, params)
#     @params = params
#     @user_id = user_id
#   end

#   def create_game
#     game = build_game(@user_id, @params[:n], @params)
#     build_rounds(@params[:rounds]).each do |round|
#       game.rounds << round
#     end
#     game.save
#   end

#   private

#   def build_game(user_id, n, game_hash)
#     Game.new(user_id: @user_id, n: n, json_string: game_hash.to_s)
#   end

#   def build_rounds(rounds_arr)
#     new_rounds = []
#     rounds_arr.each do |round|
#       new_rounds << build_round(round)
#     end
#     new_rounds
#   end

#   def build_round(round)
#     Round.new(round_number: round[:roundNumber],
#               color_id: round[:colorId],
#               audio_id: round[:soundId],
#               position: round[:position],
#               color_correct: round[:colorGuess],
#               audio_correct: round[:soundGuess],
#               position_correct: round[:positionGuess])
#   end
# end