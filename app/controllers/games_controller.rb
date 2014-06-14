class GamesController < ApplicationController
  def play
    # Landing page/game page
    { colors: JSONFormatter.format(Color.all), audio: JSONFormatter.format(Audio.all) }.to_json
  end 

  def create
    GameBuilder.create_game(game_params)
    redirect_to root_path
  end

  private

  def game_params
    params.permit!
  end

end