var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;
  $(".upper_line").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userchosenColor = this.id;
  userClickedPattern.push(userchosenColor);
  playSound(userchosenColor);
  animatePress(userchosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(ind) {
  if (gamePattern[ind] != userClickedPattern[ind]) {
    var audio = new Audio("over.mp3");
    audio.play();
    $("body").addClass("game-over");
    $(".upper_line").text("Game over!! Press a key to start again!!");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    nextGame();
  } else {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
}

function nextGame() {
  highScore();
  level = 0;
  gamePattern = [];
  started = false;
}


function highScore(){
    $(".high_score").text(function(){
        var high = $(".high_score").text();
        if(level > high){
            $(".high_score").text(level-1);
        }
    });
}

