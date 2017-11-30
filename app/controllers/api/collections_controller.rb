class Api::CollectionsController < ApplicationController
  def index
    if current_user
      render :index
    else
      render json: ["no user logged in"], status: 401
    end
  end

  def show
    if @collection = Collection.find_by(id: params[:id])
      @feeds = @collection.feeds
      render :show
    else
      render json: ["unable to find collection by id"], status: 401
    end
  end

  def create
    @collection = Collection.new(collection_params)
    @collection.user_id = current_user && current_user.id
    if @collection.save
      @feeds = @collection.feeds
      render :show
    else
      render json: @collection.errors.full_messages, status: 422
    end
  end

  def update
    if @collection = Collection.find_by(id: params[:id]) &&
      @collection.user_id == (current_user && current_user.id) &&
      @collection.update_attributes(collection_params)
      @feeds = @collection.feeds
      render :show
    else
      err = @collection ?
        @collection.errors.full_messages : ["collection not found"]
      render json: err, status: 422
    end
  end

  def destroy
    if @collection = Collection.find_by(id: params[:id])
      render :index
    else
      render json: ["unable to find collection by id"], status: 401
    end
  end

  def full
    @collection = Collection.find_by(id: params[:id])
    # binding.pry
    if @collection.user_id === (current_user && current_user.id)
      @feeds = @collection.feeds
      hash_articles = []
      # TODO: create threads for fetching articles
      @feeds.each { |feed| feed.update_articles }

      # Article.create(hash_articles)
      # !collection feedArticles feeds articles

      @feeds.includes(:articles)
      @articles = []
      @feeds.each { |feed| @articles += feed.articles }
      render :full
    else
      render json: ["unable to find collection by id"], status: 401
    end
  end

  private

  def collection_params
    params.require(:collection).permit(:name)
  end

end
