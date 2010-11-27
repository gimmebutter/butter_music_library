class Admin::SearchesController < ApplicationController
  before_filter :admin_only
  
  def index
    @searches = Search.paginate(:all, :page => params[:page], :per_page => 15)
  end

  def show
    @search = Search.find(params[:id])
  end

end
