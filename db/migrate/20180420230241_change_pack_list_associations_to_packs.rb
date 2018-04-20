class ChangePackListAssociationsToPacks < ActiveRecord::Migration[5.1]
  def change
    rename_column :categories, :pack_list_id, :pack_id
  end
end
