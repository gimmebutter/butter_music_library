class AddKeywordsToSearches < ActiveRecord::Migration
  def self.up
    add_column :searches, :keywords, :string
  end

  def self.down
    remove_column :searches, :keywords
  end
end
