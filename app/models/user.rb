class User
  include Mongoid::Document
  include ActiveModel::SecurePassword

  field :password_digest, :type => String
  field :username
  field :email

  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :password, presence: true
  
  has_many :games

  has_secure_password

  def self.find_and_auth email, password
    user = User.find_by(email: email)
    user && user.authenticate(password) ? user : nil
  end
end