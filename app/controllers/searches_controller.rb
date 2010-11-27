class SearchesController < ApplicationController
  def create
    @search = Search.new(params[:search])
    if @search.save
      redirect_to search_path(@search)
    else
      redirect_to root_path
    end
  end
end
