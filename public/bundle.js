(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Main navigation bar.
var menuBar = document.createElement('div');
menuBar.className = 'menu-bar';
menuBar.innerHTML =
'<a class="active" href="#about">About</a>\
<a href="#projects">Projects</a>\
<a href="#contact">Contact</a>\
<a href="/images/resume.pdf">Resume</a>\
<a href="https://github.com/milokhl">Github</a>';
document.body.appendChild(menuBar);
menuBar.addEventListener('click', function(e) {
	navigate();
});

/*
Looks for the file pageName.md in /markdown.
If found, the document div with id=pageName will
have its innerHTML set to the rendered markdown.
*/
function loadMarkdown(pageName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(pageName).innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', '/' + pageName, true);
  xhttp.send();
}

// Load the markdown for all pages.
var pages = {};
var pageNames = ['about', 'projects', 'contact'];
var defaultPage = pageNames[0];
pageNames.forEach(function (pageName) {
	pages[pageName] = document.getElementById(pageName);
	loadMarkdown(pageName);

	// Hide and disable pages that are not the default.
	if (pageName != defaultPage) {
		pages[pageName].hidden = true;
		pages[pageName].pointerEvents = 'none';
	}
});

function navigate() {
	setTimeout(function () {
		var page = window.location.hash.substr(1);
		if (pages[page]) {
			for (var p in pages) {
				if (p == page) {
					pages[p].hidden = false;
					pages[p].style.pointerEvents = 'auto';
				} else {
					pages[p].hidden = true;
					pages[p].style.pointerEvents = 'none';
				}
			}
		}
	}, 100);
}

navigate();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gTWFpbiBuYXZpZ2F0aW9uIGJhci5cbnZhciBtZW51QmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5tZW51QmFyLmNsYXNzTmFtZSA9ICdtZW51LWJhcic7XG5tZW51QmFyLmlubmVySFRNTCA9XG4nPGEgY2xhc3M9XCJhY3RpdmVcIiBocmVmPVwiI2Fib3V0XCI+QWJvdXQ8L2E+XFxcbjxhIGhyZWY9XCIjcHJvamVjdHNcIj5Qcm9qZWN0czwvYT5cXFxuPGEgaHJlZj1cIiNjb250YWN0XCI+Q29udGFjdDwvYT5cXFxuPGEgaHJlZj1cIi9pbWFnZXMvcmVzdW1lLnBkZlwiPlJlc3VtZTwvYT5cXFxuPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9taWxva2hsXCI+R2l0aHViPC9hPic7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lbnVCYXIpO1xubWVudUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0bmF2aWdhdGUoKTtcbn0pO1xuXG4vKlxuTG9va3MgZm9yIHRoZSBmaWxlIHBhZ2VOYW1lLm1kIGluIC9tYXJrZG93bi5cbklmIGZvdW5kLCB0aGUgZG9jdW1lbnQgZGl2IHdpdGggaWQ9cGFnZU5hbWUgd2lsbFxuaGF2ZSBpdHMgaW5uZXJIVE1MIHNldCB0byB0aGUgcmVuZGVyZWQgbWFya2Rvd24uXG4qL1xuZnVuY3Rpb24gbG9hZE1hcmtkb3duKHBhZ2VOYW1lKSB7XG4gIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYWdlTmFtZSkuaW5uZXJIVE1MID0gdGhpcy5yZXNwb25zZVRleHQ7XG4gICAgfVxuICB9O1xuICB4aHR0cC5vcGVuKCdHRVQnLCAnLycgKyBwYWdlTmFtZSwgdHJ1ZSk7XG4gIHhodHRwLnNlbmQoKTtcbn1cblxuLy8gTG9hZCB0aGUgbWFya2Rvd24gZm9yIGFsbCBwYWdlcy5cbnZhciBwYWdlcyA9IHt9O1xudmFyIHBhZ2VOYW1lcyA9IFsnYWJvdXQnLCAncHJvamVjdHMnLCAnY29udGFjdCddO1xudmFyIGRlZmF1bHRQYWdlID0gcGFnZU5hbWVzWzBdO1xucGFnZU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHBhZ2VOYW1lKSB7XG5cdHBhZ2VzW3BhZ2VOYW1lXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhZ2VOYW1lKTtcblx0bG9hZE1hcmtkb3duKHBhZ2VOYW1lKTtcblxuXHQvLyBIaWRlIGFuZCBkaXNhYmxlIHBhZ2VzIHRoYXQgYXJlIG5vdCB0aGUgZGVmYXVsdC5cblx0aWYgKHBhZ2VOYW1lICE9IGRlZmF1bHRQYWdlKSB7XG5cdFx0cGFnZXNbcGFnZU5hbWVdLmhpZGRlbiA9IHRydWU7XG5cdFx0cGFnZXNbcGFnZU5hbWVdLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBuYXZpZ2F0ZSgpIHtcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBhZ2UgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG5cdFx0aWYgKHBhZ2VzW3BhZ2VdKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHBhZ2VzKSB7XG5cdFx0XHRcdGlmIChwID09IHBhZ2UpIHtcblx0XHRcdFx0XHRwYWdlc1twXS5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRwYWdlc1twXS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBhZ2VzW3BdLmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdFx0cGFnZXNbcF0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSwgMTAwKTtcbn1cblxubmF2aWdhdGUoKTsiXX0=
