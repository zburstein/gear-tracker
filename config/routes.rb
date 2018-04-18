Rails.application.routes.draw do

  resources :gear_items
  resources :categories
  resources :pack_lists

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
