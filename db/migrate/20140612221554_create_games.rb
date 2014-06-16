class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.belongs_to  :user
      t.text        :json_string, required: true
      t.integer     :n, required: true
      t.timestamps
    end
  end
end
