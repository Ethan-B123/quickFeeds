class CreateFeeds < ActiveRecord::Migration[5.1]
  def change
    create_table :feeds do |t|
      t.string :url, null: false
      t.string :description, null: false
      t.string :title, null: false
      t.string :image_url

      t.timestamps
    end
    add_index :feeds, :url, unique: true
  end
end
