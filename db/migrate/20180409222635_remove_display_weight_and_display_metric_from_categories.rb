class RemoveDisplayWeightAndDisplayMetricFromCategories < ActiveRecord::Migration[5.1]
  def change
    remove_column :categories, :display_weight, :string
    remove_column :categories, :display_metric, :string
  end
end
