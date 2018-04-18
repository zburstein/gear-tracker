class AddDisplayWeightToGearItems < ActiveRecord::Migration[5.1]
  def change
    add_column :gear_items, :display_weight, :decimal
  end
end
