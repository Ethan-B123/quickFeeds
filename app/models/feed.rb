class Feed < ApplicationRecord
  validates :description, :title, presence: true
  validates :url, presence: true, uniqueness: true
  attr_accessor :response
  attr_accessor :articles

  def go(url) # 4 TESTING
    self.url = url
    if fetch_data
      populate_attributes
      build_articles
    end
  end

  def fetch_data(&prc)
    return nil if url.nil?
    begin
      xml = HTTParty.get(url).body
      feed = Feedjira::Feed.parse(xml)
      self.response = feed
      return self
    rescue
      puts "rescued"
      return nil
    end
  end

  def populate_attributes
    if fetch_data
      self.description = response.description ? response.description : ''
      self.title = response.title
      self
    else
      false
    end
  end

  def build_articles
    return nil if !response.entries
    return_entries = []
    response.entries.each do |entry|
      current = Article.new()
      current.populate_attributes(entry)
      return_entries << current
    end
    return_entries
  end

  private

  def find_alias(prop, item, *aliases)
    aliases.each do |ali|
      if item.respond_to? ali
        self.send((prop.to_s + "="), item.send(ali))
        return item.send(ali)
      end
    end
    false
  end

end
