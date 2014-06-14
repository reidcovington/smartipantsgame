class UserShowBrain
  def self.game_dates
    @user = User.find(1)
    @games = @user.games.all
    @game_dates = []
    @games.each do |game|
      @game_dates << game.created_at.strftime('%d %b')
    end
  end

  def self.color_correct
    @color_rounds = []
    User.first.games.all.each_with_index do |game, index|
      index = []
        game.rounds.each do |round|
          index << round.color_correct
        end
        @color_rounds << index
      end
      @color_rounds
  end





end
