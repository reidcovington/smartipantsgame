class GamesController < ApplicationController
  def play
  end

  def game_data
    render json: {colors: JSONFormatter.format(Color, :hexcode),
     sounds: JSONFormatter.format(Audio, :file_loc)}.to_json
  end

  def create
    puts "$"*50
    game_params.each do |key, value|
      puts "#{key} $$$===>>> #{value}"
    end
    # GameBuilder.create_game(session[:user_id], game_params[:game])
    redirect_to root_path
  end

  private

  def game_params
    params.permit!
  end

end
