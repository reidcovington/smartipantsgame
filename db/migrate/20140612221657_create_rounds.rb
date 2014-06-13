class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.belongs_to  :game, required: true
      t.integer     :color_id
      t.integer     :audio_id
      t.boolean     :color_correct, default: true
      t.boolean     :audio_correct, default: true
      t.timestamps
    end
  end
end
