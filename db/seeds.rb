# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

colors = [
  '#9B111E',
  '#EB8921',
  '#004225',
  '#4099FF'
]

colors.each do |color|
  Color.create(hexcode: color)
end

audios = [
  '/assets/1.mp3',
  '/assets/2.mp3',
  '/assets/3.mp3',
  '/assets/4.mp3'
]

audios.each do |audio|
  Audio.create(file_loc: audio)
end
