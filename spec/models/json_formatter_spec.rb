require 'spec_helper'

describe JSONFormatter do
  let(:to_be_formatted_array) { ["hello", "world", "test"] }
  let(:formatted_hash) { { "1" => "hello", "2" => "world", "3" => "test" } }

  context "#format" do
    it "returns a hash if passed an array" do
      expect(JSONFormatter.format(to_be_formatted_array)).to be_an_instance_of Hash
    end

    it "raises an error if not passed a hash" do
      expect{ JSONFormatter.format(1) }.to raise_error
    end

    it "turns an array into a properly formatted hash" do
      expect(JSONFormatter.format(to_be_formatted_array)).to eq formatted_hash
    end
  end
end