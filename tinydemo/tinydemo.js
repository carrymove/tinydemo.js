var Tinydemo = {
	scene: undefined,
	activeSlide: undefined,
	activeSlideIndex: 0,
	slides: undefined,
	onSlide: function(direction) {},
	init: function(options) {
		Tinydemo.scene = document.getElementById(options.scene);
		Tinydemo.scene.setAttribute("class", "td-scene");
		document.onkeyup = function(e) {
			console.log(e.which)
			switch (e.which) {
				case 32:
				case 39:
					e.preventDefault();
					Tinydemo.next();
					break;
				case 37:
					e.preventDefault();
					Tinydemo.prev();
					break;
			}
			//if (e.keyCode === 32) {
			//	e.preventDefault();
			//	Tinydemo.next();
			//}
		};
	},
	next: function() {
		if (Tinydemo.slides[Tinydemo.activeSlideIndex+1]) {
			Tinydemo.activeSlide.removeAttribute("id");
			Tinydemo.activeSlideIndex++;
			Tinydemo.slides[Tinydemo.activeSlideIndex].setAttribute("id",
			"td-active");
		}
		console.debug("[Tinydemo] Next slide triggered");
		Tinydemo.update();
	},
	prev: function() {
		if (Tinydemo.slides[Tinydemo.activeSlideIndex-1]) {
			Tinydemo.activeSlide.removeAttribute("id");
			Tinydemo.activeSlideIndex--;
			Tinydemo.slides[Tinydemo.activeSlideIndex].setAttribute("id",
			"td-active");
			console.debug("[Tinydemo] Previous slide triggered");
		}

		Tinydemo.update();
	},
	update: function() {
		console.debug("[Tinydemo] Active: " + Tinydemo.activeSlide + " (#"
		+ Tinydemo.activeSlideIndex + ")");
		Tinydemo.slides = document.getElementsByClassName("td-slide");
		Tinydemo.activeSlide = document.getElementById("td-active");
		if (!Tinydemo.activeSlide) {
			Tinydemo.slides[0].setAttribute("id", "td-active");
			Tinydemo.update();
		}
	},
	add: function(options) {
		var classname   = "td-slide td-type-default",
			slide       = document.createElement("div"),
			scene       = Tinydemo.scene,
			heading     = document.createElement("h1"),
			subheading  = document.createElement("h2"),
			text        = document.createElement("div"),
			markedlist  = document.createElement("ul"),
			htmlcontent = document.createElement("div"),
			images      = document.createElement("div"),
			iframe      = document.createElement("iframe");

		if (options.type) {
			classname = "td-slide td-type-" + options.type;
		}	

		if (options.heading) {
			heading.innerHTML = options.heading;
			slide.appendChild(heading);
		}

		if (options.subheading) {
			subheading.innerHTML = options.subheading;
			slide.appendChild(subheading);
		}

		if (options.text) {
			text.setAttribute("class", "td-text");
			text.innerHTML = options.text;
			slide.appendChild(text);
		}

		if (options.markedlist) {
			var mrklist = [],
				ending  = "";
			for (var i = 0; i < options.markedlist.length; i++) {
				mrklist[i] = document.createElement("li");
				if (i < options.markedlist.length-1) {
					ending = ";";
				}
				else {
					ending = ".";
				}
				mrklist[i].innerHTML = options.markedlist[i] + ending;
				markedlist.appendChild(mrklist[i]);
			}
			slide.appendChild(markedlist);
		}

		if (options.htmlcontent) {
			htmlcontent.setAttribute("class", "td-htmlcontent");
			htmlcontent.innerHTML = options.htmlcontent;
			slide.appendChild(htmlcontent);
		}

		if (options.images) {
			var imglist = "";
			if (Array.isArray(options.images)) {
				for (var i = 0; i < options.images.length; i++) {
					imglist += "<img src='" + options.images[i] + "'>";
				}
			}
			else {
				var imglist = "<img src=\"" + options.images + "\">";
				console.debug("[Tinydemo] " + typeof options.images);
			}
			images.setAttribute("class", "td-images");
			images.innerHTML = imglist;
			slide.appendChild(images);
		}

		if (options.iframe) {
			iframe.setAttribute("src", options.iframe.url);
			iframe.setAttribute("scrolling", "yes");
			iframe.setAttribute("width", options.iframe.width);
			iframe.setAttribute("height", options.iframe.height);
			slide.appendChild(iframe);
		}

		slide.setAttribute("class", classname);
		scene.appendChild(slide);

	}
},
td = Tinydemo;