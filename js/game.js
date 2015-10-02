var field_width = 600,
  field_height = 400,
  time_per_frame = 33,
  game_fonts = "bold 20px sans-serif";

var counterX = 100,
  counterY = 100;

var field = document.getElementById("field");
field.width = field_width;
field.height = field_height;
var ctx = field.getContext("2d");
ctx.fillStyle="green";
ctx.font = game_fonts;

var gameloop = setInterval(update, time_per_frame);

var counter = 0;

function update()
{
  counter++;

  ctx.fillStyle="#AAA";
  ctx.fillRect(0,0, field.width, field.height);

  ctx.fillStyle="#000";
  ctx.fillText(counter, counterX, counterY);
}
