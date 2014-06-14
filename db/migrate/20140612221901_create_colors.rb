class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string  :hexcode, required: true
      t.timestamps
    end
  end
end
