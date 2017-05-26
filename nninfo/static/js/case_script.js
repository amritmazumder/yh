var tEntry, dEntry, docEntry;

$(document).ready(function(){

	//https://docs.google.com/spreadsheets/d/1Evm-msVhjVRv1RsysWAyK-qkoJgLPs2OlPuNorpIsoo/pubhtml
	$.ajax({
        type: "GET",
        url: "https://spreadsheets.google.com/feeds/list/1Evm-msVhjVRv1RsysWAyK-qkoJgLPs2OlPuNorpIsoo/od6/public/values?alt=json",
       // dataType: "text",
        success: function(data) {
        	parseTimelineData(data.feed.entry);
        }
     });

	//https://docs.google.com/spreadsheets/d/1UZ7yy5RezLHbjMxpTX1ikCZp19hs0eDztLPFbSuxXD4/pubhtml
	$.ajax({
        type: "GET",
        url: "https://spreadsheets.google.com/feeds/list/1UZ7yy5RezLHbjMxpTX1ikCZp19hs0eDztLPFbSuxXD4/od6/public/values?alt=json",
       // dataType: "text",
        success: function(data) {
        	parseDiscussionData(data.feed.entry);
        }
     });

	//https://docs.google.com/spreadsheets/d/12HvCX_AfZ04qICtyU0lO6i2XUqjQFmQzIQTJH83T5bg/pubhtml
	$.ajax({
        type: "GET",
        url: "https://spreadsheets.google.com/feeds/list/12HvCX_AfZ04qICtyU0lO6i2XUqjQFmQzIQTJH83T5bg/od6/public/values?alt=json",
       // dataType: "text",
        success: function(data) {
        	parseDocumentData(data.feed.entry);
        }
     });


	//Hover Interactions
	$('.players .set-item').hover(function(){
		$('.item-graphic img', this).css({
			'background-color':'#ffffff',
			'border':'1px solid black'
		});
	}, function(){
		$('.item-graphic img', this).css({
			'background-color':'#ffce00'
		});
	});

	$('body').on('mouseover', '.timeline .document-item', function(){
		$('.doc-icon img', this).css({
			'border': '2px solid #000000',
			'border-radius':'5px'
		});

		$('.doc-title', this).css({
			'text-decoration': 'underline'
		});
	}).on('mouseout', '.timeline .document-item', function(){
		$('.doc-icon img', this).css({
			'border': '0px solid black'
		});

		$('.doc-title', this).css({
			'text-decoration': 'none'
		});
	});

	
	$('body').on('mouseover', '.debate .disc-item', function(){
		$('.disc-ico img', this).css({
			'border': '2px solid #ffce00',
			'border-radius':'7px'
		});
		$('.disc-title', this).css({
			'text-decoration': 'underline'
		});
	}).on('mouseout', '.debate .disc-item', function(){
		$('.disc-ico img', this).css({
			'border': '0px solid #ffffff',
			'border-radius':'5px'
		});
		$('.disc-title', this).css({
			'text-decoration': 'none'
		});
	});

	//Click Interactions
	$('.basics .button div').click(function(){
		var active = $(this).hasClass('button-clicked');
		var sibling = $(this).parent().siblings().children();
		
		if (active) {

		} else {
			$(this).removeClass('button-unclicked').addClass('button-clicked');
			sibling.removeClass('button-clicked').addClass('button-unclicked');
			checkAndDisplay();
		}

	});
});

function checkAndDisplay() {
	$('.toggle .hide').removeClass('hide').siblings().removeClass('show').addClass('hide');
}


function parseTimelineData(data){
	for (i = 0; i < data.length; i++) {
		tEntry = new TimelineEntry(data[i]);
		tEntry.display();
	}
	runAfterData();
}

