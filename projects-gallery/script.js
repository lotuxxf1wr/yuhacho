var isMobile = window.matchMedia("(max-width: 800px)");

$(document).ready( function() {

	lazyLoadInit();

	checkMobile();
	$(window).resize( function() {
		checkMobile();
	});

	lazyLoadForward();
	lazyLoadBackward();

	// biography
	$(".bio-link").click( function() {
		$(".about").addClass("show");
	});

	$(".close").click( function() {
		$(".about").removeClass("show");
	});

	// slide change
	$(".area-r").click( function() {
		lazyLoadForward();
		$(".block:last-child").prependTo(".slide");
		changeTypeColor();
	});

	$(".area-l").click( function() {
		lazyLoadBackward();
		$(".block:first-child").appendTo(".slide");
		changeTypeColor();
	});

});

function changeTypeColor() {
	var typeColor = $(".block:last-child figcaption").css("color");
	$("header, footer").css("color", typeColor);
	
	// 배경 색에 따라 텍스트 색 조정
	var backgroundColor = $("header").css("background-color");
	if (isDark(backgroundColor)) {
	  $("header").css("color", "#ffffff");  // 어두운 배경에서는 흰색 텍스트
	} else {
	  $("header").css("color", "#000000");  // 밝은 배경에서는 검은색 텍스트
	}
	
  }
  
function lazyLoadInit() {
	lazyLoad($(".block:last-child"));
}

function lazyLoadBackward() {
	lazyLoad($(".block:first-child"));
	lazyLoad($(".block:first-child").next());
	lazyLoad($(".block:first-child").next().next());
}

function lazyLoadForward() {
	lazyLoad($(".block:last-child").prev());
	lazyLoad($(".block:last-child").prev().prev());
	lazyLoad($(".block:last-child").prev().prev().prev());
}

function lazyLoad($block) {
	$block.find("img.lazy").each( function() {
		$(this).attr("src", $(this).attr("data-src"));
		$(this).attr("srcset", $(this).attr("data-srcset"));
		$(this).removeClass("lazy").addClass("loaded");
		$(this).siblings("figcaption").addClass("show");
	});
}

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

function checkMobile() {
	if(isMobile.matches) {
		lazyLoad($(".block"));
		$(".block-type-doubleimage").each( function() {
			if(!$(this).hasClass("split")) {
				$(this).addClass("split");
				$(this).clone().insertBefore($(this)).find("figure:first-child").remove();	
				$(this).find("figure:last-child").remove();			
			}
		});
		$(".block-type-singleimage").each( function() {
			if($(this).find("img").hasAttr("data-mobilesrc")) {
				$(this).find("img").attr("src",$(this).find("img").attr("data-mobilesrc"));
				$(this).find("img").attr("srcset",$(this).find("img").attr("data-mobilesrcset"));
			}
		});
	} else {
		$(".block-type-doubleimage").each( function() {
			if($(this).hasClass("split")) {
				$(this).removeClass("split").next(".split").find("figure").insertBefore($(this).find("figure"));
				$(this).next(".split").remove();	
			}
		});
		$(".block-type-singleimage").each( function() {
			if($(this).find("img").hasAttr("data-mobilesrc")) {
				$(this).find("img").attr("src",$(this).find("img").attr("data-src"));
				$(this).find("img").attr("srcset",$(this).find("img").attr("data-srcset"));
			}
		});
	}
}

