class Audio
	include Mongoid::Document

 	field :file
	validates :file, presence: true

  has_many :rounds
end
