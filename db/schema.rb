# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181003170731) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.bigint "pack_id"
    t.string "name", default: ""
    t.decimal "weight_in_grams", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pack_id"], name: "index_categories_on_pack_id"
  end

  create_table "gear_items", force: :cascade do |t|
    t.string "name", default: ""
    t.string "description", default: ""
    t.decimal "weight_in_grams", default: "0.0"
    t.string "display_metric", default: "g"
    t.integer "quantity", default: 1
    t.boolean "worn", default: false
    t.boolean "favorite", default: false
    t.boolean "consumable", default: false
    t.decimal "consumable_base_weight"
    t.string "picture"
    t.string "link"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "display_weight", default: "0.0"
    t.index ["category_id"], name: "index_gear_items_on_category_id"
  end

  create_table "packs", force: :cascade do |t|
    t.string "name", default: "New Pack"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "display_metric", default: "kg"
    t.decimal "weight_in_grams", default: "0.0"
  end

  add_foreign_key "categories", "packs"
  add_foreign_key "gear_items", "categories"
end
