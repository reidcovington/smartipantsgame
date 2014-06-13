class User < ActiveRecord::Base
  has_secure_password
  
  has_many :games

  validates :email, format: { with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+\z/ }, presence: true
end
