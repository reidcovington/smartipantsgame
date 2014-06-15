class GamesController < ApplicationController
  def play
    {colors: JSONFormatter.format(Color, :hexcode),
     audio: JSONFormatter.format(Audio, :file_loc)}.to_json
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