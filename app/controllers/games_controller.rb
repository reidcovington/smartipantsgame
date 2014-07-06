class GamesController < ApplicationController
  def play
  end

  def game_data

    hexcodes = Color.all.pluck(:hexcode)
    sounds = Audio.all.pluck(:file)

    render json: {colors: hexcodes, sounds: sounds}
  end

  def create
    # @game_builder = GameBuilder.new(session[:user_id], game_params)
    # @game_builder.create_game

    @game = Game.new(game_params)
    @game.user_id = session[:user_id]
    @game.save

    redirect_to root_path
  end

  private

  def game_params
    params.permit!
  end
end