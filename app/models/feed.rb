class Feed < ApplicationRecord
  validates :description, :title, presence: true
  validates :url, presence: true, uniqueness: true
  attr_accessor :response

  has_many :articles

  # on new: if url in database
    # return that one
  # else
    # if fetch_data (aka vaild rss url)
      # save it
    # else
      # return nil / throw error
    # end
  # end

  def self.make_with_url(url)
    if exists = Feed.find_by(url: url)
      return exists
    else
      newFeed = Feed.new({ url: url })
      if newFeed.fetch_data
        # newFeed.save
        return newFeed
      end
    end
    false
  end

  def fetch_data(&prc)
    return nil if url.nil?
    begin
      xml = HTTParty.get(url).body
      feed = Feedjira::Feed.parse(xml)
      self.response = feed
      populate_attributes
      save!
      return_entries = build_articles

      return Article.create(return_entries)
    rescue
      # use most recent articles from feed
      puts "rescued"
      return nil
    end
  end

  def populate_attributes
    if response
      find_alias(:title, response, "title")
      find_alias(:description, response, "description")
      find_alias(:image_url, response, "image_url")
      self
    else
      false
    end
  end

  def ensure_id
    id || save
  end

  def build_articles
    return nil if !response.entries
    return nil if !ensure_id
    return_entries = []
    response.entries.each do |entry|
      current = Article.new()
      current.populate_attributes(entry)
      current.feed_id = id

      # single hit on databse
      return_entries << current.attributes # get attr hash
      return_entries[-1].delete("id") # remove extra keys
      return_entries[-1].delete("created_at") # remove extra keys
      return_entries[-1].delete("updated_at") # remove extra keys
    end
    # create many articles with single hit on db
    return_entries
  end

  def thread_fetch
    return nil if url.nil?
    begin
      xml = HTTParty.get(url).body
      feed = Feedjira::Feed.parse(xml)
      self.response = feed
      # how to return from thread?
      # what does .join look for?
      return build_articles
    rescue
      # use most recent articles from feed
      return nil
    end
  end

  private

  def find_alias(prop, rss_item, *aliases)
    aliases.each do |ali|
      if rss_item.respond_to?(ali) && !rss_item.send(ali).nil?
        self.send((prop.to_s + "="), rss_item.send(ali))
        return rss_item.send(ali)
      end
    end
    self.send((prop.to_s + "="), "No #{prop} data available")
    false
  end

end
