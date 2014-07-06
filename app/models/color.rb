class Color
  include Mongoid::Document

  field :hexcode
  validates :hexcode, presence: true

  has_many :rounds
end
