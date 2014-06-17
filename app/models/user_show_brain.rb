class UserShowBrain
  def self.user(player)
    @user = player
  end
  def self.game_dates(player)
    @user = User.find(player)
    @games = @user.games.all
    @game_dates = []
    @games.each do |game|
      @game_dates << game.created_at.strftime('%d %b')
    end
    @game_dates
  end

  def self.color_correct(player)
    @color_answer = []
    @color_id = []
    User.find(player).games.all.each do |game|
      color_answer = []
      color_id = []
        game.rounds.each do |round|
          color_answer << round.color_correct
          color_id << round.color_id
        end
        @color_answer << color_answer
        @color_id << color_id
      end
      @answer3 = []
      @answer = []
      @color_answer.each do |answer|
        response1 = []
        answer.each do |bool|
          if bool == true
             response1 << bool
         end
        end
            @answer3 << response1.length
      end
      @answer3
  end

  def self.audio_correct(player)
    @audio_answer = []
    @audio_id = []
    User.find(player).games.all.each do |game|
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
      @answer4 = []
      @audio_answer.each do |answer2|
        response = []
        answer2.each do |bool|
          if bool == true
             response << bool
         end
        end
            @answer4 << response.length
      end
      @answer4
  end

  def self.total_correct
    @total_correct = [@answer3,@answer4].transpose.map {|x| x.reduce(:+)}
    @total_correct
  end

  def self.color_true(player)
    @color_true_array = []
    @user = User.find(player)
    @game = @user.games.last
    @true_rounds = @game.rounds.where(color_correct: true)
    @true_rounds.each do |round|
        @color_true_array << round.color_id
      end
      p @color_true_array
    @color_hash = Hash.new(0)
    @color_true_array.each { | v | @color_hash.store(v, @color_hash[v]+1) }
    @color_hash
  end

  def self.audio_true(player)
    @audio_true_array = []
    @user = User.find(player)
    @game = @user.games.last
    @true_rounds = @game.rounds.where(audio_correct: true)
    @true_rounds.each do |round|
        @audio_true_array << round.audio_id
      end
     @audio_hash = Hash.new(0)
     @audio_true_array.each { | v | @audio_hash.store(v, @audio_hash[v]+1) }
     @audio_hash
  end

  def self.audios_false(player)
    @audio_false_array = []
    @user = User.find(player)
    @game = @user.games.last
    @false_rounds = @game.rounds
    @false_rounds.each do |round|
       if round.audio_correct != true
          @audio_false_array << round.audio_id
        end
      end
     @audio_hash = Hash.new(0)
     @audio_false_array.each { | v | @audio_hash.store(v, @audio_hash[v]+1) }
     @audio_hash
  end

  def self.color_false(player)
    @color_false_array = []
    @user = User.find(player)
    @game = @user.games.last
    @false_rounds = @game.rounds
    @false_rounds.each do |round|
      if round.color_correct != true
        @color_false_array << round.color_id
      end
    end
    @color_false_array
    @color_hash = Hash.new(0)
    @color_false_array.each { | v | @color_hash.store(v, @color_hash[v]+1) }
    @color_hash
  end

  def self.n(player)
    @user = User.find(player)
    @game = @user.games.last
    @n = @game.n
  end

end
