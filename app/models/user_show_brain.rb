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

  def self.audio_correct
    @audio_answer = []
    @audio_id = []
    User.first.games.all.each do |game|
      audio_answer = []
      audio_id = []
        game.rounds.each do |round|
          audio_answer << round.audio_correct
          audio_id << round.audio_id
        end
        @audio_answer << audio_answer
        @audio_id << audio_id
      end
      @answer2 = []
      @audio_answer.each do |answer2|
        response = []
        answer2.each do |bool|
          if bool == true
             response << bool
         end
        end
            @answer2 << response.length
      end
      @answer2
  end

  def self.total_correct
    @total_correct = [@answer,@answer2].transpose.map {|x| x.reduce(:+)}
  end

end
