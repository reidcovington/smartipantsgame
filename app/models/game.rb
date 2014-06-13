class Game < ActiveRecord::Base
  belongs_to :user
  has_many :rounds

  validates :json_string, presence: true
  validates :n, presence: true
end
