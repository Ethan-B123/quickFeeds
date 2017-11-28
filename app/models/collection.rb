class Collection < ApplicationRecord
  validates :user_id, :name, presence: true
  has_many :collection_feeds, dependent: :destroy
  has_many :feeds,
    through: :collection_feeds,
    source: :feed
  belongs_to :user
end
