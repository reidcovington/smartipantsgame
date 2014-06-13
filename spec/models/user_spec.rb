require 'spec_helper'

describe User do
  let(:user) { User.new(email: "adsfasdf@gmail.com", password: "bewf", password_confirmation: "bewf") }
  context "validations" do
    it "should have email and password" do
      expect(user).to be_valid
    end
    it "should increase total users by 1" do
      expect{user.save}.to change {User.all.count}.by(1)
    end
    let(:user2) { User.new(email: "asdaf@gmail.com", password: "", password_confirmation: "b") }
      it "should have password" do
        expect{user2.save}.to change {User.all.count}.by(0)
      end
    let(:user3) { User.new(email: "a", password: "sdfsdf", password_confirmation: "sdfsdf") }
      it "should only accept valid email" do
        expect{user3.save}.to change {User.all.count}.by(0)
      end
  end

  context "instances" do
    it "should be a User object" do
      expect(user).to be_an_instance_of(User)
    end
  end
end

