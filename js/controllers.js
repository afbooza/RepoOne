angular.module('app.controllers', [])
.controller('homeController',['$scope', '$http', function($scope, $http){
	$http.get("http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&appid=000547a82f0019492affae60ec6e0b88")
		.success(function(data, status, headers, config)
	{
		$scope.weather = data;
		var tempKelvin = data.main.temp;
		var tempFaren = tempKelvin * (9/5) - 459.67;
		var maxTemp = data.main.temp_max * (9/5) - 459.67;
		$scope.maxTemp = maxTemp.toPrecision(3);
		var minTemp = data.main.temp_min * (9/5) - 459.67;
		$scope.minTemp = minTemp.toPrecision(3);
		$scope.tempFaren = tempFaren.toPrecision(3)	;
	}).
	error(function(data,status,headers,config){
		messageBox.show("error");
	})
}]);
app
.controller('mediaController',['$scope', '$http', function($scope, $http){
	var next = $("#next");
	var prev = $("#prev");
	var numOfPanels = 9;
	var degree = 0;
	var degreeIncrement = 360 / numOfPanels;

	next.click(function()
	{
		for(var i = 0; i <= numOfPanels; i++)
		{
			degree = degree + degreeIncrement;
			$("figure").eq(i).css({"-webkit-transform" : "rotateY( " + degree + "deg) translateZ( 288px )",
				"transform" : "rotateY( " + degree + "deg) translateZ( 288px )"});
		}
	});

	prev.click(function()
	{
		for(var i = 0; i <= numOfPanels; i++)
		{
			degree = degree - degreeIncrement;
			$("figure").eq(i).css({"-webkit-transform" : "rotateY( " + degree + "deg) translateZ( 288px )",
				"transform" : "rotateY(" + degree + "deg) translateZ( 288px )"});
		}
	});
}])
	.controller('gameController',['$scope', '$http', function($scope, $http){
		//location.reload();




		function Monster(){
			this.x = xRandom();
			this.y = yRandom();
		}

		var frameRate = 60;
		var numMonster = 40;

		var mon = [];

		var heroNormPath = "img/heroNorm.png";
		var heroTackledPath = "img/pTackled.png";

		var xStart = 0;

		var yStart = 0;

		for(var i = 1; i < numMonster; i++){
			mon[i] = new Monster();
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


		function canvasSupport() {
			return Modernizr.canvas;
		}

		var gameOver;
		function yRandom() { return Math.floor(Math.random() * (460 + yStart)) + yStart}
		function xRandom() { return Math.floor(Math.random() * (920 + xStart - 50)) + xStart + 50}


		function draw(Monster){
			var monsterImage = new Image();
			monsterImage.onload = function(){
				ctx.drawImage(monsterImage, Monster.x, Monster.y)
			}
			monsterImage.src = "img/DetailPlayer.png";
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
					ctx.drawImage(heroImage, hero.x , hero.y );

				}
				heroImage.src = imgPath;
			}
		}
		var score = 0;
		var speed = 30
		var startTime = new Date();
		var elapsed = parseInt((new Date() - startTime) / 1000);
		var clockTime = 120 - elapsed;
		var minutes = Math.floor(clockTime / 60);
		var seconds = clockTime - minutes * 60;



		function playerTackled(){
			hero.draw(heroTackledPath);
		}



		var background =
		{
			draw: function () {
				var bgImage = new Image();
				bgImage.onload = function () {
					ctx.drawImage(bgImage, xStart, yStart);
					ctx.fillStyle = "rgb(000, 250, 250)";
					ctx.font = "24px Helvetica";
					ctx.textAlign = "left";
					ctx.textBaseline = "top";
					ctx.fillText("Score: " + score, 32 + xStart, 32 + yStart);
					ctx.fillText("Clock: " + elapsed, 300 + xStart, 32 + yStart)
				}
				bgImage.src = "img/field.png";
			}
		}

		$scope.canvasApp = function() {

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
				if (hero.x <= xStart + 60) {
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
				if (hero.x <= xStart + 40) {
					reset();
				}
				if(hero.y < yStart + 10){
					hero.y = yStart + 10;
				}
				if(hero.y > yStart + 460){
					hero.y = yStart + 460;

				}
				for(var i = 1; i < numMonster; i++) {
					if(mon[i].y > canvas.height - 40){
						mon[i].y = canvas.height - 40
					}
					if(mon[i].y < yStart + 20){
						mon[i].y = yStart + 20
					}
					if(mon[i].x > canvas.width - 80){
						mon[i].x = canvas.width - 80
					}
					if(mon[i].x < xStart + 60){
						mon[i].x = xStart + 60
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
				//drawElapsedTime();
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


