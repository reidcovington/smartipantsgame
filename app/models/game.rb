class Game
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  belongs_to :user
  has_many :rounds, inverse_of: :game

  validates :json_string, presence: true
  validates :n, presence: true
end