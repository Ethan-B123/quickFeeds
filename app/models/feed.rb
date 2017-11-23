class Feed < ApplicationRecord
  validates :url, :description, :title, presence: true

end
