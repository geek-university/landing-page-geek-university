LandingPageGeekUniversity::Application.routes.draw do
  resources :subscriptions, only: %w(create)
  root :to => 'subscriptions#new'
end