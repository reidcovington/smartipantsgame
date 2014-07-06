class GamesController < ApplicationController
  def play
  end

  def game_data
    # color_formatter = JSONFormatter.new(Color, :hexcode)
    # audio_formatter = JSONFormatter.new(Audio, :file_loc)

    hexcodes = Color.all.pluck(:hexcode)
    
    render json: {colors: hexcodes}
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