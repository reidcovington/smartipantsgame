require 'spec_helper'

describe GamesController do
  context 'games#play' do
    it 'sends the sound file locations'
    it 'sends the color information'
    it 'renders a page'
  end

  context 'games#create' do
    it 'receives json data'
    it 'calls #create_game'
    it 'doesn\'t redirect to any page'
  end
end