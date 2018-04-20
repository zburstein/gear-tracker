class ChangeNameOfPackListsToPacks < ActiveRecord::Migration[5.1]
  def change
    rename_table :pack_lists, :packs
  end
end
