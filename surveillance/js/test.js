var caption = ["This is the NSA", "It's been a pleasure"];
var mic;
var status = 0;

function setup(){
  mic = new p5.AudioIn();
  mic.start();
  createCanvas(windowWidth, windowHeight)
  background(0);
  var trial = d3.select('.signal');
  var bar = trial.append('svg').append('rect').attr({'x':0,'y':0,'height':10,'class':'bar','fill':'black'});
}


function draw(){
		drawAudio();
}

var running = false;

function drawAudio() {
	
	
	micLevel = mic.getLevel();
  	levelPos = micLevel * 1000;

  	if (levelPos > (10)) {	
  		audioRunning(levelPos);
  		running = true;
  		// $('.signal').css({
  		// 	'background-color': 'yellow'
  		// });
  	} else {
  		runCounter = 0;
  		running = false;
  		// $('.signal').delay(3000).css({
  		// 	'background-color': 'red'
  		// });
  		$('html, body').stop();
  	}

  	d3.select('.bar').attr({'width': micLevel * 1000});
}



function audioRunning(levelPos) {
	var scrollTop = $('body').scrollTop();
	console.log(scrollTop);

	$('body').scrollTop(scrollTop + 5);

}



// var mic;
// function setup(){
//   mic = new p5.AudioIn()
//   mic.start();
// }
// function draw(){
//   background(0);
//   micLevel = mic.getLevel();
//   ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
// }