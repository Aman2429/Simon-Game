var buttonColors =["red","blue","green","yellow"];
// console.log(randomChosenColour);
var count=0;
var gamePattern=[];
var userChosenColour;
var level=0;
var userClickedPattern=[];

// console.log(gamePattern);
// var a =$("#"+randomChosenColour);
// console.log(a);



//------------------------------------------- on key press start of the game--------------------------------------------------------

$(document).keypress(function()
{
    if(count===0)
    {
        console.log("first time pressed "+count);
        console.log("the level is "+level);
        $("h1").html("level "+level);
        nextSequence();
        count++;
    }
    else
    {
        console.log("key is pressed "+count);
        count++;
    }
});

// ---------------------------------------------on button click of the game----------------------------------------------------------

$(".btn").click(function()
{
    userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    // console.log(userClickedPattern);

    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}
);

// ---------------------------------------------next sequence function---------------------------------------------------------------

function nextSequence()
{
    userClickedPattern=[]; 
    level++;
    $("h1").html("level "+level);
    var randomNumber=(Math.floor(Math.random()*4));
    // console.log(randomNumber);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // console.log(gamePattern);
    
    $("#"+randomChosenColour).delay(100).fadeOut().fadeIn('slow');
    playsound(randomChosenColour);
   
}

//-------------------------------------------------play sound function-----------------------------------------------------------------

function playsound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

//-------------------------------------------------function animate------------------------------------------------------------------

function animatePress(currentColour)
{
//  console.log(currentColour);
 $("."+currentColour).addClass("pressed");
 setTimeout(function() 
 {
    $("."+currentColour).removeClass("pressed");
 },100);
}

//---------------------------------------------------function to check answer--------------------------------------------------------

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        // console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else
    {
        // console.log("wrong");
        // wrong answer audio
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        // time out function for flash at wrong answer;
        $("body").addClass("game-over");
        setTimeout(function() 
        {
           $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// -----------------------------------------------start over function------------------------------------------------------------------

function startOver()
{
    level=0;
    count=0;
    gamePattern=[];
    userClickedPattern=[];
}