Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api, defaults: { format: :json } do
    resource :session, only: %i(create destroy)
    resources :users, only: %i(show create update)
    resources :feeds, only: %i(show create index)
    resources :collections, only: %i(index show create update destroy)
    resources :collection_feeds, only: %i(create)
    resources :reads, only: %i(create index)
  end
  get 'api/collections/full/:id',
    to: 'api/collections#full',
    defaults: { format: :json }
  delete 'api/collection_feeds',
    to: 'api/collection_feeds#destroy',
    defaults: { format: :json }
  delete 'api/reads',
    to: 'api/reads#destroy',
    defaults: { format: :json }
  root to: "static_pages#root"
end
