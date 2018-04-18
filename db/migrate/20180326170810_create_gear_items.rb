class CreateGearItems < ActiveRecord::Migration[5.1]
  def change
    create_table :gear_items do |t|
      t.string :name
      t.string :description
      t.decimal :weight
      t.string :metric
      t.integer :quantity
      t.boolean :worn
      t.boolean :favorite
      t.boolean :consumable
      t.decimal :consumable_base_weight
      t.string :picture
      t.string :link
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
