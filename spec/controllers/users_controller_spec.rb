require 'spec_helper'

describe UsersController do
  
  context '#create' do

    describe 'valid info' do
      before :each do
        post :create, :user => {"username" => "test_user", "email" => "test@email.test", "password" => "test", "password_confirmation" => "test"}
      end

      it 'is a valid route' do
        expect(response.status).to eq 200
      end

      it 'adds a valid user to the database' do
        expect(assigns(:user)).to be_an_instance_of User
      end
    end

    describe 'invalid info' do
      before :each do
        post :create, :user => {"username" => "test_invalid_user", "email" => "test@invalidtest", "password" => "test", "password_confirmation" => "test"}
      end

      it 'sets an error message if the user is invalid' do
        expect(flash[:invalid_create]).to_not be_nil
      end
    end
  end

  context '#login' do
    it 'is a valid route' do
      expect(response.status).to eq 200
    end
  end

  context '#show' do
    it 'is a valid route' do
      expect(response.status).to eq 200
    end
  end

  context '#logout' do
    it 'is a valid route' do
      expect(response.status).to eq 200
    end
  end

  context '#update' do
    it 'is a valid route' do
      expect(response.status).to eq 200
    end
  end

  context '#destroy' do
    it 'is a valid route' do
      expect(response.status).to eq 200
    end
  end
end
