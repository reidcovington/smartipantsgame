class JSONFormatter
  def self.format(klass, property)
    hash_of_property_values = Hash.new

    self.pull_values(klass, property).each_with_index do |property_value, index|
      hash_of_property_values[index + 1] = property_value
    end
    hash_of_property_values
  end

  private

  def self.pull_values(klass, property)
    klass.all.map{|instance| instance.send(property) }
  end
  
end