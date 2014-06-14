require 'spec_helper'

describe UsersController do
  context '#create' do
    it 'is a valid route' do
      post :create
      expect(response.status).to eq 200
    end
    it 'adds a valid user to the database' do
      post :create, :user => {"username" => "test_user", "email" => "test@email.test", "password" => "test", "password_digest" => "test"}
      # expect(assigns(:user)).to be_an_instance_of User
    end
    it 'does not add an invalid user to the database' do
      post :create, :user => {"username" => "test_invalid_user", "email" => "test@invalidtest", "password" => "test", "password_digest" => "test"}
      expect(assigns(:user)).to be_nil
    end
    it 'sets an error message if the user is invalid' do
      post :create, :user => {"username" => "test_invalid_user", "email" => "@", "password" => "test", "password_digest" => "test"}
      expect(session[:last_error]).to_not be_nil
    end
  end

  context '#login' do
    it 'is a valid route'
  end

  context '#show' do
    it 'is a valid route'
  end

  context '#logout' do
    it 'is a valid route'
  end

  context '#update' do
    it 'is a valid route'
  end

  context '#destroy' do
    it 'is a valid route'
  end
end
