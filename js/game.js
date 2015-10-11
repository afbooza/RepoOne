
// Create the canvas

canvas.width = 1000;
canvas.height = 500;
document.body.appendChild(canvas);
// Background image


$(document).keydown(function(event) {
    var key = event.keyCode;
    if(allowed){
            switch(key) {
                case 38:
                  hero.y -= speed;
                  event.preventDefault();
                  allowed = false;
                  break;
              case  39:
                  hero.x += speed;
                  event.preventDefault();
                  allowed = false;
                  break;
              case  37:
                  hero.x -= speed;
                  currentHeroX = hero.x;
                  event.preventDefault();
                  allowed = false;
                  break;
                case  40:
                    hero.y += speed;
                    event.preventDefault();
                    allowed = false;
                  break;
               default:
                  allowed = false;
                  event.preventDefault();
                  }
                }
});
$(document).keyup(function(e) {
  allowed = true;
});



// Reset the game when the player catches a monster
var reset = function () {
  if(hero.x <= 60){
    hero.x = canvas.width - 40;
    monstersCaught +=6;
  }
	else{
    hero.x = currentHeroX;
  }
	hero.y = canvas.height / 2;
	//Throw the monster somewhere on the screen randomly


};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
    hero.y -= 1;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += 1;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -=1;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += 1;
	}
	// Are they touching?
	if (
		hero.x <= 60
	) {
		reset();
	}
};



// Draw everything
var render = function () {

  background.draw();
  hero.draw();
  for(var i=1; i < monsters.length; i++)
  {
    monsters[i] = new monster();
    monsters[i].draw();
  }
	ctx.fillStyle = "rgb(000, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + monstersCaught, 32, 32);
};
// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	render();
	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
var then = Date.now();
setInterval(function() {
  update();
  main();
}, 1000/FPS);
