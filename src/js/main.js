$(function(){

	var userHasWatchedIntro = Cookies.get("userHasWatchedIntro") || false;

	

	$('.deck > *').each(function(){
		var speed = 900;
		var offset = $(this).offset().left*0.8 + $(this).offset().top;
		var delay = parseFloat(offset/speed).toFixed(2);
				
		$(this).css('transitionDelay', delay + "s");
	})

	if(!userHasWatchedIntro){
		$(".am-content > * > h1 span").each(function(){
			var text = $(this).text();
			var phrases = text.split(/[\.\!\?]{1}\ /i);
			//console.log(phrases)
			$(this).typed({
				strings: phrases,
				typeSpeed: 0,
				callback: function() {
					
					Cookies.set("userHasWatchedIntro", true);
				}
			})
		});
	} else {
		$('.deck').removeClass('hidden')
		$('.am-panel').removeClass('hidden')
	}


	var context = {
		params: {}
	};

	$("body").on("click","a[class*='-toggle']",function(){
		$(this).toggleClass("toggled");
		var $toggleRef = $($(this).data("toggle-ref"));
		var _toggleClass = $(this).data("toggle-class");
		var _toggleParam = $(this).data("toggle-param");
		$toggleRef.toggleClass(_toggleClass);
		if(_toggleParam !== ""){
			context.params[_toggleParam] = !context.params[_toggleParam];
		}
	});

	$("body").on("click","a[class*='-trigger']",function(){
		var _triggerMethod = $(this).data("trigger-method");
		if(typeof context[_triggerMethod] !== "undefined"){
			if($(this).data("trigger-id")){
				context[_triggerMethod]($(this).data("trigger-id"));
			}
			context[_triggerMethod]();
		}
	});


	$("body").on("click","a[class*='-option']",function(_ev){
		$("a[class*='-option']").removeClass("selected");
		$(this).addClass("selected");

		var _optionParam = $(this).data("option-param");
		var _optionValue = $(this).data("option-value");

		context.params[_optionParam] = _optionValue;
	});
})