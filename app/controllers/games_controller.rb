class GamesController < ApplicationController
  def play
    # Landing page/game page
  end 

  def create
    # Post route for saving game data 

    # puts "[LOG] parameters: #{params.inspect}"

    if GameBuilder.create_game(game_params)
      redirect_to root_path
    else
      "no bueno"
    end
  end


  private
  def game_params
    params.permit!          #(:n, :rounds)#.permit( (1..25).to_a.map!{|num| num.to_sym} )
  end
end

