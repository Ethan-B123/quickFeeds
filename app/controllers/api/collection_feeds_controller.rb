class Api::CollectionFeedsController < ApplicationController
  def create
    @collection_feed = CollectionFeed.new(collection_params)
    if @collection_feed.save
      @collection = @collection_feed.collection
      @feeds = @collection.feeds
      render "api/collections/show"
    else
      render json: @collection_feed.errors.full_messages, status: 422
    end
  end

  def destroy
    if @collection_feed = CollectionFeed.find_by(collection_params)
      @collection_feed = @collection_feed.destroy
      @collection = @collection_feed.collection
      @feeds = @collection.feeds
      render "api/collections/show"
    else
      render json: ["unable to find collection_feed by id"], status: 401
    end
  end

  private

  def collection_params
    params.require(:collection_feed).permit(:feed_id, :collection_id)
  end
end
