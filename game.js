var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColorChosen=buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("."+randomColorChosen).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
}

$(".row div").on("click", function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")},100
    );
}

$(document).on("keypress",function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}