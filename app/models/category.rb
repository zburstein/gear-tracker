class Category < ApplicationRecord
  belongs_to :pack_list
  has_many :gear_items, -> {order(created_at: :asc)}, dependent: :delete_all

  after_destroy -> {self.pack_list.update_weight(-self.weight_in_grams)}

  validates :pack_list, presence: true
  validates :weight_in_grams, presence: true


  def update_weight(diff = nil)
    self.weight_in_grams += diff
    self.save!
    self.pack_list.update_weight(diff)

    #self.gear_items.inject(0){|sum, gear| sum + gear.weight_in_grams}
  end


end
