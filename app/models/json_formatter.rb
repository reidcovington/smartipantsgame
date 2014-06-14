class JSONFormatter
  def self.format(array_of_data)
    stringified_numbers = numbering_system(array_of_data)
    formatted_data = Hash.new

    array_of_data.each do |datum|
      formatted_data[stringified_numbers.shift] = datum
    end
    formatted_data
  end

  private

  def self.numbering_system(array_of_data)
    stringified_numbers = []

    for i in 1..array_of_data.length
      stringified_numbers << i.to_s
    end
    stringified_numbers
  end
end