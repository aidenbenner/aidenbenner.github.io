

var canvas = document.getElementById("headercanvas");
var ctx = canvas.getContext("2d");
if(canvas){
    console.log("FOUND");
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var startColor = "#AAAAFF";
var norm = 80;
var r = 0;
var g = 0;
var b = 0;

function nextColor(){
    var mult = 3;
    var max = 50;
    var tilt = 1 * ((max / 2) -  (max - r));
    r += mult * (Math.random() - 1) ;
    g += mult * (Math.random() - 1) ;
    b += mult * (Math.random() - 1) ;

    if(Math.abs(r ) > max){
        r = (max) * r / Math.abs(r);
    }
    if(Math.abs(g ) > max){
        g = (max) * g / Math.abs(g);
    }
    if(Math.abs(b ) > max){
        b = (max) * b / Math.abs(b);
    }
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    startColor = rgbToHex(norm + r, norm + g, norm + b);
    updateBackground();
    console.log(r + "   " + g + "   " + b + "    " + startColor);
}

setInterval(nextColor, 50);
function updateBackground(){
    ctx.fillStyle=startColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.stroke();
}


