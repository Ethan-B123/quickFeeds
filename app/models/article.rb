class Article < ApplicationRecord
  validates :title, :image, :description, :publish_date, presence: true
  validates :url, uniqueness: true

  belongs_to :feed

  def self.sort_and_delete(feed_articles, limit = 100)
    # sorts feed_articles by age & keeps the youngest 100
    # TODO: don't delete if in saves table
    if feed_articles.length > limit
      article_arr = feed_articles.to_a
      article_arr.sort! do |article1, article2|
        article2.publish_date <=> article1.publish_date
      end
      # single hit on db
      Article.where(feed_id: feed_articles.first.feed_id)
        .where("publish_date < ?", article_arr[limit].publish_date)
        .delete_all
    end
  end

  def populate_attributes(rss_entry)
    find_alias(:title, rss_entry, "title")
    find_alias(:url, rss_entry, "url")
    find_alias(:description, rss_entry, "description", "summary")
    find_alias(:image, rss_entry, "image", "image_url", "enclosure_url")
    find_alias(:publish_date, rss_entry, "publish_date", "published")
    self.description = description.html_safe
    self
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
