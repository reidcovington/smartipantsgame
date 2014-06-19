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

def profile
  if session[:user_id]
    @color_correct = SplineGraphBrain.color_correct(session[:user_id])
    @audio_correct = SplineGraphBrain.audio_correct(session[:user_id])
    @position_correct = SplineGraphBrain.position_correct(session[:user_id])
    @total_correct = SplineGraphBrain.total_correct(session[:user_id])
    @games = SplineGraphBrain.game_dates(session[:user_id])
    @username = User.find(session[:user_id]).username
  else
    redirect_to root_path
  end
end

  def data
    render json: {games: SplineGraphBrain.game_dates(session[:user_id]),
         total_correct: SplineGraphBrain.total_correct(session[:user_id]),
         position_correct: SplineGraphBrain.position_correct(session[:user_id]),
         audio_correct: SplineGraphBrain.audio_correct(session[:user_id]),
         color_correct: SplineGraphBrain.color_correct(session[:user_id]),
         n: SplineGraphBrain.n(session[:user_id]),
         positions_true: PositionGraphBrain.position_true(session[:user_id]),
         colors_true: ColorGraphBrain.color_true(session[:user_id]),
         audios_true: AudioGraphBrain.audio_true(session[:user_id]),
         user_object: User.find(session[:user_id])}.to_json
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
    puts "[LOG] session[:user_id] = #{session[:user_id]}"
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
