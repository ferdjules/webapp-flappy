// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// Constants
var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 200;
var jumpPower = 200;

// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);


// score
var score = 0;

// show score on the game display
var labelScore;

// player
var player;

// array that holds the column of pipe blocks
var pipes = [];

// array that holds the balloons
var balloons = [];

// array that holds the weights
var weights = [];

// array that holds the bonuses
var bonusArray = [];

// array that holds the stars
var stars = [];

// array that holds the batmen
var batmen = [];

// splash screen
var splashDisplay;

// setting constants for pipe generation
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeWidth = 50;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 10;
var bonusWidth = 40;

// difficulty modes
var easyMode = {
  pipeInterval: 3,
  gameSpeed: 170,
  gameGravity: 220,
  gapSize: 150
};

var normalMode = {
  pipeInterval: 1.75,
  gameSpeed: 200,
  gameGravity: 200,
  gapSize: 100
};

// object for modes
var modes = {
  easy: easyMode,
  normal: normalMode
};

// score board
jQuery("#greeting-form").on("submit", function(event_details) {
  var greeting = "Hello ";
  var name = jQuery("#fullName").val();
  var greeting_message = greeting + name;
  game.paused = false;
  jQuery("#greeting").hide();
  jQuery("#list").append("<p>" + greeting_message + " (" +
    jQuery("#email").val() + "): " + jQuery("#score").val() + "</p>");
    event_details.preventDefault();
    score = 0;
});

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    // load James Bond images
    game.load.image("playerImg", "../assets/jamesBond.gif");
    // load sound snippet
    game.load.audio("score", "../assets/point.ogg");
    // load pipe block
    game.load.image("pipeBlock","../assets/pipe.png");
    // load pipe ending
    game.load.image("pipeEnding","../assets/pipe-end.png");
    // load balloon
    game.load.image("balloons","../assets/balloons.png");
    // load weight
    game.load.image("weights","../assets/weight.png");
    // load the stars
    game.load.image("stars", "../assets/star.png");
    // load the batmen
    game.load.image("batman", "../assets/flappy_batman.png");
    // load the easy image
    game.load.image("Easy", "../assets/easy.png");
    // load the normal image
    game.load.image("Normal", "../assets/normal.png");
}


/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#13D3A3");
    // set and position the welcome text
    game.add.text(20, 20, "Welcome to my game", {font: "20px Arial", fill: "#FFFFFF"});
    // place image on canvas
    // game.add.sprite(10, 270, "playerImg");

    // display the message “click!” when the user clicks on the canvas
    game.input.onDown.add(clickHandler);
    // // make a sound play if the spacebar is pressed
    // game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    // show score on the game display
    labelScore = game.add.text(20, 20, "0");

    // initialises a player
    player = game.add.sprite(100, 200, "playerImg");
    // sets anchor of sprite
    player.anchor.setTo(0.5, 0.5);

    // Start the ARCADE physics engine.
    // ARCADE is the most basic physics engine in Phaser.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // enable physics for the player sprite
    game.physics.arcade.enable(player);
    // // set the player's gravity
    // player.body.gravity.y = gameGravity;

    // set difficulty level
    setMode(modes.easy);

    // moves player to the right
    //player.body.velocity.x = 100;
    // moves player upwards
    //player.body.velocity.y = -100;

    // moves player to right
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    // moves player to left
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    // moves player up
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    // moves player down
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    // // moves player according to jump function
    // game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);

    // To test the changeScore function
    changeScore();
    //changeScore();

    // // time loop to keep generating new pipes
    // var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    // game.time.events.loop(pipeInterval,generate);

    // used to see the changes while building the generatePipe function
    // generatePipe();

    // initiliase easy and normal sprites
    easyTag = game.add.sprite(350, 100, "Easy");
    game.physics.arcade.enable(easyTag);
    easyTag.body.velocity.x = - gameSpeed;
    normalTag = game.add.sprite(350, 300, "Normal");
    game.physics.arcade.enable(normalTag);
    normalTag.body.velocity.x = - gameSpeed;

    // show splash screen
    splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump");
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);

}

