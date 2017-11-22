class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if !@user.save
      render json: @user.errors.full_messages, status: 422
    else
      render :show
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update_attributes
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
