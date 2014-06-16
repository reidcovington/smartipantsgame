class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:error] = "Unable to create user."
      redirect_to root_path
    end
  end

def show
  p @color_correct = UserShowBrain.color_correct
  p @audio_correct = UserShowBrain.audio_correct
  p @total_correct = UserShowBrain.total_correct
  @games = UserShowBrain.game_dates
end

def stats
  format.json { render json: { ok: true } }
end

  def login
    @user = User.find_and_auth(user_params[:email], user_params[:password])
    if @user
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:error] = "Unable to log in."
      redirect_to root_path
    end
  end

  def logout
    session.clear
    redirect_to root_path
  end

  def update
    @user = User.find(session[:user_id])
    @user.update_attributes(user_params)
    flash[:error] = "Unable to update your info." unless @user.save
    redirect_to root_path
  end

  def destroy
    @user = User.find(session[:user_id])
    @user.update_attributes(user_params)
    @user.save(validate: false)
    session.clear
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