function TimelineEntry(data) {
	//console.log(data);
	this.date = data.gsx$date.$t;
	this.caption = data.gsx$caption.$t;
	this.desc = data.gsx$description.$t;
	this.links;

	var linkObject = [
		{'hyperlink': data.gsx$linkone.$t, 'title': data.gsx$linkonetitle.$t },
		{'hyperlink': data.gsx$linktwo.$t, 'title': data.gsx$linktwotitle.$t },
		{'hyperlink': data.gsx$linkthree.$t, 'title': data.gsx$linkthreetitle.$t },
		{'hyperlink': data.gsx$linkfour.$t, 'title': data.gsx$linkfourtitle.$t }
	];
	this.links = linkObject;
}

TimelineEntry.prototype.display = function(){
	var date, caption, description;

	var documents = [];

	date = "<div class='date'>"+this.date+"</div>";

	caption = "<div class='event-caption'>"+this.caption+"</div>";

	description = "<div class='event-description'><p>"+this.desc+"</p></div>";
			
	for (j = 0; j < this.links.length; j++) {
		//console.log(this.links);
		if (this.links[j].hyperlink !== "") {
			documents[j] = "<a href='"+this.links[j].hyperlink+"' target='_blank'><div class='document-item'><div class='doc-icon'><img src='static/images/assets/doc-icon.svg'></div><div class='doc-title'>" + this.links[j].title + "</div></div></a>"
		} else {
			documents[j] = '';
		}
	}

	//console.log(documents);
	var documentSet = "<div class='event-documents'>" + documents[0] + documents[1] + documents[2] + documents[3] +  "</div>"

	var newTimelineEntry = "<div class='events'><div class='time-entry'>" + date + caption + description + documentSet + "</div></div>";
	$('.timeline .page').append(newTimelineEntry);
}

function parseDiscussionData(data){
	for (i=0; i<data.length; i++) {
		dEntry = new DiscussionEntry(data[i]);
		dEntry.display();
	}
}

function DiscussionEntry(data) {
	this.text = data.gsx$textexcerpt.$t;
	this.link = data.gsx$link.$t;
	this.title = data.gsx$title.$t;
	this.source = data.gsx$source.$t;
	this.targetDiv = data.gsx$targetcol.$t;
}

DiscussionEntry.prototype.display = function(){
	
	if (this.targetDiv == 'srcReddit') {
		var discEntry = "<a href='"+this.link+"' target='_blank'><div class='disc-item'><div class='disc-ico'><img src='static/images/assets/reddit-icon-yellow.svg'></div><div class='disc-description'><div class='disc-title'>" + this.title + "</div><div class='disc-text'></div><div class='disc-source'>" + this.source + "</div></div></div></a>";
		$('.debate .srcReddit').append(discEntry);
	}

	if (this.targetDiv == 'srcSocial') {
		var discEntry = "<a href='"+this.link+"' target='_blank'><div class='disc-item'><div class='disc-ico'><img src='static/images/assets/twitter-icon-yellow.svg'></div><div class='disc-description'><div class='disc-title'>" + this.title + "</div><div class='disc-text'></div><div class='disc-source'>" + this.source + "</div></div></div></a>";
		$('.debate .srcSocial').append(discEntry);
	}

	if (this.targetDiv == 'srcNews') {
		var discEntry = "<a href='"+this.link+"' target='_blank'><div class='disc-item'><div class='disc-ico'><img src='static/images/assets/news-icon-yellow.svg'></div><div class='disc-description'><div class='disc-title'>" + this.title + "</div><div class='disc-text'></div><div class='disc-source'>" + this.source + "</div></div></div></a>";
		$('.debate .srcNews').append(discEntry);
	}
}

function parseDocumentData(data){
	for (i=0;i<data.length; i++){
		docEntry = new DocumentEntry(data[i]);
		//docEntry.display();
	}
}

function DocumentEntry(data) {
	this.doctitle = data.gsx$title.$t;
	this.doclink = data.gsx$link.$t;
	this.docOrg = data.gsx$org.$t;
	this.docDesc = data.gsx$description.$t;
	this.priority = data.gsx$priority.$t;
}

function runAfterData() {
	var timelineHeight = $('.timeline .page').height();
	$(".artery").height(timelineHeight);
}