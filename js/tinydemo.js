var Tinydemo = {
	scene: undefined,
	activeSlide: undefined,
	activeSlideIndex: 0,
	slides: undefined,
	init: function(options) {
		Tinydemo.scene = document.getElementById(options.scene);
		Tinydemo.scene.setAttribute("class", "td-scene");
		Tinydemo.update();
		document.onkeyup = function(e) {
			if (e.keyCode === 32) {
				e.preventDefault();
				Tinydemo.next();
			}
			console.debug("Active: " + Tinydemo.activeSlide + " (#"
			+ Tinydemo.activeSlideIndex + ")");
		};
	},
	next: function() {
		if (Tinydemo.slides[Tinydemo.activeSlideIndex+1]) {
			Tinydemo.activeSlide.removeAttribute("id");
			Tinydemo.activeSlideIndex++;
			Tinydemo.slides[Tinydemo.activeSlideIndex].setAttribute("id",
			"td-active");
		}
		Tinydemo.update();
	},
	prev: function() {
		if (Tinydemo.slides[Tinydemo.activeSlideIndex-1]) {
			Tinydemo.activeSlide.removeAttribute("id");
			Tinydemo.activeSlideIndex--;
			Tinydemo.slides[Tinydemo.activeSlideIndex].setAttribute("id",
			"td-active");
		}
		Tinydemo.update();
	},
	update: function() {
		Tinydemo.activeSlide = document.getElementById("td-active");
		Tinydemo.slides = document.getElementsByClassName("td-slide");
	},
	add: function(content) {
		var classname = "td-slide-defualt",
			slide     = document.createElement("div"),
			heading   = document.createElement("h1");

		if (options.type) {
			classname = "td-slide-" + options.type;
		}	
		slide.setAttribute("class", classname);

		if (options.heading) {
			heading.innerHTML = options.heading;
		}
	}
},
td = Tinydemo;