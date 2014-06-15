class JSONFormatter
  def self.format(klass, method)
    formatted_data = Hash.new

    self.pull_values(klass, method).each_with_index do |datum, index|
      formatted_data[index + 1] = datum
    end
    formatted_data
  end

  private

  def self.pull_values(klass, method)
    klass.all.map{|instance| instance.send(method) }
  end

end