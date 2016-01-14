angular.module('app.controllers', [])
    .controller('gameController',['$scope', '$http', function($scope, $http){

                window.addEventListener("load", eventWindowLoaded, false);

                function Monster(){
                    this.x = xRandom();
                    this.y = yRandom();
                }

                var frameRate = 60;
                var numMonster = 40;

                var mon = [];

                var heroNormPath = "../img/heroNorm.png";
                var heroTackledPath = "../img/pTackled.png";

                for(var i = 1; i < numMonster; i++){
                    mon[i] = new Monster();
                    console.log(mon[i]);
                }

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
                function yRandom() { return Math.random() * (480 - 0) + 20}
                function xRandom() { return Math.random() * (920 - 50) + 50}


                function draw(Monster){
                    var monsterImage = new Image();
                    monsterImage.onload = function(){
                        ctx.drawImage(monsterImage, Monster.x, Monster.y)
                    }
                    monsterImage.src = "../img/DetailPlayer.png";
                }

                function monsterMove(mon){
                        setTimeout(function () {
                                var chosenValue = Math.random();
                                var step = 30;

                                if (chosenValue < 0.25) {
                                    mon.x += step;
                                    //Debugger.log("forward" + chosenValue);
                                }
                                else if (0.5 > chosenValue && chosenValue > 0.25) {
                                    mon.x -= step;
                                    //Debugger.log("backwards" + chosenValue);
                                }
                                else if (0.5 < chosenValue && chosenValue < 0.75) {
                                    mon.y += step;
                                    //Debugger.log("up" + chosenValue);
                                }
                                else if (0.75 < chosenValue && chosenValue < 1) {
                                    mon.y -= step;
                                    //Debugger.log("down" + chosenValue);
                                }
                                monsterMove(mon);

                            }
                            ,
                            2000);
                    }
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                // Game objects
                var hero = {
                    width: 20,
                    height: 20, // movement in pixels per second
                    x: canvas.width - 40,
                    y: canvas.height / 2,
                    draw: function (imgPath) {
                        var heroImage = new Image();
                        heroImage.onload = function () {
                            ctx.drawImage(heroImage, hero.x, hero.y);

                        }
                        heroImage.src = imgPath;
                    }
                }
                var score = 0;
                var speed = 30
                var startTime = new Date();


                function playerTackled(){
                    hero.draw(heroTackledPath);
                }

                function drawElapsedTime() {
                    var elapsed = parseInt((new Date() - startTime) / 1000);
                    console.log("here");
                    ctx.save();
                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    ctx.font = "14px Verdana"
                    // draw the running time at half opacity
                    ctx.globalAlpha = 0.50;
                    ctx.fillText("Clock: " + elapsed, 200, 32);
                    ctx.restore();
                    Debugger.log("elapsed" + elapsed);
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
                            ctx.fillText("Score: " + score, 32, 32);
                            Debugger.log("background");
                        }
                        bgImage.src = "../img/field.png";
                    }
                }

                function canvasApp() {

                    if (!canvasSupport()) {
                        return;
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
                            score += 6;
                        }
                        else {
                            hero.x = canvas.width - 40;
                        }
                        hero.y = canvas.height / 2;

                    };

                // Update game objects
                    function update() {
                        if (hero.x <= 40) {
                            reset();
                        }
                        if(hero.y < 10){
                            hero.y = 10;
                        }
                        if(hero.y > 460){
                            hero.y = 460;

                        }
                        for(var i = 1; i < numMonster; i++) {
                            if(mon[i].y > canvas.height - 40){
                                mon[i].y = 460
                            }
                            if(mon[i].y < 20){
                                mon[i].y = 20
                            }
                            if(mon[i].x > canvas.width - 80){
                                mon[i].x = 920
                            }
                            if(mon[i].x < 60){
                                mon[i].x = 60
                            }
                            var distance = Math.sqrt(Math.pow((hero.x - mon[i].x), 2) + Math.pow((hero.y - mon[i].y), 2));
                            if (distance <= 30) {
                                setTimeout(
                                    function()
                                    {
                                        playerTackled();
                                        frameRate = 0;
                                    }, 2000);
                                reset();
                            }
                        }
                    };

                // Draw everything
                    Debugger.log("Drawing field");
                    function render() {
                        background.draw();
                        drawElapsedTime();
                        hero.draw(heroNormPath);
                        for(var i = 1; i< numMonster; i++)
                        {
                            draw(mon[i]);
                        }
                        if (gameOver) {
                            ctx.fillStyle = "#FF0000";
                            ctx.font = "40px Sans-Serif";
                            ctx.fillText  ("You Got It!", 150, 180);
                        }
                        update();
                    };

                    function gameLoop() {
                        window.setTimeout(gameLoop, frameRate);
                        render();

                    }

                    gameLoop();
                    for(var i = 1; i<numMonster; i++)
                    {
                        monsterMove(mon[i]);
                    }


                }

}]);