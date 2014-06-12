class Round < ActiveRecord::Base
  belongs_to :game
  belongs_to :color
  belongs_to :audio
end
