


var PhotoShakeMain = {
	init : function(){
		this.getMainPage();
		this.seeMoreBestposting();
		this.seeMoreNewestposting();
		//this.imageDisposer($("#bestposting"), $("body").width() - 55, 230, 5, 2);
		//this.imageDisposer($("#newestposting"), $("body").width() - 55, 230, 5, 2);
		this.addOnResizeWindowEvent();
		this.addClickSignMenuEvent();
		this.addClickLogoEvent();
		this.addWideviewEvent();
	},
	
	imageDisposer : function(jqElement, boardWidth, boardHeightMax, imageMargin, lineLimit){
		// USAGE : If a variable 'lineLimit' is undefined, this function render all images.
		var imageCount = 0;
		var lineCount = 0;
		var lineLimitPoint = 0;

		var board = jqElement.children();
		disposeImages(board, boardWidth, boardHeightMax, imageMargin, lineLimit);
		function disposeImages(jqBoard, boardWidth, boardHeightMax, imageMargin, lineLimit){
			var imageSize = jqBoard.length;
			while(imageCount < imageSize) {                                                   
				makeEveryImageHaveSameHeight(jqBoard, boardHeightMax, imageCount);   
				makeBoardWidthFit(jqBoard, boardWidth, imageMargin, imageCount);  
				lineCount++;
				if(lineCount === lineLimit) {
				 	lineLimitPoint = imageCount;
				}

			}
			makeImagesOverLineLimitDisplayNone(jqBoard, lineLimit);
			makeBoardVisibleAfterRendering(jqElement);
		}

		function makeImagesOverLineLimitDisplayNone(elementsList){
			if (lineLimit === undefined) {        // USAGE : If lineLimit is undefined, this function render all images.
				return;
			}
			elementsList.each(function(index){
				if (index >= lineLimitPoint) {
					$(this).css("display", "none");
				}
			});
		}

		function makeEveryImageHaveSameHeight(elementsList, heightPx, initialCount){
			elementsList.each(function(index){
				if (index >= initialCount) {
					rescaleElementWithHeight(this, heightPx);
				}
			});
			
		}

		function rescaleElementWithHeight(element, heightPx){ 
			var jqElement = $(element);
			var elementHeight = jqElement.outerHeight();
			var elementWidth = jqElement.outerWidth();
			var ratio = elementWidth/elementHeight;

			jqElement.height(heightPx);
			jqElement.width(heightPx * ratio);
		}

		function makeBoardWidthFit(elementsList, widthPx, marginPx, initialCount){
			var widthSum = 0;
			var widthSumWithoutMargin = 0;
			var count = 0;

			elementsList.each(function(index){
				if (index >= initialCount && widthSum < widthPx) {
					widthSum = widthSum + $(this).outerWidth() + marginPx;
					widthSumWithoutMargin = widthSumWithoutMargin + $(this).outerWidth();
					imageCount++;
					count++;
				} else {
					return;
				}
			});

			$(elementsList[initialCount+count]).addClass('lineChange');

			var ratio = ( widthPx - (marginPx * count) )/ widthSumWithoutMargin;

			elementsList.each(function(index){
				var jqElement = $(this);
				if (index >= initialCount && index < initialCount + count) {
					jqElement.height(jqElement.outerHeight() * ratio);
					jqElement.width(jqElement.outerWidth() * ratio);
					jqElement.css('margin-right', marginPx);
					jqElement.css('margin-bottom', marginPx);
				} else {
					return;
				}
			});
		}

		function makeBoardVisibleAfterRendering(jqElement){
			jqElement.css('visibility', 'visible');
		}
	},

	addOnResizeWindowEvent : function (){  //TODO : 화면 크기에 따른 디테일한 설정 추가 
		$(window).on('resize orientationChanged', function(){
			location.reload();
		});
	},

	addClickSignMenuEvent : function (){  //TODO : JQuery
	  var ele1 = document.getElementById("signin");
	  var ele2 = document.getElementById("signup");
	  var ele3 = document.getElementById("signin_full");
	  var ele4 = document.getElementById("signup_full");
	  var ele5 = document.getElementById("cancel1");
	  var ele6 = document.getElementById("cancel2");
	  
	  ele1.addEventListener("click" ,function(e){
	    if(ele3.style.display == "block")
	      { ele3.style.display = "none"; }
	    else
	      { ele3.style.display = "block"; }
	    e.stopPropagation();  
	  }, false); 

	  ele2.addEventListener("click" ,function(e){
	    if(ele4.style.display == "block")
	      { ele4.style.display = "none"; }
	    else
	      { ele4.style.display = "block"; }
	    e.stopPropagation();  
	  }, false);

	  ele5.addEventListener("click" , function(e){
	        ele3.style.display = "none"; 
	    e.stopPropagation();
	  },  false);

	  ele6.addEventListener("click" , function(e){
	        ele4.style.display = "none"; 
	    e.stopPropagation();
	  },  false);
	},

	addClickLogoEvent : function (){  
		$("#logo").click(function(){
			var html = "<div id='bestBox'><div class='content_subject'><div class='content_subject_left' id='best'>BEST</div><div class='content_subject_right' id ='bestSeemore'>SeeMore</div></div><ul class='content' id='bestposting'></ul></div><div id='newestBox'><div id='blank'></div><div class='content_subject'><div class='content_subject_left' id='newest'>NEWEST</div><div class='content_subject_right' id ='newestSeemore'>SeeMore</div><div id='new_content_upload'>Upload</div></div><ul class='content' id='newestposting'></ul></div>";
			$("#main").children().remove();
			$("#main").append(html);
			PhotoShakeMain.init();
		});
	},

	getMainPage : function(){
		this.getBestposting();
		this.getNewestposting();
	},

	appendWithTemplateEngine : function (template, elementToAppend, dataToBind) {
		    		var source   = $(template).html();
					var template = Handlebars.compile(source);
					var templateData = dataToBind;

					$(elementToAppend).append(template(templateData));	
	},

	getBestposting : function(){
		PhotoShakeAjax.getBestposting(function(json){
			
			for (var i = 0; i < json.length ; i++) {
				PhotoShakeMain.appendWithTemplateEngine("#bestpostingTemplate", "#bestposting", { 
					bestpostingid : json[i].bestpostingid, postingid : json[i].postingid,
					postingsubject : json[i].postingsubject, postingtext : json[i].postingtext, 
					postingpic : json[i].postingpic, postingview : json[i].postingview,
					postinglike : json[i].postinglike, postinghate : json[i].postinghate, 
					bestpostingtime : json[i].bestpostingtime, userid : json[i].userid,
					useridname : json[i].useridname, usernickname : json[i].usernickname,
					userprofile : json[i].userprofile, userprofilepic : json[i].userprofilepic,
					userlevel : json[i].userlevel, userexp : json[i].userexp
				});
			}
			PhotoShakeMain.imageDisposer($("#bestposting"), $("body").width() - 55, 230, 5, 2);

		})
	},

	getNewestposting : function(){
		PhotoShakeAjax.getNewestposting(function(json){
			
			for (var i = 0; i < json.length ; i++) {
				PhotoShakeMain.appendWithTemplateEngine("#newestpostingTemplate", "#newestposting", { 
					postingid : json[i].postingid,
					postingsubject : json[i].postingsubject, postingtext : json[i].postingtext, 
					postingpic : json[i].postingpic, postingview : json[i].postingview,
					postinglike : json[i].postinglike, postinghate : json[i].postinghate, 
					postingtime : json[i].postingtime, userid : json[i].userid,
					useridname : json[i].useridname, usernickname : json[i].usernickname,
					userprofile : json[i].userprofile, userprofilepic : json[i].userprofilepic,
					userlevel : json[i].userlevel, userexp : json[i].userexp
				});
			}
			PhotoShakeMain.imageDisposer($("#newestposting"), $("body").width() - 55, 230, 5, 2);

		})
	},

	seeMoreBestposting : function(){
		$("#best, #bestSeemore").click(function() {
			$("#newestBox").remove();
			$(".content_subject_right").remove();
			$("#bestposting").children().remove();
			//TODO : best 옆에 " | newest" 버튼 id="#newest" 로 추가해주기
			PhotoShakeAjax.getBestposting(function(json){
				for (var i = 0; i < json.length ; i++) {
					PhotoShakeMain.appendWithTemplateEngine("#bestpostingTemplate", "#bestposting", { 
						bestpostingid : json[i].bestpostingid, postingid : json[i].postingid,
						postingsubject : json[i].postingsubject, postingtext : json[i].postingtext, 
						postingpic : json[i].postingpic, postingview : json[i].postingview,
						postinglike : json[i].postinglike, postinghate : json[i].postinghate, 
						bestpostingtime : json[i].bestpostingtime, userid : json[i].userid,
						useridname : json[i].useridname, usernickname : json[i].usernickname,
						userprofile : json[i].userprofile, userprofilepic : json[i].userprofilepic,
						userlevel : json[i].userlevel, userexp : json[i].userexp
					});
				}
				PhotoShakeMain.imageDisposer($("#bestposting"), $("body").width() - 55, 230, 5);
			})

			//TODO : 더보기 버튼 append 'GET?page=2,3,4...'
		});
	},

	seeMoreNewestposting : function(){
		$("#newest, #newestSeemore").click(function() {
			$("#blank").remove();
			$("#bestBox").remove();
			$(".content_subject_right").remove();
			$("#newestposting").children().remove();
			//TODO : newest 옆에 " | bewest" 버튼 id="#best" 로 추가해주기
			PhotoShakeAjax.getNewestposting(function(json){
				for (var i = 0; i < json.length ; i++) {
					PhotoShakeMain.appendWithTemplateEngine("#newestpostingTemplate", "#newestposting", { 
						postingid : json[i].postingid,
						postingsubject : json[i].postingsubject, postingtext : json[i].postingtext, 
						postingpic : json[i].postingpic, postingview : json[i].postingview,
						postinglike : json[i].postinglike, postinghate : json[i].postinghate, 
						postingtime : json[i].postingtime, userid : json[i].userid,
						useridname : json[i].useridname, usernickname : json[i].usernickname,
						userprofile : json[i].userprofile, userprofilepic : json[i].userprofilepic,
						userlevel : json[i].userlevel, userexp : json[i].userexp
					});
				}
				PhotoShakeMain.imageDisposer($("#newestposting"), $("body").width() - 55, 230, 5);
			})
			
			//TODO : 더보기 버튼 append 'GET?page=2,3,4...'
		});
	},

	addWideviewEvent : function(){
		$("#main").on("click", "div  ul li", function(e) {  // 이렇게 이벤트 애드하면 어펜드 된 돔에도 이벤트 지속.
			
			//TODO : 데이터 받아서 어펜드 하는 부분 로직 추가(템플릿엔진 사용) 및 css 다듬기
			var data = $(e.target.closest("li"));
			

			var html = "<img src='"+data.data("postingpic")+"'/>"
			$("#wideviewPicture").append(html);
			$("#wideview").css("display","block");
		});
		$("#wideview").on("click", "#closeWideview", function(){
			$("#wideview").css("display","none");
		});
	}

}

