/**
 * Created by afbooza on 10/13/2015.
 */
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
// Create the canvas
var tileWidth = 50;
var tileHeight = 50;
var tiles = [];
var WIDTH = 1000;
var HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

function Background()
{
    drawBackground();
    this.width = WIDTH;
    this.height = HEIGHT;
    this.x = 0;
    this.y = 0;
    var amountOfTiles = (WIDTH/tileWidth)*(HEIGHT/tileHeight);
    for (var i = 0; i < amountOfTiles; i++) {
        tiles.push(new Tile(i));
    }
    xPos = 0-tileWidth;
    tileCount = 1;
    rows = 0;
    tilesPerRow = mapWidth/tileWidth;
    for (i in tiles) {
        t = tiles[i];
        xPos += t.width;
        t.x = xPos;

        if (tileCount == tilesPerRow) {
            t.y += t.height*rows;
            rows++;
            tileCount = 1;
            xPos = 0-tileWidth;
        } else {
            t.y = tileHeight*rows;
            tileCount++;
        }
        tileToContext(t);
    }
}
function drawBackground(){
    bgImage = new Image();
    bgReady= false;
    bgImage.onload = function () {
        bgReady = true;
    }
    bgImage.src = "../img/field.png";
    ctx.drawImage(bgImage, 0, 0);
}

