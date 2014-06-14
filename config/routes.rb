Rails.application.routes.draw do


  resources :users
  root to: 'games#play'

  post '/users/login', to: 'users#login'
  get '/users/logout', to: 'users#logout'

  resources :games, only: [ :create ]
  get '/games/play', to: 'games#play'

end