function start() {
    // removes start function so that it can not be called multiple times
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);

    // moves player according to jump function
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);

    // set the player's gravity
    player.body.gravity.y = gameGravity;

    // time loop to keep generating new pipes
    // var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    // game.time.events.loop(pipeInterval,generate);

    // destroy splash screen
    splashDisplay.destroy();

    // small velocity to increase difficulty
    // player.body.velocity.x = 50;

    // time loop to keep increasing speed of game
    var gameSpeedIncrease = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(gameSpeedIncrease,increaseSpeed);

    // time loop to keep increasing size of player
    var playerSizeIncrease = 2.5 * Phaser.Timer.SECOND;
    game.time.events.loop(playerSizeIncrease,increaseSizeOfPlayer);
}



/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    // destroys pipes that leave canvas on the left side
    for(var i=pipes.length - 1; i >= 0; i--) {
        if(pipes[i].body.x - pipeWidth < 0){
            pipes[i].destroy();
            pipes.splice(i,1);
        }
    }

    // checks if player overlaps with pipes
    game.physics.arcade.overlap(player,pipes,gameOver);

    // checks if player leaves the canvas
    if(player.body.y < 0 || player.body.y > height) {
      gameOver();
    }

    // rotates player around itself
    player.rotation = Math.atan(player.body.velocity.y / gameSpeed);

    // Loop over balloons
    // for (var i = balloons.length - 1; i >= 0; i--) {
    //   game.physics.arcade.overlap(player, balloons[i], function(){
    //     changeGravity(-50);
    //     balloons[i].destroy();
    //     balloons.splice(i, 1);
    //   });
    // }

    // Loop over weights
    // for (var i = weights.length - 1; i >= 0; i--) {
    //   game.physics.arcade.overlap(player, weights[i], function(){
    //     changeGravity(50);
    //     weights[i].destroy();
    //     weights.splice(i, 1);
    //   });
    // }

    // Loop over stars
    for (var i = stars.length - 1; i >= 0; i--) {
        game.physics.arcade.overlap(player, stars[i], function(){
            stars[i].destroy();
            stars.splice(i, 1);
            changeScore();
        });
    }

    checkBonus(balloons, -50);
    checkBonus(weights, -50);

    // Loop over batmen
    // for (var i = batmen.length - 1; i >= 0; i--) {
    //   game.physics.arcade.overlap(player, batmen[i], function(){
    //     batmen[i].destroy();
    //     batmen.splice(i, 1);
    //     gapSize -= 10;
    //   });
    // }

    game.physics.arcade.overlap(player,easyTag, function(){
        easyTag.destroy();
        normalTag.destroy();
        setMode(modes.easy);
        game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generate);
    });

    game.physics.arcade.overlap(player,easyTag, function(){
        easyTag.destroy();
        normalTag.destroy();
        setMode(modes.easy);
        game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generate);
    });

}


function clickHandler(event) {
    alert("The position is: " + event.x + "," + event.y);
    //game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
    score++;
    labelScore.setText(score.toString());
}

function moveRight() {
    player.x += 10;
}

function moveLeft () {
    player.x -= 10;
}

function moveDown () {
    player.y += 10;
}

function moveUp () {
    player.y -= 10;
}

// Aligned pipe generation function
// function generatePipe() {
//     var gapStart = game.rnd.integerInRange(1, 5);
//     for(var count=0; count<8; count+=1) {
//         if(count != gapStart && count != gapStart+1) {
//             addPipeBlock(750, count*50);
//         }
//     }
//     changeScore();
// }

