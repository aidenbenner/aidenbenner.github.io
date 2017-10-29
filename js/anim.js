var canvas = document.getElementById('can'); 
var ctx = canvas.getContext('2d');
// ctx.globalCompositeOperation = "multiply";

var xmax = canvas.width = window.innerWidth; 
var ymax = canvas.height = window.innerHeight; 
var rmax = canvas.width / 10; 
var rmin  = 20;

var circles = []; 
var circNum = 40; 

var maxv = 1; 

for(var i = 0; i<circNum; i++){
  var col = new Object(); 
  var up = 180; 
  col.r = Math.random() * (215 - up)  + up; 
  col.g = Math.random() * (215 - up) + up; 
  col.b = Math.random() * (215 - up)+ up; 
  col.r = Math.round(col.r); 
  col.g = Math.round(col.g); 
  col.b = Math.round(col.b); 
  col.a = Math.random(); 

  var vx = 2 * Math.random() * maxv - maxv;
  var vy = 2 * Math.random() * maxv - maxv; 


  var c = circle(xmax * Math.random(), ymax * Math.random(), rmin + rmax * (Math.random() ** 2), col, vx, vy); 
  circles.push(c); 
}

function circle(x,y,r,col, vx, vy) {
  var circ = new Object(); 
  circ.x = x; 
  circ.y = y; 
  circ.r = r; 
  circ.col = col; 
  circ.vx = vx; 
  circ.vy = vy; 
  return circ;
}
function rgbatostr(r,g,b,a){
  return 'rgba(' + r + ',' + g + ','+ b + ','+ a + ')';
}

function tick() {
  if(xmax != window.innerWidth)
    xmax = canvas.width = window.innerWidth; 
  for(var i = 0; i<circNum; i++){
    circles[i].x += circles[i].vx; 
    circles[i].y += circles[i].vy; 
    var x = circles[i].x; 
    var y = circles[i].y; 
    var r = circles[i].r; 

    if(x + r < -r * 4) {
      circles[i].x = canvas.width + 2 * r; 
      return;
    }
    if(y + r < -r * 4) {
      circles[i].y = canvas.height + 2 * r; 
      return;
    }
    if(y + r > 4 * r + canvas.height){
      circles[i].y = 0 - 2 * r; 
      return;
    }
    if(x + r > 4 * r + canvas.width){
      circles[i].x = 0 - 2 * r; 
    }
  }

}

function draw() {
  ctx.fillStyle = '#0D8FFF'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i<circNum; i++){
    ctx.beginPath();
    ctx.fillStyle = rgbatostr(circles[i].col.r, circles[i].col.g, circles[i].col.b, circles[i].col.a); 
    ctx.arc(circles[i].x,   circles[i].y, circles[i].r, 0, 2 * Math.PI); 
    // ctx.stroke(); 
    ctx.fill(); 
  }
}

//don't laugh... draw + tick 
function dick() {
  tick(); 
  draw(); 
  window.requestAnimationFrame(dick);
}
window.requestAnimationFrame(dick);

