
@feeds.each do |feed|
  json.set! feed.id do
    json.extract! feed, :description, :title, :image_url, :url, :id
  end
end
