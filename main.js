var gamePattern = []
var userClickedPattern = []

var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0

$(document).keydown(function () {
    // could also have created a global variable for var started = false
    if (gamePattern && gamePattern.length === 0) {
        $("h1").text("Level " + level);
        nextSequence();
    } else {
        console.log("Game already started")
    }
})

$("button").click(function (event) {
    // could also have done = $(this).attr("id")
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    makeSound(userChosenColour);

    $(this).fadeOut(100).fadeIn(100);

    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (var i = 0; i < gamePattern.length; i++) {
        setDelay(gamePattern[i], i)
    }
}

// this was hard. wish JS had a wait or sleep method!!! https://www.geeksforgeeks.org/how-to-add-a-delay-in-a-javascript-loop/
function setDelay(j, i) {
    setTimeout(function () {
        $("#" + j).fadeOut(100).fadeIn(100);
        makeSound(j);
    }, 500 * i);
}

//    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
//    makeSound(randomChosenColour);

function makeSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3")
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 200);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong")
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
}