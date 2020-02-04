//Initialize
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

//Game Start
$(document).keypress(function(event) {
  if (gameStarted === false) {
    nextSequence()
    gameStarted = true;
    $("h1").text("Level " + level);
  }

})

//On button press
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

//Functions
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level += 1;
  $("h1").text("Level " + level);
  userClickedPattern = []
}

function playSound(name) {
  var gameAudio = new Audio("sounds/" + name + ".mp3");
  gameAudio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  //User gets it right
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    //User gets it wrong
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
