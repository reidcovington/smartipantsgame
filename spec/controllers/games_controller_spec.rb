require 'spec_helper'

describe GamesController do
  context 'games#play' do
    it 'is a valid route' do
      get :play
      expect(response.status).to eq 200
    end
  end

  context 'games#game_data' do
    it 'is a valid route' do
      get :game_data
      expect(response.status).to eq 200
    end

    it 'responds with sound file locations and color information' do
      get :game_data, :format => :json
      expect(response.body).to eq "{\"colors\":{\"1\":\"#32ED3C\",\"2\":\"#B75FFF\",\"3\":\"#ed2d14\",\"4\":\"#fff51b\"},\"sounds\":{\"1\":\"/assets/1.mp3\",\"2\":\"/assets/2.mp3\",\"3\":\"/assets/3.mp3\",\"4\":\"/assets/4.mp3\"}}"
    end
  end

  context 'games#create' do
    before :each do
      post :create, 'n' => 2,'rounds' => [{'roundNumber' => 1,'colorId' => 1,'audioId' => 1,'position' => 1,'colorGuess' => true,'audioGuess' => false,'positionGuess' => true}]
    end
    it 'is a valid route' do
      expect(response.status).to eq 302
    end

    it 'creates an instance of game_builder' do
      expect(assigns(:game_builder)).to be_an_instance_of GameBuilder
    end

    it 'redirects to the main page' do
      expect(response).to redirect_to root_path
    end
  end
end