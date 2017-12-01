@reads.includes(:articles)
article_ids = []

json.set! :objects do
  json.array! @reads do |read|
    article = read.article
    article_ids << article.id
    json.extract!(article, :id, :title, :url, :image, :description, :feed_id, :publish_date)
  end
end

json.set! :keys, article_ids
