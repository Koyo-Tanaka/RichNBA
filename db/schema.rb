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

ActiveRecord::Schema.define(version: 2019_11_08_130915) do

  create_table "ecsites", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "siteurl"
    t.string "imageurl"
  end

  create_table "item_users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "item_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_item_users_on_item_id"
    t.index ["user_id"], name: "index_item_users_on_user_id"
  end

  create_table "items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "siteurl"
    t.string "imageurl"
    t.integer "price"
    t.integer "click", default: 0
    t.boolean "delete_flg", default: false
    t.bigint "player_id"
    t.bigint "team_id"
    t.bigint "ecsite_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ecsite_id"], name: "index_items_on_ecsite_id"
    t.index ["player_id"], name: "index_items_on_player_id"
    t.index ["team_id"], name: "index_items_on_team_id"
  end

  create_table "players", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "search_keyword"
    t.string "position"
    t.integer "age"
    t.bigint "salary"
    t.string "youtube_url"
    t.string "image_url"
    t.bigint "team_id"
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "teams", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "en_name"
    t.string "conference"
    t.integer "ranking"
    t.string "imageurl"
    t.string "youtube_url"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "provider"
    t.string "uid"
    t.boolean "popupmessage_flg", default: false
    t.bigint "team_id"
    t.bigint "player_id"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["player_id"], name: "index_users_on_player_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["team_id"], name: "index_users_on_team_id"
  end

  add_foreign_key "item_users", "items"
  add_foreign_key "item_users", "users"
  add_foreign_key "items", "ecsites"
  add_foreign_key "items", "players"
  add_foreign_key "items", "teams"
  add_foreign_key "players", "teams"
  add_foreign_key "users", "players"
  add_foreign_key "users", "teams"
end
