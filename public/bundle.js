(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Main navigation bar.
var menuBar = document.createElement('div');
menuBar.className = 'menu-bar';
menuBar.innerHTML =
'<a class="active" href="/about">About</a>\
<a href="/projects">Projects</a>\
<a href="/contact">Contact</a>\
<a href="/images/resume.pdf">Resume</a>\
<a href="https://github.com/milokhl">Github</a>\
<a href="https://milokhl.wordpress.com/">Old Blog</a>';
document.body.appendChild(menuBar);

// pageContainer allows new HTML to be loaded in without reloading the page.
var pageContainer = document.getElementById('page-container');

/*
Intercepts click events, so that if the user clicks on a local link
the new content will be loaded into the page, rather than having
the browser redirect.
*/
function interceptClickEvent(e) {
    var href;
    var target = e.target || e.srcElement;
    if (target.tagName === 'A') {
        href = target.getAttribute('href');

        // Page should not reload for local pages.
        if (href[0] == '/') {
        	e.preventDefault();

        	// Open pdf in new window.
        	if (href.includes('.pdf')) {
        		window.open(href, '_blank');
        	} else {
        		loadContent(href, pageContainer);
        	}
        }
    }
}

// Listen for clicks to intercept link requests.
if (document.addEventListener) {
    document.addEventListener('click', interceptClickEvent);
} else if (document.attachEvent) {
    document.attachEvent('onclick', interceptClickEvent);
}

/*
Looks for a local url, such as /about or 
/pages/maslab-2017.
If found, the "container" div will have its
innerHTML set to the rendered markdown.
*/
function loadContent(pageUrl, container) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      container.innerHTML = this.responseText;
      window.history.pushState(this.responseText, "Milo Knowles", '/html/index.html#' + pageUrl);
    }
  };
  xhttp.open('GET', pageUrl, true);
  xhttp.send();
}

function navigateLocal(pathname) {
	var localPath = window.location.hash.substr(1);

	// Load the 'about' page by default.
	if (!localPath) {
		localPath = '/about';
	}
	setTimeout(function () {
		loadContent(localPath, pageContainer);
	}, 10);
}
navigateLocal();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIE1haW4gbmF2aWdhdGlvbiBiYXIuXG52YXIgbWVudUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubWVudUJhci5jbGFzc05hbWUgPSAnbWVudS1iYXInO1xubWVudUJhci5pbm5lckhUTUwgPVxuJzxhIGNsYXNzPVwiYWN0aXZlXCIgaHJlZj1cIi9hYm91dFwiPkFib3V0PC9hPlxcXG48YSBocmVmPVwiL3Byb2plY3RzXCI+UHJvamVjdHM8L2E+XFxcbjxhIGhyZWY9XCIvY29udGFjdFwiPkNvbnRhY3Q8L2E+XFxcbjxhIGhyZWY9XCIvaW1hZ2VzL3Jlc3VtZS5wZGZcIj5SZXN1bWU8L2E+XFxcbjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbWlsb2tobFwiPkdpdGh1YjwvYT5cXFxuPGEgaHJlZj1cImh0dHBzOi8vbWlsb2tobC53b3JkcHJlc3MuY29tL1wiPk9sZCBCbG9nPC9hPic7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lbnVCYXIpO1xuXG4vLyBwYWdlQ29udGFpbmVyIGFsbG93cyBuZXcgSFRNTCB0byBiZSBsb2FkZWQgaW4gd2l0aG91dCByZWxvYWRpbmcgdGhlIHBhZ2UuXG52YXIgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLWNvbnRhaW5lcicpO1xuXG4vKlxuSW50ZXJjZXB0cyBjbGljayBldmVudHMsIHNvIHRoYXQgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIGEgbG9jYWwgbGlua1xudGhlIG5ldyBjb250ZW50IHdpbGwgYmUgbG9hZGVkIGludG8gdGhlIHBhZ2UsIHJhdGhlciB0aGFuIGhhdmluZ1xudGhlIGJyb3dzZXIgcmVkaXJlY3QuXG4qL1xuZnVuY3Rpb24gaW50ZXJjZXB0Q2xpY2tFdmVudChlKSB7XG4gICAgdmFyIGhyZWY7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICBocmVmID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAgIC8vIFBhZ2Ugc2hvdWxkIG5vdCByZWxvYWQgZm9yIGxvY2FsIHBhZ2VzLlxuICAgICAgICBpZiAoaHJlZlswXSA9PSAnLycpIHtcbiAgICAgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgXHQvLyBPcGVuIHBkZiBpbiBuZXcgd2luZG93LlxuICAgICAgICBcdGlmIChocmVmLmluY2x1ZGVzKCcucGRmJykpIHtcbiAgICAgICAgXHRcdHdpbmRvdy5vcGVuKGhyZWYsICdfYmxhbmsnKTtcbiAgICAgICAgXHR9IGVsc2Uge1xuICAgICAgICBcdFx0bG9hZENvbnRlbnQoaHJlZiwgcGFnZUNvbnRhaW5lcik7XG4gICAgICAgIFx0fVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBMaXN0ZW4gZm9yIGNsaWNrcyB0byBpbnRlcmNlcHQgbGluayByZXF1ZXN0cy5cbmlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbnRlcmNlcHRDbGlja0V2ZW50KTtcbn0gZWxzZSBpZiAoZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25jbGljaycsIGludGVyY2VwdENsaWNrRXZlbnQpO1xufVxuXG4vKlxuTG9va3MgZm9yIGEgbG9jYWwgdXJsLCBzdWNoIGFzIC9hYm91dCBvciBcbi9wYWdlcy9tYXNsYWItMjAxNy5cbklmIGZvdW5kLCB0aGUgXCJjb250YWluZXJcIiBkaXYgd2lsbCBoYXZlIGl0c1xuaW5uZXJIVE1MIHNldCB0byB0aGUgcmVuZGVyZWQgbWFya2Rvd24uXG4qL1xuZnVuY3Rpb24gbG9hZENvbnRlbnQocGFnZVVybCwgY29udGFpbmVyKSB7XG4gIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5yZXNwb25zZVRleHQ7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUodGhpcy5yZXNwb25zZVRleHQsIFwiTWlsbyBLbm93bGVzXCIsICcvaHRtbC9pbmRleC5odG1sIycgKyBwYWdlVXJsKTtcbiAgICB9XG4gIH07XG4gIHhodHRwLm9wZW4oJ0dFVCcsIHBhZ2VVcmwsIHRydWUpO1xuICB4aHR0cC5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIG5hdmlnYXRlTG9jYWwocGF0aG5hbWUpIHtcblx0dmFyIGxvY2FsUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcblxuXHQvLyBMb2FkIHRoZSAnYWJvdXQnIHBhZ2UgYnkgZGVmYXVsdC5cblx0aWYgKCFsb2NhbFBhdGgpIHtcblx0XHRsb2NhbFBhdGggPSAnL2Fib3V0Jztcblx0fVxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRsb2FkQ29udGVudChsb2NhbFBhdGgsIHBhZ2VDb250YWluZXIpO1xuXHR9LCAxMCk7XG59XG5uYXZpZ2F0ZUxvY2FsKCk7Il19
