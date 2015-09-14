var ImageDisposer = {
	boardWidth : 0,
	boardHeightMax : 0,
	imageMargin : 0,
	lineLimit : 0,
	imageCount : 0,
	lineCount : 0,

	init : function(jqElement, boardWidth, boardHeightMax, imageMargin){
		this.disposeImages(jqElement, boardWidth, boardHeightMax, imageMargin);
	},

	/*	
	 *	1. boardHeightMax에 입력한 '세로 길이의 최대치'로 모든 이미지의 세로 길이를 맞춘다.(이미지 비율 유지)
	 *	2. 세로 길이를 맞춘 이미지들의 가로 길이 합+ 그 사이의 마진 길이 합 을 더해서 설정한 가로길이를 넘게 되는 순간을 카운트한다.
	 *	3. 카운트 된 이미지의 다음 이미지를 줄바꿈한다.
	 *	4. 줄바꿈하기 전 첫줄(카운트 되기 전까지의 이미지들 + 마진) 의 비율을 설정한 가로길이에 맞춘다.
	 *	5. 다음줄부터(카운트 된 이미지의 다음 이미지) 1 ~ 4를 반복한다. (마지막 이미지까지)
	 */
	disposeImages : function(jqElement, boardWidth, boardHeightMax, imageMargin){ 
		this.boardWidth = boardWidth;
		this.boardHeightMax = boardHeightMax;
		this.imageMargin = imageMargin;

		var board = jqElement;
		var imageSize = board.length;
		while(this.imageCount < imageSize) {                                                    // 5
			this.makeEveryImageHaveSameHeight(board, this.boardHeightMax, this.imageCount);     // 1
			this.makeBoardWidthFit(board, this.boardWidth, this.imageMargin, this.imageCount);  // 2 ~ 4
			console.log("Line changing imageCount:"+this.imageCount);
		}
		this.makeBoardVisibleAfterRendering(jqElement);
		this.initVariablesAfterRendering();
	},

	makeEveryImageHaveSameHeight : function(elementsList, heightPx, initialCount){
		console.log("func 1");
		elementsList.each(function(index){
			if (index >= initialCount) {
				ImageDisposer.rescaleElementWithHeight(this, heightPx);
			}
		});
	},

	rescaleElementWithHeight : function(element, heightPx){ 
		console.log("func 2");
		var jqElement = $(element);
		var elementHeight = jqElement.outerHeight();
		var elementWidth = jqElement.outerWidth();
		var ratio = elementWidth/elementHeight;

		jqElement.height(heightPx);
		jqElement.width(heightPx * ratio);
	},

	makeBoardWidthFit : function(elementsList, widthPx, marginPx, initialCount){
		console.log("func 3");
		var widthSum = 0;
		var widthSumWithoutMargin = 0;
		var count = 0;

		elementsList.each(function(index){
			if (index >= initialCount && widthSum < widthPx) {
				widthSum = widthSum + $(this).outerWidth() + marginPx;
				widthSumWithoutMargin = widthSumWithoutMargin + $(this).outerWidth();
				ImageDisposer.imageCount++;
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
	}, 

	makeBoardVisibleAfterRendering : function(jqElement){
		console.log("func 4");
		jqElement.css('visibility', 'visible');
	},

	initVariablesAfterRendering : function(){
		console.log("func 5");
		this.boardWidth = 0;
		this.boardHeightMax = 0;
		this.imageMargin = 0;
		this.lineLimit = 0;
		this.imageCount = 0;
		this.lineCount = 0;
	}
}

var Cover = {
	init : function(){
		//this.coverUp();
		this.removeCover();
	},

	removeCover : function(){
		var jCover = $('#cover');	
		jCover.css( "display", 'none');
	},

	coverUp : function(){
		var jCover = $('#cover');		
		var i = 0;
		animation();
		function animation() {
			if (i > 10) {
				jCover.css( "display", 'none');
				return;
			} else {
				jCover.css( 'opacity', 1-i*0.1);
				i++;
			}
			requestAnimationFrame(animation);
		}			
	}
}

window.addEventListener("load", function() {
	var id1 = Object.create(ImageDisposer);
	//var id2 = Object.create(ImageDisposer);
	//ImageDisposer.init($("#board li"), 1700, 250, 3);
	//ImageDisposer2.init($("#board li"), 1700, 250, 3);	
	id1.init($("#board li"), 1700, 250, 3);
	//id2.init($("#board2 li"), 1700, 250, 3);
	//Cover.init();	
}, false);













var TODO = {
	selectedIndex : 0,
	init : function(){
		this.getAllTodoList();
		$('input').on('keydown', this.addList);
		$("ul").on("click", "li  div  input[type=checkbox]", this.completeList);
		$("ul").on("click", "li  div  .destroy", this.removeList);
		$("#filters").on("click", this.changeStateFilter.bind(this));
	},
	
	changeStateFilter : function(e){
		var target = e.target;
		var tagName = e.target.tagName.toLowerCase();
		if(tagName == "a"){
			var href = target.getAttribute("href");
			if(href === "index.html"){
				this.allView();
			}else if (href === "active"){
				this.activeView();
			}else if (href === "completed"){
				this.completedView();
			}
		}
		e.preventDefault();
	},

	allView : function(){
		document.getElementById("todo-list").className = "";
		this.selectNavigator(0);
		history.pushState({"method":"all"}, null, "index.html");
	},

	activeView : function(){
		document.getElementById("todo-list").className = "all-active";
		this.selectNavigator(1);
		history.pushState({"method":"active"}, null, "active");
	},

	completedView : function(){
		document.getElementById("todo-list").className = "all-completed";
		this.selectNavigator(2);
		history.pushState({"method":"completed"}, null, "completed");
	},
 
	selectNavigator : function(index){
		var navigatorList = document.querySelectorAll("#filters a");
		console.log(navigatorList);
		navigatorList[this.selectedIndex].classList.remove("selected");
		navigatorList[index].classList.add("selected");
		this.selectedIndex = index;
	},

	getAllTodoList : function(){
		TODOSync.get(function(json){
			for(i=json.length-1; i>=0; i--) {
				var completed;
				var checked;
				if (json[i].completed == 1) {
					completed = "completed";
					checked = "checked";
				} else {
					completed = "added";
					checked = null;
				}
				appendWithTemplateEngine("#addListElements", "#todo-list", { key:json[i].id, class:completed, checked:checked, text:json[i].todo});
			}
		})

		function appendWithTemplateEngine(template, elementToAppend, dataToBind) {
		    		var source   = $(template).html();
					var template = Handlebars.compile(source);
					var templateData = dataToBind;

					$(elementToAppend).append(template(templateData));	
		}
	},

	addList : function(e){
		if (e.which == 13) {
			var textValue = $("input").val();
			TODOSync.add(textValue, function(json){
		  	   	appendWithTemplateEngine("#addListElements", "#todo-list", { key:json.insertId, class:'added', text:textValue });
		  	   	animateFadeIn($("#todo-list li:last-child"));
		  	   	deleteTextAfterPutIn();
		    	e.preventDefault();

		    	function appendWithTemplateEngine(template, elementToAppend, dataToBind) {
		    		var source   = $(template).html();
					var template = Handlebars.compile(source);
					var templateData = dataToBind;

					$(elementToAppend).append(template(templateData));	
		    	}

		    	function animateFadeIn(elementToAnimate) {
					var i = 0;
					animation();

					function animation() {
						if (i === 50) {
							return;
						} else {
							elementToAnimate.css( "opacity", 0+i*0.2);
							i++;
						}
						requestAnimationFrame(animation);
					}		
				}

		    	function deleteTextAfterPutIn() {
		    		$("input").val('');  
		    	}
	    	}.bind(this));
	    }
	},

	completeList : function(e){
		var input = e.currentTarget;
		var elLi = input.closest("li");
		var completed = input.checked?"1":"0";

		TODOSync.completed({
			"key" : elLi.dataset.key,
			"completed" : completed
		},function(){
				if (completed==="1") {
				elLi.className = "completed"
			}
			else {
				elLi.className = "added"
			}
		})
	},

	removeList : function(e){
		var elLi = e.currentTarget.closest("li");

		TODOSync.remove(elLi.dataset.key, function(){		
			animateFadeOut($(elLi));

			function animateFadeOut(elementToAnimate) {
				var i = 0;
				animation();

				function animation() {
					if (i === 50) {
						elementToAnimate.remove();
						return;
					} else {
						elementToAnimate.css( "opacity", 1-i*0.2);
						i++;
					}
					requestAnimationFrame(animation);
				}		
			}
		})
	},
};

var TODOSync = {
	url : "http://128.199.76.9:8002/",
	id : "dohonext/",
	init : function(){
		window.addEventListener("online", this.onofflineListener);
		window.addEventListener("offline", this.onofflineListener);
	},
	onofflineListener : function(){
		//			document.getElementById("header").classList[navigator.online?"remove":"add"]("offline");
		if(navigator.onLine){
			document.getElementById("header").classList.remove("offline");
		}else{
			document.getElementById("header").classList.add("offline");
		}
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


