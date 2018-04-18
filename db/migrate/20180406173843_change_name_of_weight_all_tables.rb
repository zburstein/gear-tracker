class ChangeNameOfWeightAllTables < ActiveRecord::Migration[5.1]
  def change
    rename_column :categories, :weight, :weight_in_grams
    rename_column :gear_items, :weight, :weight_in_grams
  end
end
