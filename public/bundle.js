(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var menuBar = document.createElement('div');
menuBar.className = 'menu-bar';
menuBar.innerHTML =
'<a class="active" href="#about">About</a>\
<a href="#projects">Projects</a>\
<a href="/images/resume.pdf">Resume</a>\
<a href="https://github.com/milokhl/rl-poker-app">Github</a>';
document.body.appendChild(menuBar);

menuBar.addEventListener('click', function(e) {
	navigate();
});

var aboutSection = document.getElementById('about');
var projectSection = document.getElementById('projects');
projectSection.hidden = true;

// Set up about page.
var aboutTitle = document.createElement('h1');
aboutTitle.innerHTML = 'About';
var aboutText = document.createElement('p');
aboutText.innerHTML =
"My name is Milo Knowles, and I'm a junior at MIT studying computer science and aeronautical engineering. Welcome to my website!";
aboutSection.appendChild(aboutTitle);
aboutSection.appendChild(aboutText);

// Set up the projects page.
var projectsTitle = document.createElement('h1');
projectsTitle.innerHTML = 'Projects';
var projectText = document.createElement('p');
projectText.innerHTML = "Some of my projects are listed below:";
projectSection.appendChild(projectsTitle);
projectSection.appendChild(projectText);

var pages = {
	'about': aboutSection,
	'projects': projectSection,
};

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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWVudUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubWVudUJhci5jbGFzc05hbWUgPSAnbWVudS1iYXInO1xubWVudUJhci5pbm5lckhUTUwgPVxuJzxhIGNsYXNzPVwiYWN0aXZlXCIgaHJlZj1cIiNhYm91dFwiPkFib3V0PC9hPlxcXG48YSBocmVmPVwiI3Byb2plY3RzXCI+UHJvamVjdHM8L2E+XFxcbjxhIGhyZWY9XCIvaW1hZ2VzL3Jlc3VtZS5wZGZcIj5SZXN1bWU8L2E+XFxcbjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbWlsb2tobC9ybC1wb2tlci1hcHBcIj5HaXRodWI8L2E+JztcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWVudUJhcik7XG5cbm1lbnVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdG5hdmlnYXRlKCk7XG59KTtcblxudmFyIGFib3V0U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dCcpO1xudmFyIHByb2plY3RTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5wcm9qZWN0U2VjdGlvbi5oaWRkZW4gPSB0cnVlO1xuXG4vLyBTZXQgdXAgYWJvdXQgcGFnZS5cbnZhciBhYm91dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbmFib3V0VGl0bGUuaW5uZXJIVE1MID0gJ0Fib3V0JztcbnZhciBhYm91dFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5hYm91dFRleHQuaW5uZXJIVE1MID1cblwiTXkgbmFtZSBpcyBNaWxvIEtub3dsZXMsIGFuZCBJJ20gYSBqdW5pb3IgYXQgTUlUIHN0dWR5aW5nIGNvbXB1dGVyIHNjaWVuY2UgYW5kIGFlcm9uYXV0aWNhbCBlbmdpbmVlcmluZy4gV2VsY29tZSB0byBteSB3ZWJzaXRlIVwiO1xuYWJvdXRTZWN0aW9uLmFwcGVuZENoaWxkKGFib3V0VGl0bGUpO1xuYWJvdXRTZWN0aW9uLmFwcGVuZENoaWxkKGFib3V0VGV4dCk7XG5cbi8vIFNldCB1cCB0aGUgcHJvamVjdHMgcGFnZS5cbnZhciBwcm9qZWN0c1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbnByb2plY3RzVGl0bGUuaW5uZXJIVE1MID0gJ1Byb2plY3RzJztcbnZhciBwcm9qZWN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbnByb2plY3RUZXh0LmlubmVySFRNTCA9IFwiU29tZSBvZiBteSBwcm9qZWN0cyBhcmUgbGlzdGVkIGJlbG93OlwiO1xucHJvamVjdFNlY3Rpb24uYXBwZW5kQ2hpbGQocHJvamVjdHNUaXRsZSk7XG5wcm9qZWN0U2VjdGlvbi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG5cbnZhciBwYWdlcyA9IHtcblx0J2Fib3V0JzogYWJvdXRTZWN0aW9uLFxuXHQncHJvamVjdHMnOiBwcm9qZWN0U2VjdGlvbixcbn07XG5cbmZ1bmN0aW9uIG5hdmlnYXRlKCkge1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcblx0XHRpZiAocGFnZXNbcGFnZV0pIHtcblx0XHRcdGZvciAodmFyIHAgaW4gcGFnZXMpIHtcblx0XHRcdFx0aWYgKHAgPT0gcGFnZSkge1xuXHRcdFx0XHRcdHBhZ2VzW3BdLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdHBhZ2VzW3BdLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFnZXNbcF0uaGlkZGVuID0gdHJ1ZTtcblx0XHRcdFx0XHRwYWdlc1twXS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCAxMDApO1xufSJdfQ==
