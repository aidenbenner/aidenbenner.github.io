var Exam = class {
  constructor(name, datestr) {
    this.name = name
    this.date = new Date(datestr)
  }
}

var exams = [] 
exams.push(new Exam("ECE 222", "December 7, 2017 9:00:00"))
exams.push(new Exam("CS 241E", "December 9, 2017 12:30:00"))
exams.push(new Exam("STAT 206 ", "December 12, 2017 4:00:00"))
exams.push(new Exam("SE 212", "December 14, 2017 12:30:00"))
exams.push(new Exam("CHE 102", "December 19, 2017 9:00:00"))

var pairs = [] 

function pad_2_dig(a)
{
  if(a < 10)
    return "0" + a; 
  return a + "";
}

for(var i = 0; i<exams.length; i++ ){
  var div = document.createElement("div")
  var h = document.createElement("h2")
  var p = document.createElement("p")
  h.innerHTML = exams[i].name
  div.appendChild(h)
  div.appendChild(p)

  pairs.push(p)
  document.getElementById("title").appendChild(div)
}

function date_diff_str(a,b)
{
  var diff_ms = b - a; 
  if(diff_ms < 0) return "DONE"
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
  hours  = Math.abs(hours);
  days = Math.abs(days); 

  return days + ":" + pad_2_dig(hours) + ":" + pad_2_dig(minutes) + ":" + pad_2_dig(seconds); 
}

function tick ()
{
  today = new Date();
  for(var i = 0; i<exams.length; i++ ){
    pairs[i].innerHTML = date_diff_str(today.getTime(), exams[i].date.getTime())
  }
}

tick();

setInterval(tick,1000);
