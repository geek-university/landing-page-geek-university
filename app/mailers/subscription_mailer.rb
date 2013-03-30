class SubscriptionMailer < ActionMailer::Base
  default from: 'geek.university.org@gmail.com'

  ADMIN_EMAIL = 'geek.university.org@gmail.com'

  def welcome_email(email)
    @url  = 'http://www.geek-university.org/'
    mail(to: email, subject: 'Geek University')
  end

  def new_user_email(email)
    mail(to: ADMIN_EMAIL, subject: "New user #{email}")
  end
end