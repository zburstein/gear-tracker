json.category do 
    json.merge! @category.attributes.except("created_at", "updated_at")
end
json.gear_item do 
  json.array! @category.gear_items do |gear_item|
    json.merge! gear_item.attributes.except("created_at", "updated_at")
  end
end