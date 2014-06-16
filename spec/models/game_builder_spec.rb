require 'spec_helper'


valid_game = {
  n: 2,
  rounds: {
    "1" => {
        color_id: 1,
        audio_id: 1,
        color_correct: true,
        audio_correct: false
    },
    "3" => {
        color_id: 2,
        audio_id: 3,
        color_correct: false,
        audio_correct: false
    },
    "2" => {
        color_id: 4,
        audio_id: 2,
        color_correct: true,
        audio_correct: true
    },
    "4" => {
        color_id: 1,
        audio_id: 1,
        color_correct: true,
        audio_correct: false
    }
  }
}

invalid_game = {
  n: nil,
  rounds: {
    "1" => {
        color_id: 1,
        audio_id: 1,
        color_correct: true,
        audio_correct: false
    }
  }
}


describe GameBuilder do


  # context 'on #create_game' do
  #   let(:user) { User.create(username: "woof", email: "dog@bark.com", password: "bone", password_confirmation: "bone") }
  #   it 'saves a valid game to the database' do
  #     puts valid_game.inspect
  #     expect(GameBuilder.create_game(user.id ,valid_game)).to eq true
  #   end
  #   it 'doesn\'t save an invalid game' do
  #     expect(GameBuilder.create_game(user.id, invalid_game)).to eq false
  #   end
  # end

end

User.destroy_all