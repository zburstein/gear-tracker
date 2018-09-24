json.pack do
  json.merge! @pack.attributes.except("created_at", "updated_at")
end
json.categories do
  json.array! @pack.categories do |category|
    json.merge! category.attributes.except("created_at", "updated_at", "pack_id")
  end
end
json.gear_items do 
  json.array! @pack.gear_items do |gear_item|
    json.merge! gear_item.attributes.except("created_at", "updated_at")
  end
end