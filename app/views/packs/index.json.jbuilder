@packs = Pack.all.order(created_at: "ASC")


json.array! @packs do |pack|
  json.id pack.id
  json.name pack.name
end


