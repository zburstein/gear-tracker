class AddWeightInGramsToPackLists < ActiveRecord::Migration[5.1]
  def change
    add_column :pack_lists, :weight_in_grams, :decimal, default: 0
  end
end
