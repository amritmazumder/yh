$(document).ready(function(){
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	
	//Flash Full Screen
	var checker;
		
		var flash = function(){
			if (checker) {
				$(".flash").css({opacity: 0});
				checker = false;
			} else {
				$(".flash").css({opacity: 1});
				checker = true;
			}
			setTimeout(flash,600);
		}
		flash();

		//popups

		$(".popup-one").click(function(){

			// x = 2, y = 10
			var wRange1 = winWidth/3;
			var wRange2 = winWidth - wRange1;

			var hRange1 = winHeight/3;
			var hRange2 = winHeight - hRange1;

			console.log(event.x, event.y)
			//window.open('http://www.rough.pw', 'height=400, width=700');
			$('.ad1').removeClass('hidden');
			$('.ad1').animate({
				'width': '400px',
				'height': '300px',
				'background': 'yellow',
				'display' : 'block',
				'top': Math.floor(Math.random() * ((hRange2-hRange1)+hRange1)),
				'left': Math.floor(Math.random() * ((wRange2-wRange1)+wRange1))
			}, 300);

		});





		$(".popup-two").click(function(){

			// x = 2, y = 10
			var wRange1 = winWidth/3;
			var wRange2 = winWidth - wRange1;

			var hRange1 = winHeight/3;
			var hRange2 = winHeight - hRange1;

			console.log(event.x, event.y)
			//window.open('http://www.rough.pw', 'height=400, width=700');
			$('.ad2').removeClass('hidden');
			$('.ad2').animate({
				'width': '100px',
				'height': '700px',
				'background': 'yellow',
				'display' : 'block',
				'top': Math.floor(Math.random() * ((hRange2-hRange1)+hRange1)),
				'left': Math.floor(Math.random() * ((wRange2-wRange1)+wRange1))
			}, 300);

		});



		$(".popup-three").click(function(){

			// x = 2, y = 10
			var wRange1 = winWidth/3;
			var wRange2 = winWidth - wRange1;

			var hRange1 = winHeight/3;
			var hRange2 = winHeight - hRange1;

			console.log(event.x, event.y)
			//window.open('http://www.rough.pw', 'height=400, width=700');
			$('.ad3').removeClass('hidden');
			$('.ad3').animate({
				'width': '900px',
				'height': '300px',
				'background': 'yellow',
				'display' : 'block',
				'top': Math.floor(Math.random() * ((hRange2-hRange1)+hRange1)),
				'left': Math.floor(Math.random() * ((wRange2-wRange1)+wRange1))
			}, 300);

		});



		$(".popup-four").click(function(){

			// x = 2, y = 10
			var wRange1 = winWidth/3;
			var wRange2 = winWidth - wRange1;

			var hRange1 = winHeight/3;
			var hRange2 = winHeight - hRange1;

			console.log(event.x, event.y)
			//window.open('http://www.rough.pw', 'height=400, width=700');
			$('.ad4').removeClass('hidden');
			$('.ad4').animate({
				'width': '600px',
				'height': '600px',
				'background': 'yellow',
				'display' : 'block',
				'top': Math.floor(Math.random() * ((hRange2-hRange1)+hRange1)),
				'left': Math.floor(Math.random() * ((wRange2-wRange1)+wRange1))
			}, 300);

		});
});