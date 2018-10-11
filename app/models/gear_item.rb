class GearItem < ApplicationRecord
  belongs_to :category
  has_one :pack, through: :category
  delegate :user, :to => :pack, :allow_nil => true


  after_save  :update_category_weight, if: :overall_weight_changed?
  after_destroy -> {self.category.update_weight(-self.weight_in_grams * self.quantity) if self.weight_in_grams != 0}

  validates :category, presence: true
  validates :weight_in_grams, presence: true
  validates :quantity, presence: true
  validates :weight_in_grams, :numericality => { :greater_than_or_equal_to => 0 }


  def +(other)
    self.weight_in_grams + other.weight_in_grams
  end

  private
  def overall_weight_changed?
    saved_change_to_weight_in_grams? || saved_change_to_quantity?    
  end

  def update_category_weight
    old_weight = self.weight_in_grams_before_last_save * self.quantity_before_last_save 
    new_weight = self.weight_in_grams * self.quantity
    diff = new_weight - old_weight
    self.category.update_weight(diff)
  end
end
