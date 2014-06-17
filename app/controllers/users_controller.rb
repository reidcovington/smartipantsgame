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
  @color_correct = UserShowBrain.color_correct(session[:user_id])
  @audio_correct = UserShowBrain.audio_correct(session[:user_id])
  @total_correct = UserShowBrain.total_correct
  @games = UserShowBrain.game_dates(session[:user_id])
  @username = User.find(session[:user_id]).username
end

  def data
    render json: {games: UserShowBrain.game_dates(session[:user_id]),
         total_correct: UserShowBrain.total_correct,
         audio_correct: UserShowBrain.audio_correct(session[:user_id]),
         color_correct: UserShowBrain.color_correct(session[:user_id]),
         last_game_color: UserShowBrain.color_correct(session[:user_id]).last,
         last_game_audio: UserShowBrain.audio_correct(session[:user_id]).last,
         colors_true: UserShowBrain.color_true(session[:user_id]),
         audios_true: UserShowBrain.audio_true(session[:user_id]),
         n: UserShowBrain.n(session[:user_id]),
         colors_false: UserShowBrain.color_false(session[:user_id]),
         audios_false: UserShowBrain.audios_false(session[:user_id]),
         user_object: User.find(session[:user_id])}.to_json
  end
# def statistics
#
# end

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
