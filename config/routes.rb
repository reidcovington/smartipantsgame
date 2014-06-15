Rails.application.routes.draw do


  resources :users
  root to: 'games#play'

  post '/users/login', to: 'users#login'
  get '/users/logout', to: 'users#logout'
  get '/user/:id', to: 'user#show'

  resources :games, only: [ :create ]
  get '/games/play', to: 'games#play'
  get '/games/game_data', to: 'games#game_data'

  resources :scores, only: [:get]
  get '/score', to: 'score#game'


end
