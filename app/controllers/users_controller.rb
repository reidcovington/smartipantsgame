class UsersController < ApplicationController
  def index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      true
    else
      flash[:error] = "Unable to create user."
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

  def data
    render json: {games: UserShowBrain.game_dates,
         total_correct: UserShowBrain.total_correct,
         audio_correct: UserShowBrain.audio_correct,
         color_correct: UserShowBrain.color_correct,
         last_game_color: UserShowBrain.color_correct[0],
         last_game_audio: UserShowBrain.audio_correct[0],
         colors_true: UserShowBrain.color_true,
         user_object: User.find(1)}.to_json
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
