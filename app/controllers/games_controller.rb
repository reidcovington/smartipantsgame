class GamesController < ApplicationController
  def play
  end

  def game_data
    render json: {colors: JSONFormatter.format(Color, :hexcode),
     sounds: JSONFormatter.format(Audio, :file_loc)}.to_json
  end

  def create
    @game_builder = GameBuilder.new(session[:user_id], game_params)
    @game_builder.create_game
    redirect_to root_path
  end

  private

  def game_params
    params.permit!
  end

end
