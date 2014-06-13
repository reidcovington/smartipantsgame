class Game < ActiveRecord::Base
  belongs_to :user
  has_many :rounds, inverse_of: :game

  validates :json_string, presence: true
  validates :n, presence: true
end
