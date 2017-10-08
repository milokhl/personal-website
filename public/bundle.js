(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var aboutSection = document.getElementById('about');
var projectSection = document.getElementById('projects');
var contactSection = document.getElementById('contact');
contactSection.hidden = true;
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

// Set up contact section.
contactSection.innerHTML = '<h1>Contact</h1>\
	<p>Milo Knowles</p>\
	<p>mknowles@mit.edu</p>\
	<p>hmu on linkedin</p>';

var pages = {
	'about': aboutSection,
	'projects': projectSection,
	'contact': contactSection
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtZW51QmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5tZW51QmFyLmNsYXNzTmFtZSA9ICdtZW51LWJhcic7XG5tZW51QmFyLmlubmVySFRNTCA9XG4nPGEgY2xhc3M9XCJhY3RpdmVcIiBocmVmPVwiI2Fib3V0XCI+QWJvdXQ8L2E+XFxcbjxhIGhyZWY9XCIjcHJvamVjdHNcIj5Qcm9qZWN0czwvYT5cXFxuPGEgaHJlZj1cIiNjb250YWN0XCI+Q29udGFjdDwvYT5cXFxuPGEgaHJlZj1cIi9pbWFnZXMvcmVzdW1lLnBkZlwiPlJlc3VtZTwvYT5cXFxuPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9taWxva2hsXCI+R2l0aHViPC9hPic7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lbnVCYXIpO1xuXG5tZW51QmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRuYXZpZ2F0ZSgpO1xufSk7XG5cbnZhciBhYm91dFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQnKTtcbnZhciBwcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xudmFyIGNvbnRhY3RTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QnKTtcbmNvbnRhY3RTZWN0aW9uLmhpZGRlbiA9IHRydWU7XG5wcm9qZWN0U2VjdGlvbi5oaWRkZW4gPSB0cnVlO1xuXG4vLyBTZXQgdXAgYWJvdXQgcGFnZS5cbnZhciBhYm91dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbmFib3V0VGl0bGUuaW5uZXJIVE1MID0gJ0Fib3V0JztcbnZhciBhYm91dFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5hYm91dFRleHQuaW5uZXJIVE1MID1cblwiTXkgbmFtZSBpcyBNaWxvIEtub3dsZXMsIGFuZCBJJ20gYSBqdW5pb3IgYXQgTUlUIHN0dWR5aW5nIGNvbXB1dGVyIHNjaWVuY2UgYW5kIGFlcm9uYXV0aWNhbCBlbmdpbmVlcmluZy4gV2VsY29tZSB0byBteSB3ZWJzaXRlIVwiO1xuYWJvdXRTZWN0aW9uLmFwcGVuZENoaWxkKGFib3V0VGl0bGUpO1xuYWJvdXRTZWN0aW9uLmFwcGVuZENoaWxkKGFib3V0VGV4dCk7XG5cbi8vIFNldCB1cCB0aGUgcHJvamVjdHMgcGFnZS5cbnZhciBwcm9qZWN0c1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbnByb2plY3RzVGl0bGUuaW5uZXJIVE1MID0gJ1Byb2plY3RzJztcbnZhciBwcm9qZWN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbnByb2plY3RUZXh0LmlubmVySFRNTCA9IFwiU29tZSBvZiBteSBwcm9qZWN0cyBhcmUgbGlzdGVkIGJlbG93OlwiO1xucHJvamVjdFNlY3Rpb24uYXBwZW5kQ2hpbGQocHJvamVjdHNUaXRsZSk7XG5wcm9qZWN0U2VjdGlvbi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG5cbi8vIFNldCB1cCBjb250YWN0IHNlY3Rpb24uXG5jb250YWN0U2VjdGlvbi5pbm5lckhUTUwgPSAnPGgxPkNvbnRhY3Q8L2gxPlxcXG5cdDxwPk1pbG8gS25vd2xlczwvcD5cXFxuXHQ8cD5ta25vd2xlc0BtaXQuZWR1PC9wPlxcXG5cdDxwPmhtdSBvbiBsaW5rZWRpbjwvcD4nO1xuXG52YXIgcGFnZXMgPSB7XG5cdCdhYm91dCc6IGFib3V0U2VjdGlvbixcblx0J3Byb2plY3RzJzogcHJvamVjdFNlY3Rpb24sXG5cdCdjb250YWN0JzogY29udGFjdFNlY3Rpb25cbn07XG5cbmZ1bmN0aW9uIG5hdmlnYXRlKCkge1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcblx0XHRpZiAocGFnZXNbcGFnZV0pIHtcblx0XHRcdGZvciAodmFyIHAgaW4gcGFnZXMpIHtcblx0XHRcdFx0aWYgKHAgPT0gcGFnZSkge1xuXHRcdFx0XHRcdHBhZ2VzW3BdLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdHBhZ2VzW3BdLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFnZXNbcF0uaGlkZGVuID0gdHJ1ZTtcblx0XHRcdFx0XHRwYWdlc1twXS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCAxMDApO1xufSJdfQ==
