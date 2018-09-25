@packs = Pack.all.order(created_at: "ASC")


json.array! @packs do |pack|
  json.merge! pack.attributes.except("created_at", "updated_at")
end


