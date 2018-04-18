class SetupDefaults < ActiveRecord::Migration[5.1]
  def change
    #gear_item defaults
    change_column_default :gear_items, :weight_in_grams, 0
    change_column_default :gear_items, :display_weight, 0
    change_column_default :gear_items, :display_metric, "g"
    change_column_default :gear_items, :quantity, 1
    change_column_default :gear_items, :consumable, false
    change_column_default :gear_items, :favorite, false
    change_column_default :gear_items, :worn, false


    change_column_default :categories, :weight_in_grams, 0

    change_column_default :pack_lists, :display_metric, "kg"




  end
end
