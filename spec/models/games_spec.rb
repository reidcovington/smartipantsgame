require 'spec_helper'

describe Game do
  let(:game) { Game.new(json_string: "test string for testing purpose", n: 2) }
  context "Game Building" do
    it "should build a valid game if there is a json string and an integer" do
      expect(game).to be_valid
    end
    it "should valid game increases total users by 1" do
      expect{game.save}.to change {Game.all.count}.by(1)
    end
    let(:game2) { Game.new(n: 2) }
      it "should not accept nil value for json_string, add validation" do
        expect{game2.save}.to change {Game.all.count}.by(0)
      end
    let(:game3) { Game.new(json_string: "test string for testing purpose")}
      it "should not accept nil value for n, add validation" do
        expect{game3.save}.to change {Game.all.count}.by(0)
    end
  end
 context "#add" do
    let(:user4) {User.new(email: "bobby@gmail.com", password: "pimpcity", password_confirmation: "pimpcity")};
    let(:game4) { Game.new(json_string: "test string for testing purpose", n: 2) }
    it "should add a question to a user" do
      user4.games << game4
      expect{user4.save}.to change {user4.games.count}.by(1)
    end
  end
end

