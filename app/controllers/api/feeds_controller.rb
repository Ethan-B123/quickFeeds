class Api::FeedsController < ApplicationController
  def show
    @feed = Feed.find_by(id: params[:id])
    if @feed
      # get latest articles
      @feed.update_articles
      @articles = @feed.articles
      render :show
    else
      render json: ["unable to find feed with id provided"], status: 401
    end
  end

  def create
    @feed = Feed.make_with_url(params[:url])
    if @feed
      @articles = @feed.articles
      render :show
    else
      render json: ["unable to create feed with given url"], status: 422
    end
  end

  def index
    @feeds = Feed.all
  end
end
