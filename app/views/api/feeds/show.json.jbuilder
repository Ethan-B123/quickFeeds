json.set! :feed do
  json.extract! @feed, :id, :title, :description, :image_url
end
json.set! :articles do
  @articles.each do |article|
    json.set! article.id do
      json.extract! article, :id, :title, :url, :image, :description, :feed_id, :publish_date
    end
  end
end
json.set! :feedArticles do
  json.set! @feed.id, @articles.map { |article| article.id }
end
