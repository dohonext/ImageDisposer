


var PhotoShakeMain = {
	init : function(){
		this.imageDisposer($("#best_content"), $("body").width() - 55, 230, 5, 2);
		this.imageDisposer($("#newest_content"), $("body").width() - 55, 230, 5, 2);
		this.addOnResizeWindowEvent();
		this.addClickSignMenuEvent();
		this.addClickLogoEvent();
	},
	
	imageDisposer : function(jqElement, boardWidth, boardHeightMax, imageMargin, lineLimit){
		// If a variable 'lineLimit' is undefined, this function render all images.
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
			if (lineLimit === undefined) {        // If lineLimit is undefined, this function render all images.
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

	addClickLogoEvent : function (){  //WARNING : This doesn't work on localhost.
		$("#logo").click(function(){
			window.location.replace('/');
		});
	}
}

var PhotoShakeAjax = {
	url : "http://localhost:8000/",
	
	init : function(){
		
	},
	
	get : function(callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", this.url+this.id, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.addEventListener("load",function(e) {
			callback(JSON.parse(xhr.responseText));
		});
		xhr.send();
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


