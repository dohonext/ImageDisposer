// If a variable 'lineLimit' is undefined, this function render all images.
function imageDisposer(jqElement, boardWidth, boardHeightMax, imageMargin, lineLimit){
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
}

function addOnResizeWindowEvent(){  //TODO
	$(window).on('resize orientationChanged', function(){
		location.reload();
	});
}

function addClickSignMenuEvent(){  //TODO : JQuery
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
}

function addClickLogoEvent(){  //WARNING : This doesn't work on localhost.
	$("#logo").click(function(){
		window.location.replace('/');
	});
}

window.addEventListener("load", function() {
	imageDisposer($("#best_content"), $("body").width() - 55, 230, 5, 2);
	imageDisposer($("#newest_content"), $("body").width() - 55, 230, 5, 2);
	addOnResizeWindowEvent();
	addClickSignMenuEvent();
	addClickLogoEvent();
}, false);


