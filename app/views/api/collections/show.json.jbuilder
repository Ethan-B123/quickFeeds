json.extract! @collection, :id, :name
json.set! :feeds, @feeds.pluck(:id)
