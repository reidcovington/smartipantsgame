FactoryGirl.define do
  factory :user do
    id 100
    username 'Testy the Tester'
    email 'test@test.com'
    password 'test'
    password_confirmation 'test'
  end
end