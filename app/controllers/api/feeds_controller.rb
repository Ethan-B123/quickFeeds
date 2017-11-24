class Api::FeedsController < ApplicationController
  def show
    @feed = Feed.find_by(id: params[:id])
    if @feed
      @articles = @feed.articles
      render :show
    else
      render json: ["unable to find feed with id provided"]
    end
  end

  def create
    @feed = Feed.make_with_url(params[:url])
    if @feed
      render :show
    else
      render json: ["unable to create feed with given url"]
    end
  end

  def index
    @feeds = Feed.all
  end
end
