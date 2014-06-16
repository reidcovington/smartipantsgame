Rails.application.routes.draw do


  resources :users
  root to: 'games#play'

  post '/users/login', to: 'users#login'

  post '/users/logout', to: 'users#logout'

  get '/users/:id', to: 'user#show'
  get '/users/stats', to: 'users#stats'

  post '/games', to: 'games#create', defaults: { format: 'json' }

  get '/games/play', to: 'games#play'
  get '/games/game_data', to: 'games#game_data'

  resources :scores, only: [:get]
  get '/score', to: 'score#game'


end
