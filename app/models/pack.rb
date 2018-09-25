class Pack < ApplicationRecord
  has_many :categories, -> {order(created_at: :asc)}, dependent: :destroy
  has_many :gear_items, through: :categories, dependent: :destroy

  validates :weight_in_grams, presence: true
  validates :display_metric, presence: true

  after_create :create_category

  def create_category
    Category.create(pack: self)
  end

  def update_weight(diff)
    self.weight_in_grams += diff
    self.save!
  end
end
