json.set! :feeds, {}
json.set! :feeds do
  @feeds.each do |feed|
    json.set! feed.id do
      json.extract! feed, :description, :title, :image_url, :url, :id
    end
  end
end
json.set! :articles, {}
json.set! :articles do
  @articles.each do |article|
    json.set! article.id do
      json.extract! article, :id, :title, :url, :image, :description, :feed_id, :publish_date
    end
  end
end
json.set! :feedArticles, {}
json.set! :feedArticles do
  @feeds.each do |feed|
    json.set! feed.id, feed.articles.map { |article| article.id }
  end
end
