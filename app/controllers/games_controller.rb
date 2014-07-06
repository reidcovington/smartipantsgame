class GamesController < ApplicationController
  def play
  end

  def game_data
    color_formatter = JSONFormatter.new(Color, :hexcode)
    audio_formatter = JSONFormatter.new(Audio, :file_loc)
    render json: {colors: color_formatter.format,
     sounds: audio_formatter.format}.to_json
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