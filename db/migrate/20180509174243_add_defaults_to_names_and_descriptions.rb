class AddDefaultsToNamesAndDescriptions < ActiveRecord::Migration[5.1]
  def change
    change_column :categories, :name, :string, default: ""

    change_column :gear_items, :name, :string, default: ""
    change_column :gear_items, :description, :string, default: ""

    change_column :packs, :name, :string, default: ""


  end
end
