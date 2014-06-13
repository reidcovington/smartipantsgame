Rails.application.routes.draw do


  resources :users
  root to: 'games#play'

  resources :games, only: [ :create ]
  get '/games/play', to: 'games#play'

end
