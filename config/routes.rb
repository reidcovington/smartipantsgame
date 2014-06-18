Rails.application.routes.draw do


  root to: 'games#play'
  get '/users/data', to: 'users#data'
  get '/users/profile', to: 'users#profile'
  post '/users/login', to: 'users#login'
  get '/users/logout', to: 'users#logout'

  resources :users

  post '/games', to: 'games#create'
  get '/games/play', to: 'games#play'
  get '/games/game_data', to: 'games#game_data'

  resources :scores, only: [:get]
  get '/score', to: 'score#game'

end
