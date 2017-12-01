# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Article.destroy_all
CollectionFeed.destroy_all
Collection.destroy_all
Feed.destroy_all
Read.destroy_all
User.destroy_all

user = User.create({username: "demo-user", password: "password"})
feedUrls = [
  "https://www.nasa.gov/rss/dyn/image_of_the_day.rss",
  "http://feeds.nature.com/nature/rss/current",
  "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "http://hosted.ap.org/lineups/USHEADS-rss_2.0.xml?SITE=SCAND&SECTION=HOME",
  "https://www.npr.org/rss/rss.php?id=1001",
  "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int#",
  "https://www.ed.gov/feed",
  "https://www.nasa.gov/rss/dyn/breaking_news.rss",
  "http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "http://feeds.bbci.co.uk/news/technology/rss.xml",
  "http://www.pbs.org/wgbh/nova/rss/nova.xml"
]

feeds = []

feedUrls.each do |url|
  feed = Feed.make_with_url(url)
  if feed
    feed.save
    feeds << feed
  end
end

collection = Collection.create({name: "Science", user_id: user.id})
CollectionFeed.create({collection_id: collection.id, feed_id: feeds[0].id})
CollectionFeed.create({collection_id: collection.id, feed_id: feeds[7].id})
CollectionFeed.create({collection_id: collection.id, feed_id: feeds[8].id})
