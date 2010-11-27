class Search < ActiveRecord::Base
  
  def tracks
    @tracks ||= find_tracks
  end
  
  def particulars
    "#{self.genre} #{self.mood} #{self.composer}"
  end
  
  private
  
  def find_tracks
    Track.find(:all, :conditions => conditions)
  end
  
  def genre_conditions
    ["tracks.genre LIKE ?", "%#{genre}%"] unless genre.blank?
  end
  
  def mood_conditions
    ["tracks.album LIKE ?", "%#{mood}%"] unless mood.blank?
  end
  
  def composer_conditions
    ["tracks.composer LIKE ?", "%#{composer}%"] unless composer.blank?
  end
  
  def conditions
    [conditions_clauses.join(' AND '), *conditions_options]
  end

  def conditions_clauses
    conditions_parts.map { |condition| condition.first }
  end

  def conditions_options
    conditions_parts.map { |condition| condition[1..-1] }.flatten
  end

  def conditions_parts
    private_methods(false).grep(/_conditions$/).map { |m| send(m) }.compact
  end
end
