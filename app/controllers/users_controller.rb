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

  def login
    @user = User.find_and_auth(user_params[:email], user_params[:password])
    if @user
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:login_error] = "Unable to log in."
      redirect_to root_path
    end
  end

  def show
  end

  def logout
    session.clear
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end