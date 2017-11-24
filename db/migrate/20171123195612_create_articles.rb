class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :image, null: false
      t.text :description, null: false
      t.integer :feed_id, null: false
      t.datetime :publish_date, null: false

      t.timestamps
    end

    add_index :articles, :url, unique: true
    add_index :articles, :feed_id
  end
end
