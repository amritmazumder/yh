var s;

//Document Ready
$(document).ready(function(){

	var winWidth = $(window).width();
	var winHeight = $(window).height();

	$('.container').css({
		'width': winWidth,
		'height': winHeight
	});

	$('.sketch').css({
		'height': winHeight
	});

	runSketch(winWidth, winHeight);

});


//Create a Sketch Object
function runSketch(winWidth, winHeight) {

	s = new Sketch();
	
}


//Define Object
//========================================================================================================================
function Sketch(){

	var canvas = d3.select('.sketch');
	var width = $('.sketch').width();
	var height = $('.sketch').height();

	//Load SVG
	var drawing = d3.xml("static/images/graphic/base.svg", "image/svg+xml", function(xml) { 			
 		canvas.each(function(){
 			var importedNode = xml.documentElement;
 			var graphic = this.appendChild(importedNode.cloneNode(true));
 			var svg = d3.select(graphic);
 			svg.attr({
 				'height': height
 			});

 			//On Load Functions
 			s.prepare();
 			s.draw();

 			$('.console').css({display:'none'}).delay(4000).fadeIn(300);
 		});
	});
}

Sketch.prototype.prepare = function() {


	//Set Up Initial Variables
	//========================================================================================================================
	var iphone = d3.select('#phone');
	var iphoneSignal = d3.select('#phoneTotsp').select('line');
	var tsp = d3.select('#tsp');
	var tspSignal = d3.select('#tspToweb').select('line');
	var webArtery = d3.select('#webArtery').select('path');
	var servChannel = d3.select('#servChannel').select('polyline');
	var servIcon = d3.select('#servIcon');
	var msgChannel = d3.select('#msgChannel').select('polyline');
	var msgIcon = d3.select('#msgIcon');
	var voipChannel = d3.select('#voipChannel').select('polyline');
	var voipIcon = d3.select('#voipIcon');
	var socialChannel = d3.select('#socialChannel').select('polyline');
	var socialIcon = d3.select('#socialIcon');
	var webIcon = d3.select('#wwwIcon');


	var msgBlock1 = d3.select('#msgBlock1').select('line');
	var msgBlock2 = d3.select('#msgBlock2').select('line');

	var voipBlock1 = d3.select('#voipBlock1').select('line');
	var voipBlock2 = d3.select('#voipBlock2').select('line');

	var msgToll = d3.select('#msgToll');
	var voipToll = d3.select('#voipToll');


	//Bind variables as objects
	//========================================================================================================================
	this.iphone = iphone;
	this.iphoneSignal = iphoneSignal;
	this.tsp = tsp;
	this.tspSignal = tspSignal;
	this.webArtery = webArtery;
	this.servChannel = servChannel;
	this.servIcon = servIcon;
	this.msgChannel = msgChannel;
	this.msgIcon = msgIcon;
	this.voipChannel = voipChannel;
	this.voipIcon = voipIcon;
	this.socialIcon = socialIcon;
	this.socialChannel = socialChannel;
	this.webIcon = webIcon;
	this.msgToll = msgToll;
	this.voipToll = voipToll;
	this.msgBlock1 = msgBlock1;
	this.msgBlock2 = msgBlock2;
	this.voipBlock1 = voipBlock1;
	this.voipBlock2 = voipBlock2;

	this.lines = [this.iphoneSignal, this.tspSignal, this.voipBlock1, this.msgBlock1, this.msgBlock2, this.voipBlock2];

	this.polylines = [this.servChannel, this.socialChannel, this.voipChannel, this.msgChannel];

	this.blocklines = [this.msgBlock1, this.msgBlock2, this.voipBlock1, this.voipBlock2];

	this.assets = [this.tsp, this.webIcon, this.servIcon, this.msgIcon, this.voipIcon, this.socialIcon];

	this.channeltypes = [this.servIcon, this.msgIcon, this.voipIcon, this.socialIcon];

	//Initial States
	//========================================================================================================================


		//Block Line Fixes
		for (var i = 0; i < this.blocklines.length; i++) {
			var origin = this.blocklines[i].attr('y1');
			var destination = this.blocklines[i].attr('y2');
			if (i == 1 || i == 3 || i == 0) {
				this.blocklines[i].attr({
					'y1' : destination,
					'y2' : origin
				});
			}
		}

		//Hover Fixes

		d3.select('#tsp').select('circle').attr({
			'fill': '#ffce00'
		});

		d3.select('#wwwIcon').select('circle').attr({
			'fill':'#ffce00'
		});

	
	msgToll.attr({
		'opacity':'0'
	});

	voipToll.attr({
		'opacity':'0'
	});

	//Collect Data
	//========================================================================================================================
	this.lineDest = [];
	this.lineOrigin = [];
	this.polylineData = [];

	//Collapse lines to origins
	for (var i = 0; i < this.lines.length; i++) {

		var origin = this.lines[i].attr('y1');
		var destination = this.lines[i].attr('y2');
		this.lineDest.push(destination);
		this.lineOrigin.push(origin);
	}



	//Convert Polylines to Paths
	for (var i = 0; i < this.polylines.length; i++) {
		var data = this.polylines[i].attr('points');
		this.polylineData.push(data);	
		this.polylines[i].remove();	
	}

	d3.select('#servChannel').append('path')
							.attr({
								'd': 'M' + this.polylineData[0],
								'fill': '#ffce00',
								'stroke-width': '4',
								'stroke': '#000000',
								'stroke-linecap':'round'
							});

	d3.select('#msgChannel').append('path')
								.attr({
									'd': 'M' + this.polylineData[1],
									'fill': '#ffce00',
									'stroke-width': '4',
									'stroke': '#000000',
									'stroke-linecap':'round'
								});

	d3.select('#voipChannel').append('path')
							.attr({
								'd': 'M' + this.polylineData[2],
								'fill': '#ffce00',
								'stroke-width': '4',
								'stroke': '#000000',
								'stroke-linecap':'round'
							});

	d3.select('#socialChannel').append('path')
								.attr({
									'd': 'M' + this.polylineData[3],
									'fill': '#ffce00',
									'stroke-width': '4',
									'stroke': '#000000',
									'stroke-linecap':'round'
								});

	this.servChannel = d3.select('#servChannel').select('path');
	this.msgChannel = d3.select('#msgChannel').select('path');
	this.voipChannel = d3.select('#voipChannel').select('path');
	this.socialChannel = d3.select('#socialChannel').select('path');

	this.polylinePaths = [this.servChannel, this.msgChannel, this.voipChannel, this.socialChannel];


	//Adding Text Examples to Channels

	d3.select('#servChannel')
		.append('g')
		.attr({
			'transform': 'translate(15,165)',
			'class':'examples'
		});
	
	var servEx = ['Wikipedia', 'News Sources', 'Online Education'];

	d3.select('#servChannel').select('.examples')
		.selectAll('text')
		.data(servEx)
		.enter()
		.append('text')
		.attr({
			'x': 0,
			'y': function(d,i) {
				return i * 20
			},
			'font-family': "proxima-nova",
			'font-weight': '900'
		})
		.text(function(d,i){
			return d
		});




	d3.select('#msgChannel')
	.append('g')
	.attr({
		'transform': 'translate(115,25)',
		'class':'examples'
	});
	
	var msgEx = ['Line', 'WhatsApp', 'WeChat'];

	d3.select('#msgChannel').select('.examples')
		.selectAll('text')
		.data(msgEx)
		.enter()
		.append('text')
		.attr({
			'x': 0,
			'y': function(d,i) {
				return i * 20
			},
			'font-family': "proxima-nova",
			'font-weight': '900'
		})
		.text(function(d,i){
			return d
		});


	d3.select('#voipChannel')
		.append('g')
		.attr({
			'transform': 'translate(495,25)',
			'class':'examples'
		});
		
		var voipEx = ['Skype', 'Facetime', 'Viber'];

		d3.select('#voipChannel').select('.examples')
			.selectAll('text')
			.data(voipEx)
			.enter()
			.append('text')
			.attr({
				'x': 0,
				'y': function(d,i) {
					return i * 20
				},
				'font-family': "proxima-nova",
				'font-weight': '900',
				'text-anchor':'end'
			})
			.text(function(d,i){
				return d
			});


	d3.select('#socialChannel')
		.append('g')
		.attr({
			'transform': 'translate(605,165)',
			'class':'examples'
		});
		
		var socialEx = ['Facebook', 'Twitter', 'Instagram'];

		d3.select('#socialChannel').select('.examples')
			.selectAll('text')
			.data(socialEx)
			.enter()
			.append('text')
			.attr({
				'x': 0,
				'y': function(d,i) {
					return i * 20
				},
				'font-family': "proxima-nova",
				'font-weight': '900',
				'text-anchor':'end'
			})
			.text(function(d,i){
				return d
			});


	//Interaction Events
	//========================================================================================================================
	$('.trigger').click(function(){
		s.draw();
		$('.without').addClass('hidden');
		$('.with').removeClass('hidden');
		$('.trigger .selected').removeClass('hidden');
		$('.trigger2 .selected').addClass('hidden');
	});


	$('.trigger2').click(function(){
		s.change();
		$('.without').removeClass('hidden');
		$('.with').addClass('hidden');
		$('.trigger .selected').addClass('hidden');
		$('.trigger2 .selected').removeClass('hidden');

		$('.pay1, .pay2').css({
			'opacity':'1'
		});
	});

	$('.pay1').click(function(){

		$('.msg-pay-tip').text('Good Job paying that extra cash');
		$(this).animate({
			'opacity':'0.4'
		}, 300);

		s.payOne();	
	});

	$('.pay2').click(function(){
		$('.voip-pay-tip').text('Good Job paying that extra cash');
		$(this).animate({
			'opacity':'0.4'
		}, 300);
		s.payTwo();
	});

	//Hover states
	//========================================================================================================================
	


	//Phone Tip

	$('body').on('mouseover', '#phone', function(e){

		$('.phone-tip').removeClass('hidden');

		d3.select('#phone')
			.transition()
			.attr({
				'transform': 'translate(-310, -540.14) scale(2)'
			});
		
	}).on('mousemove', '#phone', function(e){
		
		$('.phone-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#phone', function(){
		$('.phone-tip').addClass('hidden');
		d3.select('#phone')
			.transition()
			.attr({
				'transform': 'translate(0, 0) scale(1)'
			});
	});





	//TSP Tip
	$('body').on('mouseover', '#tsp', function(e){

		$('.tsp-tip').removeClass('hidden');
		
		d3.select('#tsp')
			.transition()
			.attr({
				'transform': 'translate(-310, -475.14) scale(2)'
			});

	}).on('mousemove', '#tsp', function(e){
		
		$('.tsp-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#tsp', function(){
		$('.tsp-tip').addClass('hidden');

		d3.select('#tsp')
			.transition()
			.attr({
				'transform': 'translate(0, 0) scale(1)'
			});
	});




	//Web tip
	$('body').on('mouseover', '#wwwIcon', function(e){

		$('.web-tip').removeClass('hidden');

		d3.select('#internet')
			.transition()
			.attr({
				'transform': 'translate(-310, -380.14) scale(2)'
			});
		
	}).on('mousemove', '#wwwIcon', function(e){
		
		$('.web-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#wwwIcon', function(){
		$('.web-tip').addClass('hidden');

		d3.select('#internet')
			.transition()
			.attr({
				'transform': 'translate(0, 0) scale(1)'
			});
	});




	//msg tip
	$('body').on('mouseover', '#msgChannel', function(e){

		$('.msg-tip').removeClass('hidden');
		
	}).on('mousemove', '#msgChannel', function(e){
		
		$('.msg-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#msgChannel', function(){
		$('.msg-tip').addClass('hidden');
	});



	//voip tip
	$('body').on('mouseover', '#voipChannel', function(e){

		$('.voip-tip').removeClass('hidden');
		
	}).on('mousemove', '#voipChannel', function(e){
		
		$('.voip-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#voipChannel', function(){
		$('.voip-tip').addClass('hidden');
	});



	//serv tip
	$('body').on('mouseover', '#servChannel', function(e){

		$('.serv-tip').removeClass('hidden');
		
	}).on('mousemove', '#servChannel', function(e){
		
		$('.serv-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#servChannel', function(){
		$('.serv-tip').addClass('hidden');
	});	



	//social tip
	$('body').on('mouseover', '#socialChannel', function(e){

		$('.social-tip').removeClass('hidden');
		
	}).on('mousemove', '#socialChannel', function(e){
		
		$('.social-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#socialChannel', function(){
		$('.social-tip').addClass('hidden');
	});


	//msg pay tip
		$('body').on('mouseover', '#msgToll', function(e){
			$('.msg-pay-tip').removeClass('hidden');
			
		}).on('mousemove', '#msgToll', function(e){
			
			$('.msg-pay-tip').css({
				'opacity': '1',
				'top': e.pageY + 10 + 'px',
				'left' : e.pageX + 10 + 'px'
			});
		}).on('mouseout', '#msgToll', function(){
			$('.msg-pay-tip').addClass('hidden');
		});
	

	//Voip pay tip
	$('body').on('mouseover', '#voipToll', function(e){

		$('.voip-pay-tip').removeClass('hidden');
		
	}).on('mousemove', '#voipToll', function(e){
		
		$('.voip-pay-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '#voipToll', function(){
		$('.voip-pay-tip').addClass('hidden');
	});



	//Pack tip
	$('body').on('mouseover', '.pay1', function(e){

		$('.msg-pack-tip').removeClass('hidden');

		d3.select('#msgToll')
			.transition()
			.attr({
				'transform': 'translate(-250, -275) scale(2)'
			});
		
	}).on('mousemove', '.pay1', function(e){
		
		$('.msg-pack-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '.pay1', function(){
		$('.msg-pack-tip').addClass('hidden');

		d3.select('#msgToll')
			.transition()
			.attr({
				'transform': 'translate(0, 0) scale(1)'
			});
	});



	//Pack tip
	$('body').on('mouseover', '.pay2', function(e){

		$('.voip-pack-tip').removeClass('hidden');

		d3.select('#voipToll')
			.transition()
			.attr({
				'transform': 'translate(-362, -275) scale(2)'
			});
		
	}).on('mousemove', '.pay2', function(e){
		
		$('.voip-pack-tip').css({
			'opacity': '1',
			'top': e.pageY + 10 + 'px',
			'left' : e.pageX + 10 + 'px'
		});
	}).on('mouseout', '.pay2', function(){
		$('.voip-pack-tip').addClass('hidden');

		d3.select('#voipToll')
			.transition()
			.attr({
				'transform': 'translate(0,0) scale(1)'
			});
	});


}



Sketch.prototype.draw = function(){
	
	var duration = 300;
	var delay = duration/3;
	var easing = 'linear';

	//Reset
	this.voipToll
		.transition()
		.duration(duration)
		.attr({
			'opacity': 0
		});

	this.msgToll
		.transition()
		.duration(duration)
		.attr({
			'opacity': 0
		});

	for (var i = 4; i < this.lines.length; i++) {
		this.lines[i]
			.attr({
				'y1': this.lineOrigin[i]
			});
	}

	//Animate Vertical Lines
	for (var i = 0; i < this.lines.length; i++) {

		var origin = this.lines[i].attr('y1');

		this.lines[i].attr({
			'y2': origin
		});


		//Animate Phone to TSP, then TSP to Web
		if (i == 0) {
			this.lines[i]
				.attr({
						'stroke-width':'4'
					})
				.transition()
				.ease(easing)
				.duration(duration)
				.delay(i * delay)
				.attr({
					'y2': this.lineDest[i],
					'stroke-width': '8'
				});

		
		}

		else if(i == 1){
			this.lines[i]
				.attr({
					'stroke-width':'4'
				})
				.transition()
				.ease(easing)
				.duration(duration)
				.delay((i+14) * delay)
				.attr({
					'y2': this.lineDest[i],
					'stroke-width': '8'
				});
		}
		//Animate Web to Blockers
		 else if (i == 2 || i == 3) {
			this.lines[i]
				.attr({
					'stroke-width':'4'
				})
				.transition()
				.ease(easing)
				.duration(duration)
				.delay(20 * delay)
				.attr({
					'y2': this.lineDest[i],
					'stroke-width': '12'
				});
		}

		//Animate Blockers to Channels			
		 else {
			this.lines[i]
				.transition()
				.ease(easing)
				.duration(duration)
				.delay(25 * delay)
				.attr({
					'y2': this.lineDest[i]
				});
		}

	
	}

	//Bolden Important Connections
	this.webArtery
		.attr({
			'stroke-width':'4'
		})
		.transition()
		.ease(easing)
		.delay(20 * delay)
		.attr({
			'stroke-width': '12'
		});

	//Animate Web and tsp Icons

	this.tsp.select('circle')
			.attr({
				'stroke-width': '0'
			})
			.transition()
			.ease(easing)
			.delay(10 * delay)
			.attr({
				'stroke-width': '8'
			});

	this.webIcon.attr({
		'opacity':0
		})
		.transition()
		.ease(easing)
		.delay(40 * delay)
		.attr({
			'opacity': '1'
		});

	//Animate Polylines
	for (var i = 0; i < this.polylines.length; i++) {
		var totalLength = this.polylinePaths[i].node().getTotalLength();

		this.polylinePaths[i]
				.attr('stroke-dasharray', totalLength + " " + totalLength)
				.attr('stroke-dashoffset', -totalLength)
				.transition()
				.ease('cubic-out')
				.duration(duration * 3)
				.delay(28 * delay)
				.attr({
					'stroke-dashoffset': 0
				});
	}

	//Animate Channel Types
	for(var i = 0; i < this.channeltypes.length; i++) {
		
		this.channeltypes[i].attr({
			'opacity': '0'
		});

		this.channeltypes[i]
			.transition()
				.ease(easing)
				.duration(duration)
				.delay(37 * delay)
				.attr({
					'opacity': '1'
				});
	}

	d3.selectAll('.examples')
		.attr({
			'opacity':'0'
		})
		.transition()
		.duration(duration)
		.delay(37*delay)
		.attr({
			'opacity':'1'
		});
	
	console.log('drawn!');
}

Sketch.prototype.change = function(){

	var duration = 300;
	var delay = duration/3;
	var easing = 'linear';

	this.voipToll
		.attr({
			'opacity': 0
		})
		.transition()
		.duration(duration)
		.delay(delay)
		.ease(easing)
		.attr({
			'opacity': '1'
		});

	this.msgToll
		.attr({
			'opacity': 0
		})
		.transition()
		.delay(delay)
		.duration(duration)
		.ease(easing)
		.attr({
			'opacity': '1'
		});

	d3.select('.voipFill')
		.transition()
		.duration(duration)
		.attr({
			'fill': '#ffffff'
		});


	d3.select('.msgFill')
		.transition()
		.duration(duration)
		.attr({
			'fill': '#ffffff'
		});

	for (var i = 4; i < this.lines.length; i++) {
		this.lines[i]
			.attr({
				'y2': this.lineDest[i]
			})
			.transition()
			.duration(duration * 2)
			.delay(delay * 13.1)
			.attr({
				'y2': this.lineOrigin[i]
			});
	}

	for (var i = 1; i < 3; i++) {
		var totalLength = this.polylinePaths[i].node().getTotalLength();

		this.polylinePaths[i]
				.attr('stroke-dasharray', totalLength + " " + totalLength)
				.attr('stroke-dashoffset', 0)
				.transition()
				.delay(delay * 7)
				.ease('cubic-out')
				.duration(duration * 3)
				.attr({
					'stroke-dashoffset': -totalLength
				});
	}
}

Sketch.prototype.payOne = function() {

	var duration = 300;
	var delay = duration/3;
	var easing = 'linear';
	
	d3.select('.msgFill')
		.transition()
		.duration(duration)
		.attr({
			'fill': '#3bbf82'
		});

	for (var i = 1; i < 2; i++) {
		var totalLength = this.polylinePaths[i].node().getTotalLength();

		this.polylinePaths[i]
				.attr('stroke-dasharray', totalLength + " " + totalLength)
				.attr('stroke-dashoffset', -totalLength)
				.transition()
				.delay(delay * 13.1)
				.ease('cubic-out')
				.duration(duration * 3)
				.attr({
					'stroke-dashoffset': 0
				});
	}

	for (var i = 4; i < 5; i++) {
		this.lines[i]
			.attr({
				'y2': this.lineOrigin[i]
			})
			.transition()
			.duration(duration * 2)
			.delay(delay * 7)
			.attr({
				'y2': this.lineDest[i]
			});
	}
}

Sketch.prototype.payTwo = function() {
	var duration = 300;
	var delay = duration/3;
	var easing = 'linear';

	d3.select('.voipFill')
		.transition()
		.duration(duration)
		.attr({
			'fill': '#ff5656'
		});

	for (var i = 2; i < 3; i++) {
		var totalLength = this.polylinePaths[i].node().getTotalLength();

		this.polylinePaths[i]
				.attr('stroke-dasharray', totalLength + " " + totalLength)
				.attr('stroke-dashoffset', -totalLength)
				.transition()
				.delay(delay * 13.1)
				.ease('cubic-out')
				.duration(duration * 3)
				.attr({
					'stroke-dashoffset': 0
				});
	}

	for (var i = 5; i < 6; i++) {
		this.lines[i]
			.attr({
				'y2': this.lineOrigin[i]
			})
			.transition()
			.duration(duration * 2)
			.delay(delay * 7)
			.attr({
				'y2': this.lineDest[i]
			});
	}
}
