class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    if @user
      session[:session_token] = @user.session_token
      render "api/users/show"
    else
      render json: ["Invalid username or password"], status: 404
    end
  end

  def destroy
    if current_user
      current_user.reset_session_token
      session[:session_token] = nil
      render json: {}
    else
      render json: ["Nobody signed in"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
