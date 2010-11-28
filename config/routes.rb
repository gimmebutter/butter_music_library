ActionController::Routing::Routes.draw do |map|
  map.namespace(:admin) do |admin|
    admin.root :controller => 'tracks'
    admin.resources :tracks, :collection => { :edit_multiple => :post, :update_multiple => :put, :delete_multiple => :delete }
    admin.resources :users
    admin.resources :searches
  end
  
  map.resource  :session, :controller => 'sessions', :only => [:new, :create, :destroy]
  
  map.sign_in '/sign_in', :controller => 'sessions', :action => 'new'
  map.sign_out '/sign_out', :controller => 'sessions', :action => 'destroy'
  
  map.resources :tracks
  map.resources :searches, :only => [:create, :show]
  
  map.formatted_tracks 'tracks.:format', :controller => 'tracks', :action => 'index'
  
  map.root :controller => 'tracks'

  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
