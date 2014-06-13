Rails.application.routes.draw do


  resources :users
  root to: 'users#index'

  resources :games, only: [ :show, :create ]
  
end
