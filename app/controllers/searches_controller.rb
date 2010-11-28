class SearchesController < ApplicationController
  def create
    @search = Search.new(params[:search])
    if @search.save
      redirect_to search_path(@search)
    else
      redirect_to root_path
    end
  end
  
  def show
    @advanced_search = Search.find(params[:id])
    @tracks = @advanced_search.tracks
  end
end
