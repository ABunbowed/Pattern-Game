var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



// detect key press to start game
$(document).keypress(function () { 
    if(!started)  {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//button click to log pattern
$(".btn").click(function() { 
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)

    console.log(userClickedPattern)

    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
});

//check answer
function checkAnswer(currentLevel){
    // if answer is right
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    } else {
    // if answer is wrong
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver()
    }

}

// colour sequence
function nextSequence() {
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor( Math.random() * 4 ) 
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
   
    
}

// sound
function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3")
    audio.play();
}

// animation on button click
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    
   setTimeout (function (){
    $("#" + currentColour).removeClass("pressed");
    } , 100)
}

//start over

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}