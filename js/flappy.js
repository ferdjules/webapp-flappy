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

// array that holds the letters
var letters = [];

// array that holds the letters' position
var lettersPosition = [];

// variable that holds the current letter
var newLetter;

// array that holds all caught letters
var collectedLetters = new Array(11).fill(0);

// Flappy Bird set
var FBtext;

//Initially empty array to store the bullets
var bullets = [];

// array that holds ammunition
var ammo = [];

// Initialise the activeGun variable with the boolean value false.
var activeGun = false;

// ammoWidth
var ammoWidth = 20;

// Initialise bulletCounter with the value 0
var bulletCounter = 0;

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

// orb sprite
var orb;

// speed of vertical movement of pipes
var pipeVerticalSpeed = 50;

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
    //game.load.image("playerImg", "../assets/jamesBond.gif");
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

    // load letters
    game.load.image("letterF","../assets/letters/F.png");
    game.load.image("letterL","../assets/letters/L.png");
    game.load.image("letterA","../assets/letters/A.png");
    game.load.image("letterP","../assets/letters/P.png");
    game.load.image("letterY","../assets/letters/Y.png");
    game.load.image("letterB","../assets/letters/B.png");
    game.load.image("letterI","../assets/letters/I.png");
    game.load.image("letterR","../assets/letters/R.png");
    game.load.image("letterD","../assets/letters/D.png");

    // load bullet
    game.load.image("bullet", "../assets/flappy_frog.png");
    // load bonus bullet to load ammunition
    game.load.image("bonus", "../assets/flappy_frog.png");

    // mummy for animated sprite
    game.load.spritesheet("playerImg", "../assets/mummy.png", 37, 45, 18);


    // orb
    game.load.image("orb", "../assets/pipe_red.png");
}


/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#13D3A3");
    // set and position the welcome text
    //game.add.text(20, 20, "Welcome to my game", {font: "20px Arial", fill: "#FFFFFF"});

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
    // game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    // moves player to left
    // game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    // moves player up
    // game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    // moves player down
    // game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
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

    FBtext = game.add.text(20, 350, "Flappy Bird",
            {font: "40px Arial", fill: "#4d79ff",fontWeight: "bold"});

    // call the fire function when the right arrow key is pressed
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(fire);

    // create animation with player image
    var walk = player.animations.add('walk');
    player.animations.play('walk', 30, true);

    // add another sprite to interact with
    orb = game.add.sprite(width/2, height/4, 'orb');
    //orb = game.add.sprite(80, 150, 'orb');
    game.physics.enable(orb, Phaser.Physics.ARCADE);
    orb.body.collideWorldBounds = true;
    orb.body.bounce.setTo(0.8, 0.8, 0.8, 0.8);
    orb.body.velocity.x = 100;
    orb.body.velocity.y = 50;
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

    // introduce letters
    var lettersInterval = 3.5;
    game.time.events.loop(lettersInterval * Phaser.Timer.SECOND,generateLetters);

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

    game.physics.arcade.overlap(player,normalTag, function(){
        normalTag.destroy();
        easyTag.destroy();
        setMode(modes.easy);
        game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generate);
    });

    // for each letter in the game canvas
    for (var i = 0; i < letters.length; i++) {
        // check if there is any overlaps
        if(game.physics.arcade.overlap(player,letters[i])){
            // if there is an overlap, update the score
            updateScore();
            //add the position of the new collected letter in the collectedLetters array
            collectedLetters[lettersPosition[i]] = 1;
            // remove the letter i from the game canvas
            letters[i].destroy();
            // remove the letter i from the array letters
            letters.splice(i,1);
            // remove the position of letter i from the lettersPosition array
            lettersPosition.splice(i,1);
            // updates the colour of respective letter
            updateColour();
        }
    }

    // For each pipe test the overlap with bullets and destroy any match
    for (var i = 0; i < pipes.length; i++) {
        game.physics.arcade.overlap(pipes[i], bullets, function() {
            pipes[i].destroy();
        });
    }

    //Sets the variable to true when the player and the bonus collide.
    checkAmmunition();

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
    // defines vertical speed of pipes
    block.body.velocity.y = pipeVerticalSpeed;

    // random velocitiy of pipe blocks
    //var blockVelocity = game.rnd.integerInRange(-200, -400);
    //block.body.velocity.x = blockVelocity;

    //new things here
    var flagDestroy = game.rnd.integerInRange(0, 5);
    if (flagDestroy == 0) {
        var destroyTime = game.rnd.integerInRange(500, 1000);
        game.time.events.add(destroyTime, function() {
            block.destroy();
            }, this);
    }
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
    // defines vertical speed of pipe ending
    endBlock.body.velocity.y = pipeVerticalSpeed;

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
// function generate() {
//     var diceRoll = game.rnd.integerInRange(1, 10);
//     if(diceRoll==1) {
//         generateBalloons();
//     } else if(diceRoll==2) {
//         generateWeights();
//     } else {
//         generatePipe();
//     }
// }

// Function that creates bonuses or pipes at random
function generate() {
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeights();
    } else if(diceRoll==3) {
        generateAmmo();
        //generatePipe();
    } else {
        generatePipe();
        //generateAmmo();
    }
}

