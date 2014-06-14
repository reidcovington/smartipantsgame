class UsersController < ApplicationController
def index
end

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

def show
  p UserShowBrain.meow
end

def logout
  session.clear
end

end
