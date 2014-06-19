require 'spec_helper'

describe JSONFormatter do
  json_formatter = JSONFormatter.new(Color, :hexcode)
  let(:formatted_hash) { {1 => "#32ED3C", 2 => "#B75FFF", 3 => "#ed2d14", 4 => "#fff51b"} }

  context "#format" do
    it "returns a hash if passed an array" do
      expect(json_formatter.format).to be_an_instance_of Hash
    end

    it "raises an error if not passed correct arguments" do
      expect{ JSONFormatter.new(1) }.to raise_error ArgumentError
    end

    it "turns an array into a properly formatted hash" do
      expect(json_formatter.format).to eq formatted_hash
    end
  end
end