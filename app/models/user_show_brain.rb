class UserShowBrain
  def self.game_dates
    @user = User.find(1)
    @games = @user.games.all
    @game_dates = []
    @games.each do |game|
      @game_dates << game.created_at.strftime('%d %b')
    end
    @game_dates
  end

  def self.color_correct
    @color_answer = []
    @color_id = []
    User.first.games.all.each do |game|
      color_answer = []
      color_id = []
        game.rounds.each do |round|
          color_answer << round.color_correct
          color_id << round.color_id
        end
        @color_answer << color_answer
        @color_id << color_id
      end
      @answer = []
      @color_answer.each do |answer|
        response = []
        answer.each do |bool|
          if bool == true
             response << bool
         end
        end
            @answer << response.length
      end
      @answer
  end





end
