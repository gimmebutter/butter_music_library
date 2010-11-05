class TracksController < ApplicationController
  def index
    @tracks = Track.search(params[:search], params[:page] ||= 1)
    if request.xhr?
      render :partial => @tracks
    end
  end
end
