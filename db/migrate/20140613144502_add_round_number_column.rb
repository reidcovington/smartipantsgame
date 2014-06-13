class AddRoundNumberColumn < ActiveRecord::Migration
  def change
    add_column :rounds, :round_number, :integer, required: true
  end
end