var PhotoShakeAjax = {
	url : "http://localhost:8000/photoshake/API/",
	
	init : function(){
		
	},

	xhr : function(callback, method, url, aSync, postString){
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, aSync);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		//xhr.setRequestHeader("Access-Control-Allow-Origin","*");
		xhr.addEventListener("load",function(e) {
			callback(JSON.parse(xhr.responseText));
		});
		xhr.send(postString);
	},

	getBestposting : function(callback){
		var APIUrl = "bestposting";
		this.xhr(callback, "GET", this.url+APIUrl, true);
	},

	getNewestposting : function(callback){
		var APIUrl = "posting";
		this.xhr(callback, "GET", this.url+APIUrl, true);
	},

	add : function(todo, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", this.url+this.id, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.addEventListener("load",function(e) {
			callback(JSON.parse(xhr.responseText));
		});
		xhr.send("todo="+todo);
	},

	completed : function(param, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", this.url+this.id+param.key, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.addEventListener("load",function(e) {
			callback(JSON.parse(xhr.responseText));
		});
		xhr.send("completed="+param.completed);
	},

	remove : function(key, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", this.url+this.id+key, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.addEventListener("load",function(e) {
			callback(JSON.parse(xhr.responseText));
		});
		xhr.send();
	}
}


window.addEventListener("load", function() {
	PhotoShakeMain.init();
}, false);


