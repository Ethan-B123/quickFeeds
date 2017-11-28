current_user.collections.each do |collection|
  feeds = collection.feeds
  json.set! collection.id do
    json.extract! collection, :id, :name
    json.set! :feeds, feeds.pluck(:id)
  end
end
