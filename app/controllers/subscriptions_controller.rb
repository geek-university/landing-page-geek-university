# encoding: utf-8

class SubscriptionsController < ApplicationController
  MESSAGE = 'Спасибо! Мы сообщим вам об открытии университета, отправив письмо на почту %s! Не хотите ли поделиться новостью с кем-нибудь ещё?'

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
          render json: (MESSAGE % email).to_json, status: :ok
        }
        format.html {
          flash[:notice] = MESSAGE % email
          redirect_to :root
        }
      end
    else
      render :new
    end
  end
end