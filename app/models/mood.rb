class Mood < ActiveRecord::Base
  def self.create_from_track(track)
    unless track.album.blank?
      unless Mood.exists?(["name=?", track.album])
        Mood.create({ :name => track.album })
      end
    end
  end
end
