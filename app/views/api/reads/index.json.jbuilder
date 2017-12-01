@reads.includes(:articles)

json.array! @reads do |read|
  article = read.article
  json.extract!(article, :id, :title, :url, :image, :description, :feed_id, :publish_date)
end