// Function that adds stars in the gaps of the pipes
function addStar(x,y) {
    var star = game.add.sprite(x, y, "stars");
    stars.push(star);
    game.physics.arcade.enable(star);
    // defines horizontal speed of pipes
    star.body.velocity.x = -gameSpeed;
    // defines vertical speed of star
    star.body.velocity.y = pipeVerticalSpeed;
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


// Generate floating letters
function generateLetters() {
    // pick a new random letter
    pickLetter();
    //display on the canvas one of the letters
    // for now let's display the first one
    var letter = game.add.sprite(750,20,newLetter);
    //we need to scale it to the right size
    letter.scale.y = 0.5;
    letter.scale.x = 0.5;
    // insert it in the array letters
    letters.push(letter);
    // enable physics engine for the letter
    game.physics.arcade.enable(letter);
    // set the letters's velocity
    // (negative x value for velocity means movement will be towards left)
    letter.body.velocity.x = -80;
    letter.body.velocity.y = 20;
}


function pickLetter() {
    // generate random numbers corresponding to the position of letters in the
    // "Flappy Bird" array containing 10 letters - from 0 to 9 excluding the space
    var diceRoll = game.rnd.integerInRange(0, 9);
    switch (diceRoll) {
    case 0:
    newLetter = "letterF";
    lettersPosition.push(0);
    break;

    case 1:
    newLetter = "letterL";
    lettersPosition.push(1);
    break;

    case 2:
    newLetter = "letterA";
    lettersPosition.push(2);
    break;

    case 3:
    newLetter = "letterP";
    lettersPosition.push(3);
    break;

    case 4:
    newLetter = "letterP";
    lettersPosition.push(4);
    break;

    case 5:
    newLetter = "letterY";
    lettersPosition.push(5);
    break;

    case 6:
    newLetter = "letterB";
    // the position of letter B is 7 because of the space
    //between the word "Flappy" and "Bird"
    lettersPosition.push(7);
    break;

    case 7:
    newLetter = "letterI";
    lettersPosition.push(8);
    break;

    case 8:
    newLetter = "letterR";
    lettersPosition.push(9);
    break;

    case 9:
    newLetter = "letterD";
    lettersPosition.push(10);
    break;
    }
}

// Function that updates score by 2
function updateScore() {
    changeScore();
    changeScore();
}

// Function that changes the colour of the letters
function updateColour() {
    // for each letter in the array of the collected letters
    for (i = 0; i < collectedLetters.length; i++) {
        // if the letter i has been collected, turn it into red
        if (collectedLetters[i] == 1) {
            //FBtext.addColor('#ff0000', i); //#ff0000 is red
            FBtext.angle -= 10;
        }
        // if the letter i has not been collected turn it into white
        if (collectedLetters[i] == 0) {
            //FBtext.addColor('#4d79ff', i); //#4d79ff is blue
            FBtext.angle -= 10;
        }
    }
}

// Function that fires the bullets
function fire() {
    // Increases the value of bulletCounter by one.
    bulletCounter++;

    if (bulletCounter == 5) {
        bulletCounter = 0;
        activeGun = false;
    }

    if (activeGun) {
        // The initial position of the bullet is the current position of the player.
        var bullet = game.add.sprite(player.x, player.y, "bullet");
        game.physics.arcade.enable(bullet);
        bullet.body.velocity.x = 400;
        // Add the new bullet to the bullets array, (this is helpful for //later)
        bullets.push(bullet);
    }
}


// Function that generates ammunition
function generateAmmo() {
    var ammunition = game.add.sprite(width, 0, "bonus");
    game.physics.arcade.enable(ammunition);
    ammunition.body.velocity.x = -200;
    ammunition.body.velocity.y = game.rnd.integerInRange(60, 100);
    ammo.push(ammunition);
}


function checkAmmunition() {
    for(var i = ammo.length - 1; i >= 0; i--) {
        if(ammo[i].body.x + ammoWidth < 0) {
            ammo[i].destroy();
            ammo.splice(i, 1);
        } else {
            game.physics.arcade.overlap(player, ammo[i], function(){
                ammo[i].destroy();
                ammo.splice(i, 1);
                bulletCounter=0;
                activeGun = true;
            });
        }
    }
}


// Generate changes to the game environment once the player collides with the orb sprite.
function collisionHandler() {
    game.stage.setBackgroundColor = '#992d2d';
    generateHardPipe();
    orb.kill();
}

// Function that generates a "hard pipe"
function generateHardPipe() {
    var gapStart = game.rnd.integerInRange(2, 5);
    for (var count = 0; count < height/blockHeight; count++) {
        if (count != gapStart && count != gapStart+1) {
            addHardPipeBlock(width, count * 50);
        }
    }
        ultimateMode();
}


function addHardPipeBlock(x, y) {
    var block = game.add.sprite(x,y,"pipeBlock");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -500;
}


function ultimateMode() {
    score = score + 100;
    labelScore.setText(score.toString());
    game.time
    .events
    .loop(pipeInterval * Phaser.Timer.SECOND, generateHardPipe);
        var text = game.add.text(220, 50, 'Ultimate Mode!',{font: "30px Tahoma", fill:"#b30047"});
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
}
