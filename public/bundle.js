(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Main navigation bar.
var menuBar = document.createElement('div');
menuBar.className = 'menu-bar';
menuBar.innerHTML =
'<a class="active" href="#about">About</a>\
<a href="#projects">Projects</a>\
<a href="#contact">Contact</a>\
<a href="/images/resume.pdf">Resume</a>\
<a href="https://github.com/milokhl">Github</a>\
<a href="https://milokhl.wordpress.com/">Old Blog</a>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBNYWluIG5hdmlnYXRpb24gYmFyLlxudmFyIG1lbnVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbm1lbnVCYXIuY2xhc3NOYW1lID0gJ21lbnUtYmFyJztcbm1lbnVCYXIuaW5uZXJIVE1MID1cbic8YSBjbGFzcz1cImFjdGl2ZVwiIGhyZWY9XCIjYWJvdXRcIj5BYm91dDwvYT5cXFxuPGEgaHJlZj1cIiNwcm9qZWN0c1wiPlByb2plY3RzPC9hPlxcXG48YSBocmVmPVwiI2NvbnRhY3RcIj5Db250YWN0PC9hPlxcXG48YSBocmVmPVwiL2ltYWdlcy9yZXN1bWUucGRmXCI+UmVzdW1lPC9hPlxcXG48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL21pbG9raGxcIj5HaXRodWI8L2E+XFxcbjxhIGhyZWY9XCJodHRwczovL21pbG9raGwud29yZHByZXNzLmNvbS9cIj5PbGQgQmxvZzwvYT4nO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtZW51QmFyKTtcbm1lbnVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdG5hdmlnYXRlKCk7XG59KTtcblxuLypcbkxvb2tzIGZvciB0aGUgZmlsZSBwYWdlTmFtZS5tZCBpbiAvbWFya2Rvd24uXG5JZiBmb3VuZCwgdGhlIGRvY3VtZW50IGRpdiB3aXRoIGlkPXBhZ2VOYW1lIHdpbGxcbmhhdmUgaXRzIGlubmVySFRNTCBzZXQgdG8gdGhlIHJlbmRlcmVkIG1hcmtkb3duLlxuKi9cbmZ1bmN0aW9uIGxvYWRNYXJrZG93bihwYWdlTmFtZSkge1xuICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFnZU5hbWUpLmlubmVySFRNTCA9IHRoaXMucmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfTtcbiAgeGh0dHAub3BlbignR0VUJywgJy8nICsgcGFnZU5hbWUsIHRydWUpO1xuICB4aHR0cC5zZW5kKCk7XG59XG5cbi8vIExvYWQgdGhlIG1hcmtkb3duIGZvciBhbGwgcGFnZXMuXG52YXIgcGFnZXMgPSB7fTtcbnZhciBwYWdlTmFtZXMgPSBbJ2Fib3V0JywgJ3Byb2plY3RzJywgJ2NvbnRhY3QnXTtcbnZhciBkZWZhdWx0UGFnZSA9IHBhZ2VOYW1lc1swXTtcbnBhZ2VOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwYWdlTmFtZSkge1xuXHRwYWdlc1twYWdlTmFtZV0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYWdlTmFtZSk7XG5cdGxvYWRNYXJrZG93bihwYWdlTmFtZSk7XG5cblx0Ly8gSGlkZSBhbmQgZGlzYWJsZSBwYWdlcyB0aGF0IGFyZSBub3QgdGhlIGRlZmF1bHQuXG5cdGlmIChwYWdlTmFtZSAhPSBkZWZhdWx0UGFnZSkge1xuXHRcdHBhZ2VzW3BhZ2VOYW1lXS5oaWRkZW4gPSB0cnVlO1xuXHRcdHBhZ2VzW3BhZ2VOYW1lXS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gbmF2aWdhdGUoKSB7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBwYWdlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuXHRcdGlmIChwYWdlc1twYWdlXSkge1xuXHRcdFx0Zm9yICh2YXIgcCBpbiBwYWdlcykge1xuXHRcdFx0XHRpZiAocCA9PSBwYWdlKSB7XG5cdFx0XHRcdFx0cGFnZXNbcF0uaGlkZGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0cGFnZXNbcF0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwYWdlc1twXS5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHRcdHBhZ2VzW3BdLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sIDEwMCk7XG59XG5cbm5hdmlnYXRlKCk7Il19
