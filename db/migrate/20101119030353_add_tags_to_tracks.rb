class AddTagsToTracks < ActiveRecord::Migration
  def self.up
    add_column :tracks, :tags, :text
  end

  def self.down
    remove_column :tracks, :tags
  end
end
