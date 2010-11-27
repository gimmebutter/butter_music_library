class Composer < ActiveRecord::Base
  def self.create_from_track(track)
    unless Composer.exists?(["name=?", track.composer])
      Composer.create({ :name => track.composer })
    end
  end
end
