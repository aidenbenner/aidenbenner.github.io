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
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbToHex(v) {
    for(var i = 0; i<3;i++){
        v[0] = Math.round(v[0]);
    }
    return "#" + componentToHex(v[0]) + componentToHex(v[1]) + componentToHex(v[2]);
}


function generateRandomRGB(min, max){
   var colors = [];
   for(var i = 0; i<3; i++){
        colors.push(Math.round(Math.random() * (max - min) + min)); 
   }
   return colors;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var out = [];
    out.push(parseInt(result[1], 16));
    out.push(parseInt(result[2], 16));
    out.push(parseInt(result[3], 16));
    
    return out;
}


function getDistance(colA, colB){

}

function increment(colA, colB){
    colA = hexToRgb(colA);
    colB = hexToRgb(colB);
    var colOut = [];
    var delta = []; 
    for(var i = 0; i<3; i++){
        delta.push(colB[i] - colA[i]);
        if(delta[i] > 0){
            colOut[i] = Math.round(colA[i] + 1);
        }
        else{
            colOut[i] = Math.round(colA[i] - 1);
        }
        if(colOut[i] > 255) colOut[i] = 255; 
        if(colOut[i] < 0) colOut[i] = 0; 
    }
    return rgbToHex(colOut);
}

var startColor = rgbToHex(generateRandomRGB(100, 255));
var endColor = "#EEEEEE";
var colorSet = rgbToHex(generateRandomRGB(100, 255));

var initTime = 0; 
function nextColor(){
    startColor = increment(startColor, colorSet);
    updateBackground();
}

function changeSetpoint(){
    colorSet  = rgbToHex(generateRandomRGB(100, 255));
}
setInterval(nextColor, 100);
setInterval(changeSetpoint,1000);
function updateBackground(){
    var grd=ctx.createLinearGradient(0,0,50,canvas.height * 4/4);
    grd.addColorStop(0,startColor);
    grd.addColorStop(1,endColor);

    ctx.fillStyle=grd;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.stroke();
}


