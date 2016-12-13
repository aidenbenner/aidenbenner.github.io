var p_115 = document.getElementById("115");
var p_117 = document.getElementById("117");
var p_137  = document.getElementById("137");
var p_140 = document.getElementById("140");
var p_105 = document.getElementById("105");

var today = new Date();
var d_117 = new Date("December 8, 2016 14:00:00");
var d_140 = new Date("December 10, 2016 12:30:00");
var d_115 = new Date("December 12, 2016 18:30:00");
var d_137 = new Date("December 15, 2016 12:30:00");
var d_105 = new Date("December 16, 2016 12:30:00");

function pad_2_dig(a)
{
  if(a < 10)
    return "0" + a; 
  return a + "";
}

function date_diff_str(a,b)
{
  var diff_ms = b - a; 
  var seconds = diff_ms / 1000; 
  var minutes = seconds / 60; 
  var hours = minutes / 60; 
  var days = hours / 24; 
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  seconds = Math.floor(seconds);
  minutes = Math.floor(minutes);
  hours = Math.floor(hours);
  days = Math.floor(days);

  seconds = Math.abs(seconds);
  minutes = Math.abs(minutes);
  hours  = Math.abs(hours );
  days = Math.abs(days); 

  return days + ":" + pad_2_dig(hours) + ":" + pad_2_dig(minutes) + ":" + pad_2_dig(seconds); 
}

p_117.value = "test";
function tick ()
{
  today = new Date();
  p_115.innerHTML = date_diff_str(today.getTime(),d_115.getTime());
  p_117.innerHTML = date_diff_str(today.getTime(),d_117.getTime());
  p_137.innerHTML = date_diff_str(today.getTime(),d_137.getTime());
  p_140.innerHTML = date_diff_str(today.getTime(),d_140.getTime());
  p_105.innerHTML = date_diff_str(today.getTime(),d_105.getTime());
}
tick();

setInterval(tick,1000);
