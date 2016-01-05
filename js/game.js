window.addEventListener("load", eventWindowLoaded, false);

function Monster(){
    this.x = xRandom();
    this.y = yRandom();
}


var mon1 = new Monster();
var mon2 = new Monster();

var Debugger = function () {
};
Debugger.log = function (message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
}

function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}



var gameOver;
function yRandom() { return Math.floor((Math.random() * 440) + 10)}
function xRandom() { return Math.floor((Math.random() * 440) + 10)}


function draw(Monster){
    var monsterImage = new Image();
    monsterImage.onload = function(){
        ctx.drawImage(monsterImage, Monster.x, Monster.y) //TODO: random monster placement
    }
    monsterImage.src = "../img/DetailPlayer.png";
}



//var monster =
//{
//    x:  200,
//    y:  200,
//    draw: function() {
//        var monsterImage = new Image();
//        monsterImage.onload = function(){
//            ctx.drawImage(monsterImage, monster.x, monster.y) //TODO: random monster placement
//        }
//        monsterImage.src = "../img/DetailPlayer.png";
//    },
//    init: function(){
//        monster.x = xRandom();
//        monster.y = yRandom();
//    }
//}





function monsterMove(mon){
    setTimeout(function() {
        var chosenValue = Math.random();
        var step = 30;

        if(chosenValue < 0.25)
        {
            mon.x += step;
        }
        else if(0.25 < chosenValue < 0.5)
        {
            mon.x -= step;
        }
        else if(0.5 < chosenValue < 0.75)
        {
            mon.y += step;
        }
        else if(0.75 < chosenValue < 1)
        {
            mon.y -= step;
        }
        monsterMove(mon);
        }, 2000);

    //xRandom =  Math.floor((Math.random() * 900) + 10);
    //Debugger.log(xRandom);

}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function canvasApp() {

    if (!canvasSupport()) {
        return;
    }
    // Game objects
    var monstersCaught = 0;
    var speed = 30
    var hero = {
        width: 20,
        height: 20, // movement in pixels per second
        x: canvas.width - 40,
        y: canvas.height / 2,
        draw: function () {
            var heroImage = new Image();
            heroImage.onload = function () {
                ctx.drawImage(heroImage, hero.x, hero.y);

            }
            heroImage.src = "../img/PlayerOneDetail.png";
        }
    }

    var background =
    {
        draw: function () {
            var bgImage = new Image();
            bgImage.onload = function () {
                ctx.drawImage(bgImage, 0, 0);
                ctx.fillStyle = "rgb(000, 250, 250)";
                ctx.font = "24px Helvetica";
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.fillText("Score: " + monstersCaught, 32, 32);
            }
            bgImage.src = "../img/field.png";
        }
    }

    var allowed = false;
    $(document).keyup(function (e) {
        allowed = true;
    });

    $(document).keydown(function (event) {
        var key = event.keyCode;
        if (allowed) {
            switch (key) {
                case 38: //up
                    hero.y -= speed;
                    event.preventDefault();
                    allowed = false;
                    break;
                case  39: //right
                    if (hero.x <= canvas.width - 50) {
                        hero.x += speed;
                        event.preventDefault();
                    }
                    else {
                        hero.x += 0;
                        event.preventDefault();
                    }
                    allowed = false;
                    break;
                case  37: //left
                    hero.x -= speed;
                    event.preventDefault();
                    allowed = false;
                    break;
                case  40: //down
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

// Reset the game when the player catches a monster
    function reset() {
        if (hero.x <= 60) {
            hero.x = canvas.width - 40;
            monstersCaught += 6;
        }
        else {
            hero.x = currentHeroX;
        }
        hero.y = canvas.height / 2;
    };

// Update game objects
    function update() {
        if (hero.x <= 60) {
            reset();
        }
    };

    //function updateMonster(){
    //    window.setTimeout(updateMonster, 2000);
    //    var newMonster = Object.create(monster);
    //    newMonster.draw();
    //    Debugger.log("new monster x: " + newMonster.x + " new monster y: " + newMonster.y);
    //}


// Draw everything
    Debugger.log("Drawing field");
    function render() {
        background.draw();
        hero.draw();
        draw(mon1);
        draw(mon2);
        if (gameOver) {
            ctx.fillStyle = "#FF0000";
            ctx.font = "40px Sans-Serif";
            ctx.fillText  ("You Got It!", 150, 180);
        }
        update();
    };

    function gameLoop() {
        window.setTimeout(gameLoop, 60);
        render();
    }

    gameLoop();
    monsterMove(mon1);
    monsterMove(mon2);


}