class Genre < ActiveRecord::Base
  def self.create_from_track(track)
    unless Genre.exists?(["name=?", track.genre])
      Genre.create({ :name => track.genre })
    end
  end
end
