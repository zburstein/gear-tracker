class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.references :pack_list, foreign_key: true
      t.string :name
      t.decimal :weight
      t.string :metric

      t.timestamps
    end
  end
end
