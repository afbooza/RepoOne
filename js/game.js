$(document).keyup(function (e) {
    allowed = true;
});

function heroVert(direction) {
    hero.y += direction;

    allowed = false;
}

function heroHorz(direction) {
    hero.x += direction;
    allowed = false;
}
var up = heroVert(-30);
var right = heroHorz(-30);
var left = heroHorz(30);
var down = heroVert(30);
var stop = heroHorz(0);

$(document).keydown(function (event) {
    var key = event.keyCode;
    if (allowed) {
        switch (key) {
            case 38: //up
                queue.push(up);
                event.preventDefault();
                break;
            case  39: //right
                if(hero.x <= canvas.width - 50) {
                    queue.push(right);
                    event.preventDefault();
                }
                else{
                    queue.push(stop);
                    event.preventDefault();
                }
                break;
            case  37: //left
                queue.push(left);
                event.preventDefault();
                break;
            case  40: //down
                queue.push(down);
                event.preventDefault();
                break;
            default:
                allowed = false;
                event.preventDefault();
        }
    }
});


function updateEntity(entity, speedY, speedX) {
    if(Math.random < 0.5) {
        entity.x += speedX;
        monsterImage.src = "../img/DetailPlayer.png";
        ctx.drawImage(monsterImage, entity.x, entity.y);
        if (entity.x < 0 || entity.x > canvas.width) {
            //console.log("Out of bounds");
            entity.speedX = -entity.speedX;
            return entity;
        }
        //if (entity.y < 0 || entity.y > canvas.height) {
        //    entity.speedY = -entity.speedY;
        //    //console.log("Out of bounds");
        //}
        return entity;
    }
    else{
        entity.y += speedY;
        monsterImage.src = "../img/DetailPlayer.png";
        ctx.drawImage(monsterImage, entity.x, entity.y);
        //if (entity.x < 0 || entity.x > canvas.width) {
        //    //console.log("Out of bounds");
        //    entity.speedX = -entity.speedX;
        //}
        if (entity.y < 0 || entity.y > canvas.height) {
            entity.speedY = -entity.speedY;
            //console.log("Out of bounds");
            return entity;
        }
        return entity;
    }

}

// Reset the game when the player catches a monster
var reset = function () {
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
function update(counter) {
    queue[counter]();
    if (hero.x <= 60) {
        reset();
    }
};

function drawEnemies(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var monsters = []
    for (var key in monsterList) {
        updateEntity(monsterList[key], speedY(), speedX());
        monsters.push();
    }
    return monsters;
}

// Draw everything
function render(counter) {
    background.draw();
    hero.draw();
    update(counter);
    ctx.fillStyle = "rgb(000, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + monstersCaught, 32, 32);
};

// The main game loop
function main () {
    render(counter);
    //update();
    counter++;
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
var monsters = [];

monsters = setInterval(function(){queue.push(drawEnemies)}, 2000);
requestAnimationFrame(main(counter));
console.log(counter);