// Unaligned pipe generation function
function generatePipe() {
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

  // Pipes coming from the top
  addPipeEnd(width - (pipeEndExtraWidth/2),gapStart-25);
  for (var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
    addPipeBlock(width, y - blockHeight);
  }

  addStar(width, (2*gapStart-25+gapSize)/2);

  // Pipes coming from the bottom (pipeGap)
  addPipeEnd(width - (pipeEndExtraWidth/2),gapStart+gapSize);
  for (var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
    addPipeBlock(width, y);
  }

  //changeScore();
}

function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // inserts it in the 'pipes' array
    pipes.push(block);
    // adds physics engine to pipes
    game.physics.arcade.enable(block);
    // defines velocity of pipes
    block.body.velocity.x = -gameSpeed;
}

function addPipeEnd(x,y) {
    // create a new pipe ending
    var endBlock = game.add.sprite(x,y,"pipeEnding");
    // inserts it in the 'pipes' array
    pipes.push(endBlock);
    // adds physics engine to pipe ending
    game.physics.arcade.enable(endBlock);
    // defines velocity of pipes
    endBlock.body.velocity.x = -gameSpeed;

}

function playerJump() {
    player.body.velocity.y = -jumpPower;
}

// Function that is called in case of loosing the game
function gameOver() {
    //game.destroy();
    //registerScore(score);
    game.paused = true;
    $("#score").val(score);
    $("#greeting").show();
    //game.paused = false;
    //location.reload();
    //score = 0;
    stars = [];
    game.state.restart();
}


// Function to change gravity of player
function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}


// Function that creates balloons
function generateBalloons() {
  var balloon = game.add.sprite(width, height, "balloons");
  balloons.push(balloon);
  game.physics.arcade.enable(balloon);
  balloon.body.velocity.x = -200;
  balloon.body.velocity.y = -game.rnd.integerInRange(60, 100);
}


// Function that creates weights
function generateWeights(){
    var weight = game.add.sprite(width, 0, "weights");
    weights.push(weight);
    game.physics.arcade.enable(weight);
    weight.body.velocity.x = -200;
    weight.body.velocity.y = game.rnd.integerInRange(60, 100);
}


// Function that creates batmen (as an additional bonus)
// function generateBatmen(){
//     var batman = game.add.sprite(width, 0, "batman");
//     batmen.push(batman);
//     game.physics.arcade.enable(batman);
//     batman.body.velocity.x = -200;
//     batman.body.velocity.y = game.rnd.integerInRange(60, 100);
// }


// Function that creates bonuses or pipes at random
function generate() {
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeights();
    } else {
        generatePipe();
    }
}

// Function that adds stars in the gaps of the pipes
function addStar(x,y) {
    var star = game.add.sprite(x, y, "stars");
    stars.push(star);
    game.physics.arcade.enable(star);
    star.body.velocity.x = -gameSpeed;
}

// Function that increases the speed of the game
function increaseSpeed() {
    gameSpeed += 5;
}

// Function that increases the size of the player
function increaseSizeOfPlayer() {
    player.scale.x += 0.1;
    player.scale.y += 0.1;
}

// Function that destroys bonus in order to keep it from growing endlessly
// function checkBonus(bonusArray, bonusEffect) {
//     for(var i = bonusArray.length - 1; i >= 0; i--){
//         game.physics.arcade.overlap(player, bonusArray[i], function(){
//             changeGravity(bonusEffect);
//             bonusArray[i].destroy();
//             bonusArray.splice(i,1);
//         });
//     }
// }

// Function that not removes bonuses that have gone off the left of the canvas
function checkBonus(bonusArray, bonusEffect) {
    for(var i = bonusArray.length - 1; i >= 0; i--){
        if (bonusArray[i].body.x + bonusWidth < 0) {
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
        } else {
        game.physics.arcade.overlap(player, bonusArray[i], function(){
            changeGravity(bonusEffect);
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
            });
        }
    }
}


// set mode of game
function setMode(mode) {
    pipeInterval = mode.pipeInterval;
    gameSpeed = mode.gameSpeed;
    gameGravity = mode.gameGravity;
    gapSize = mode.gapSize;
}
