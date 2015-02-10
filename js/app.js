// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.width = 96;
	this.height = 64;
	this.centerOffsetX = 50;
	this.centerOffsetY = 111;

	this.x = 0;
	this.y = 0;
	this.speed = 0;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

//initialize the starting position and speed for an enemy
Enemy.prototype.init = function() {
	//start the enemy off the screen to the left so that it
	//looks like it is running on to the screen 
	this.x = -80;

	/*set the y coordinate such that the enemy is positioned
	 *on a row of stone tiles (row 2, 3 or 4)
	 *the Math.floor part of the the code below will ensure that
	 *the random number is either 0, 1 or 2*/
	var tileRow = 2+Math.floor(Math.random()*3)

	//convert the row number to a y coordinate
	this.y = (tileRow-1)*73;

	//set the speed in a range of 100 to 300
	this.speed = 50 + (150 * Math.random());
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed*dt;

	//if the enemy goes off the screen, re-initialize it
	//this will reset its position and speed
	if(this.x > 505){
		this.init();
	}
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	
	this.tileX = 0;
	this.tileY = 0;
	this.tileWidth = 101;
	this.tileHeight = 83;
	this.offsetY = 10;

	this.width = 65;
	this.height = 75;
	this.centerOffsetX = 50;
	this.centerOffsetY = 100;

	this.x = 0;
	this.y = 0;
	this.sprite = 'images/char-boy.png';
}

//add references to the enemy object's methods
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

//nothing to add here
Player.prototype.update = function() {

};

Player.prototype.moveToStart = function() {
    this.tileX = 3;
	this.tileY = 6;	
	this.updatePosition();
}
//calculate x and y coordinates for the player that 
//correspond to tile the player is currently on*/
Player.prototype.updatePosition = function() {
    //make sure the player doesn't go off the screen
	if(this.tileX > 5) {
		this.tileX = 1;
	} else if (this.tileX < 1) {
		this.tileX = 5;
	};

	if(this.tileY > 6){
		this.tileY = 6;
	} else if (this.tileY < 2){
		this.tileY = 6;
	};

	//update x and y to reflect the tile that the player is currently on	
	this.x =  (this.tileX-1) * this.tileWidth;
	this.y =  (this.tileY-1) * this.tileHeight - this.offsetY;		

}

//check if the player touches the given entity
Player.prototype.checkCollision = function(entity){
	
	var xOverlap = false,
		yOverlap = false;
		
	//get the distance between the center points of the player and the entity on the x axis	
	var centerDistX = Math.abs(this.x+this.centerOffsetX - entity.x-entity.centerOffsetX);
	
	if(centerDistX < (this.width + entity.width)/2 ){
		xOverlap = true;	
	}
	
	//get the distance between the center points of the player and the entity on the y axis	
	var centerDistY = Math.abs(this.y+this.centerOffsetY - entity.y-entity.centerOffsetY);
	
	if(centerDistY < (this.height + entity.height)/2 ){
		yOverlap = true;	
	}
		
	if(xOverlap && yOverlap){
		return true;
	} else {
		return false;
	}
};

Player.prototype.handleInput = function(keyCode){
		
	//calculate the new player position
	if(keyCode ==='left'){
		this.tileX -= 1;
	} else if (keyCode ==='right'){
		this.tileX += 1;
	} else if (keyCode ==='up'){
		this.tileY -= 1;
	} else if (keyCode ==='down'){
		this.tileY += 1;
	};

	//move the player
	this.updatePosition();
}

//This function will generate a new enemy, initialize it 
//and add it to the enemies array
function add_enemy()  {
	var enemy = new Enemy;
	enemy.init();
	allEnemies.push(enemy);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//load all the sprites 
allEnemies = [];
add_enemy();
add_enemy();
add_enemy();
add_enemy();


//create a new player instance
var player = new Player;
player.moveToStart(); //set the default coordinates


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
	//console.log(allowedKeys[e.keyCode]);
});