class Article < ApplicationRecord
  validates :feed_id, :title, :image, :description, :publish_date, presence: true
  validates :url, uniqueness: true

  def populate_attributes(rss_entry)
    props = %w(url title image description publish_date)
    find_alias(:title, rss_entry, "title")
    find_alias(:url, rss_entry, "url")
    find_alias(:description, rss_entry, "description", "summary")
    find_alias(:image, rss_entry, "image", "image_url", "enclosure_url")
    find_alias(:publish_date, rss_entry, "publish_date", "published")
    self.description = description.html_safe
  end

  private

  def find_alias(prop, item, *aliases)
    aliases.each do |ali|
      if item.respond_to? ali
        self.send((prop.to_s + "="), item.send(ali))
        return item.send(ali)
      end
    end
    self.send((prop.to_s + "="), item)
    false
  end
end
