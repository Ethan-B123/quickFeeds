Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api, defaults: { format: :json } do
    resource :session, only: %i(create destroy)
    resources :users, only: %i(show create update)
    resources :feeds, only: %i(show create index)
    resources :collections, only: %i(index show create update destroy)
    resources :collection_feeds, only: %i(create)
  end
  delete 'api/collection_feeds',
    to: 'api/collection_feeds#destroy',
    defaults: { format: :json }
  root to: "static_pages#root"
end
