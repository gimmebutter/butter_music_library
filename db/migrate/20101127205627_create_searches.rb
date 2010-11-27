class CreateSearches < ActiveRecord::Migration
  def self.up
    create_table :searches do |t|
      t.string :genre
      t.string :mood
      t.string :composer

      t.timestamps
    end
  end

  def self.down
    drop_table :searches
  end
end
