class AddPositionColumns < ActiveRecord::Migration
  def change
    add_column :rounds, :position, :integer
    add_column :rounds, :position_correct, :boolean, default: true
  end
end
