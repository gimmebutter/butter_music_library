class TracksController < ApplicationController
  def index
    @tracks = Track.search(params[:search], params[:page] ||= 1)
    if request.xhr?
      render :partial => @tracks
    end
  end
  
  def download
    @track = Track.find(params[:id])
    data = Track.get_track_for_download(@track)
    send_data data, :filename => "#{@track.title}.mp3", :content_type => "audio/mpeg"
  end
end
