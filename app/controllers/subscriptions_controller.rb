# encoding: utf-8

class SubscriptionsController < ApplicationController
  MESSAGE = 'На указанную почту отправлено письмо'

  def new
    @subscription = Subscription.new
  end

  def create
    @subscription = Subscription.new(params[:subscription])
    if @subscription.save
      email = @subscription.email
      SubscriptionMailer.welcome_email(email).deliver
      SubscriptionMailer.new_user_email(email).deliver
      respond_to do |format|
        format.json {
          render json: MESSAGE.to_json, status: :ok
        }
        format.html {
          flash[:notice] = MESSAGE
          redirect_to :root
        }
      end
    else
      respond_to do |format|
        format.json {
          render json: {errors: @subscription.errors}, status: 422
        }
        format.html {
          render :new
        }
      end
    end
  end
end