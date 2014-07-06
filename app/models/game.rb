class Game
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  belongs_to :user
  field :created_at
  validates :n, presence: true
  
  # has_many :rounds, inverse_of: :game
  # validates :json_string, presence: true
end