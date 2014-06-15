class UsersController < ApplicationController
  def index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      true
    else
      flash[:invalid_create] = "Unable to create user."
    end
  end

def show
  @color_correct = UserShowBrain.color_correct
  @audio_correct = UserShowBrain.audio_correct
  @total_correct = UserShowBrain.total_correct
  @games = UserShowBrain.game_dates
  # show_info = {games: "mneow"}.to_json
  # show_info
end

# def stats
# {games: "mneow"}.to_json
# end

  def login
     @user = User.find_by_username(params[:username])
      if @user
        if @user.password == params[:password]
          session[:user_id] = @user.id
          erb :userpage
        else
          redirect ('/users/index')
        end
      else
        redirect_to root_path
      end
  end

  def logout
    session.clear
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
