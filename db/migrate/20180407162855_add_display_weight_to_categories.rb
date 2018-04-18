class AddDisplayWeightToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :display_weight, :decimal
  end
end
