var canvas = document.querySelector("#field");
var ctx = canvas.getContext("2d");

var speed = 20;
var currentHeroX = canvas.width - 100;

// Game objects
var FPS = 30;
var bgReady;
var bgImage;
var heroImage;
var heroReady;
var monstersCaught = 0;
var background =
{
    draw: function(){
       bgImage = new Image();
       bgReady= false;
      bgImage.onload = function () {
      	bgReady = true;
      }
      bgImage.src = "../img/field.png";
      ctx.drawImage(bgImage, 0, 0);
  }
}
var hero = {
	width: 20,
  height: 20, // movement in pixels per second
  x: 0,
	y: 0,
  draw: function(){
    heroImage = new Image();
    heroReady = false;
    heroImage.onload = function() {
      heroReady = true;
    }
    heroImage.src = "../img/PlayerOneDetail.png";
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
}

function randomX(){
  var x = 32 + (Math.random() * (canvas.width - hero.x));
  console.log(x);
  return x;
}

function randomY(){
  var y = 32 + (Math.random() * (canvas.height - hero.height));
  console.log(y);
  return y;
}

var monsterY = setInterval(randomY, 3000);
var monsterX = setInterval(randomX, 3000);
console.log(monsterY);
console.log(monsterX);


function monster(monsterX, monsterY) {
  this.x = monsterX;
  this.y = monsterY;
  this.draw = function(monsterX, monsterY){
    var monsterImage = new Image();
    var monsterReady  = false;
    monsterImage.onload = function() {
      monsterReady = true;
    }
    monsterImage.src = "../img/DetailPlayer.png";
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }
};
var num = (currentHeroX - 60)/20;

var monsters = [];
// for(var i = 0; i < num.length; i++)
//   {
//     monsters[i].push(monster);
//   }
var keysDown = {};
var allowed = true;
var monsters = [];

for (var x = 1; x < (canvas.width - hero.x)/50; x++)
  {
    monsters[x] = new monster();
  }
