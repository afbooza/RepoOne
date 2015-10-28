var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
// Create the canvas

canvas.width = 1000;
canvas.height = 500;


var speed = 30;
function speedX() {return Math.random() < 0.5 ? -speed : speed;}
function speedY(){return Math.random() < 0.5 ? -speed : speed;}
setInterval(speedX(), 2000);
setInterval(speedY(), 2000);

var currentHeroX = canvas.width - 100;
var counter = 0;
// Game objects
var FPS = 30;
var bgReady;
var bgImage;
var heroImage;
var monsterImage = new Image();
var monstersCaught = 0;
var monsterList = {};
var keysDown = {};
var allowed = true;
var hero = {
    width: 20,
    height: 20, // movement in pixels per second
    x: canvas.width - 40,
    y: canvas.height / 2,
    draw: function(){
        heroImage = new Image();
        heroImage.src = "../img/PlayerOneDetail.png";
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
}

var queue = [];

var direction = 0;
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

function randomX(){
  var x = (Math.random() * (canvas.width - hero.x));
  //console.log(x);
  return x;
}

function randomY(){
  var y = (Math.random() * (canvas.height - hero.height));
  //console.log(y);
  return y;
}



Monster('m1', randomX(), randomY(), speedX(), speedY());
Monster('m2', randomX(), randomY(), speedX(), speedY());
Monster('m3', randomX(), randomY(), speedX(), speedY());

function Monster(id, x, y, speedX, speedY) {
  var monster = {
    id : id,
    x : x,
    y : y,
    speedX: speedX,
    speedY: speedY
}
  monsterList[id] = monster;

  //this.draw = function(){
  //  var monsterImage = new Image();
  //  var monsterReady  = false;
  //  monsterImage.onload = function() {
  //    monsterReady = true;
  //  }
  //  monsterImage.src = "../img/DetailPlayer.png";
  //  ctx.drawImage(monsterImage, this.x, this.y);
  //}
};


