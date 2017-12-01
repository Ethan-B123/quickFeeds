class Read < ApplicationRecord
  validates :user_id, :article_id, presence: true
  validates :article_id, uniqueness: { scope: :user_id,
    message: "user already has current read" }

  belongs_to :user
  belongs_to :article
end
