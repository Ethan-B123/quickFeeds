Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api, defaults: { format: :json } do
    resource :session, only: %i(create destroy)
    resources :users, only: %i(show create update)
    resources :feeds, only: %i(show create index)
    resources :collections, only: %i(show create update destroy)
    resources :collection_feeds, only: %i(destroy create)
  end
  root to: "static_pages#root"
end
