class Subscription < ActiveRecord::Base
  attr_accessible :email
  validates :email, format: {with: /^.+@.+$/, message: 'Не очень-то похоже на email'}
end