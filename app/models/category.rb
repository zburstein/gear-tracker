class Category < ApplicationRecord
  belongs_to :pack
  has_many :gear_items, -> {order(created_at: :asc)}, dependent: :delete_all

  after_destroy -> {self.pack.update_weight(-self.weight_in_grams)}

  validates :pack, presence: true
  validates :weight_in_grams, presence: true

  after_create :create_gear_item

  def create_gear_item
    GearItem.create(category: self)
  end


  def update_weight(diff = nil)
    self.weight_in_grams += diff
    self.save!
    self.pack.update_weight(diff)
  end


end
