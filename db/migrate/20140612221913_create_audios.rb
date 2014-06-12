class CreateAudios < ActiveRecord::Migration
  def change
    create_table :audios do |t|
      t.string  :file_loc, required: true
      t.timestamps
    end
  end
end
