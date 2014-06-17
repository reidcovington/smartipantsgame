Rails.application.routes.draw do


  root to: 'games#play'
  get '/users/data', to: 'users#data'

  post '/users/login', to: 'users#login'
  get '/users/logout', to: 'users#logout'
  get '/users/stats', to: 'users#stats'
  # get '/users/statistics', to: 'users#statistics'


  # get '/users/:id', to: 'user#show'
  resources :users

  post '/games', to: 'games#create', defaults: { format: 'json' }

  get '/games/play', to: 'games#play'
  get '/games/game_data', to: 'games#game_data'
  get '/games/statistics', to: 'games#statistics'

  resources :scores, only: [:get]
  get '/score', to: 'score#game'


end
