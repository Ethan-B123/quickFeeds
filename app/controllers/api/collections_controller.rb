class Api::CollectionsController < ApplicationController
  def show
    if @collection = Collection.find_by(id: params[:id])
      @feeds = @collection.feeds
    else
      render json: ["unable to find collection by id"], status: 401
    end
  end

  def create
    @collection = Collection.new(collection_params)
    @collection.user_id = current_user && current_user.id
    if @collection.save
      render :show
    else
      render json: @collection.errors.full_messages, status: 422
    end
  end

  def update
    if @collection = Collection.find_by(id: params[:id]) &&
      @collection.user_id == (current_user && current_user.id) &&
      @collection.update_attributes(collection_params)
      render :show
    else
      err = @collection ?
        @collection.errors.full_messages || ["collection not found"]
      render json: err, status: 422
    end
  end

  def destroy
    if @collection = Collection.find_by(id: params[:id])
      render json: ["unable to return show Collection with dependents"]
    else
      render json: ["unable to find collection by id"], status: 401
    end
  end

  private

  def collection_params
    params.require(:collection).permit(:name)
  end

end
