class JSONFormatter
  def self.format(array_of_data)
    formatted_data = Hash.new

    array_of_data.each_with_index do |index,datum|
      formatted_data[index + 1] = datum
    end
    formatted_data
  end
end