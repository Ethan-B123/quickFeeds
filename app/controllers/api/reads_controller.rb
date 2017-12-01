class Api::ReadsController < ApplicationController
  def index
    @reads = current_user.reads
  end

  def create
    @read = Read.new(read_params)
    @read.user_id = current_user.id
    if @read.save
      @reads = current_user.reads
      render :index
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  def destroy
    @read = Read.find_by(read_params)
    if @read && @read.user_id == current_user.id
      @read.destroy
      @reads = current_user.reads
      render :index
    else
      render json: ["read not found"]
    end
  end

  private

  def read_params
    params.require(:read).permit(:article_id)
  end
end
