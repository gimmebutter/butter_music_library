class TracksController < ApplicationController
  def index
    @tracks = Track.search(params[:search], params[:page] ||= 1)
  end
end
