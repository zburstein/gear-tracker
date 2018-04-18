class ChangeNameOfMetricAllTables < ActiveRecord::Migration[5.1]
  def change
    rename_column :categories, :metric, :display_metric
    rename_column :gear_items, :metric, :display_metric

  end
end
