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

// TODO: fix back button behavior
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBNYWluIG5hdmlnYXRpb24gYmFyLlxudmFyIG1lbnVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbm1lbnVCYXIuY2xhc3NOYW1lID0gJ21lbnUtYmFyJztcbm1lbnVCYXIuaW5uZXJIVE1MID1cbic8YSBjbGFzcz1cImFjdGl2ZVwiIGhyZWY9XCIvYWJvdXRcIj5BYm91dDwvYT5cXFxuPGEgaHJlZj1cIi9wcm9qZWN0c1wiPlByb2plY3RzPC9hPlxcXG48YSBocmVmPVwiL2NvbnRhY3RcIj5Db250YWN0PC9hPlxcXG48YSBocmVmPVwiL2ltYWdlcy9yZXN1bWUucGRmXCI+UmVzdW1lPC9hPlxcXG48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL21pbG9raGxcIj5HaXRodWI8L2E+XFxcbjxhIGhyZWY9XCJodHRwczovL21pbG9raGwud29yZHByZXNzLmNvbS9cIj5PbGQgQmxvZzwvYT4nO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtZW51QmFyKTtcblxuLy8gcGFnZUNvbnRhaW5lciBhbGxvd3MgbmV3IEhUTUwgdG8gYmUgbG9hZGVkIGluIHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBwYWdlLlxudmFyIHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZS1jb250YWluZXInKTtcblxuLypcbkludGVyY2VwdHMgY2xpY2sgZXZlbnRzLCBzbyB0aGF0IGlmIHRoZSB1c2VyIGNsaWNrcyBvbiBhIGxvY2FsIGxpbmtcbnRoZSBuZXcgY29udGVudCB3aWxsIGJlIGxvYWRlZCBpbnRvIHRoZSBwYWdlLCByYXRoZXIgdGhhbiBoYXZpbmdcbnRoZSBicm93c2VyIHJlZGlyZWN0LlxuKi9cbmZ1bmN0aW9uIGludGVyY2VwdENsaWNrRXZlbnQoZSkge1xuICAgIHZhciBocmVmO1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgaHJlZiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICAgICAgICAvLyBQYWdlIHNob3VsZCBub3QgcmVsb2FkIGZvciBsb2NhbCBwYWdlcy5cbiAgICAgICAgaWYgKGhyZWZbMF0gPT0gJy8nKSB7XG4gICAgICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIFx0Ly8gT3BlbiBwZGYgaW4gbmV3IHdpbmRvdy5cbiAgICAgICAgXHRpZiAoaHJlZi5pbmNsdWRlcygnLnBkZicpKSB7XG4gICAgICAgIFx0XHR3aW5kb3cub3BlbihocmVmLCAnX2JsYW5rJyk7XG4gICAgICAgIFx0fSBlbHNlIHtcbiAgICAgICAgXHRcdGxvYWRDb250ZW50KGhyZWYsIHBhZ2VDb250YWluZXIpO1xuICAgICAgICBcdH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gTGlzdGVuIGZvciBjbGlja3MgdG8gaW50ZXJjZXB0IGxpbmsgcmVxdWVzdHMuXG5pZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW50ZXJjZXB0Q2xpY2tFdmVudCk7XG59IGVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29uY2xpY2snLCBpbnRlcmNlcHRDbGlja0V2ZW50KTtcbn1cblxuLypcbkxvb2tzIGZvciBhIGxvY2FsIHVybCwgc3VjaCBhcyAvYWJvdXQgb3IgXG4vcGFnZXMvbWFzbGFiLTIwMTcuXG5JZiBmb3VuZCwgdGhlIFwiY29udGFpbmVyXCIgZGl2IHdpbGwgaGF2ZSBpdHNcbmlubmVySFRNTCBzZXQgdG8gdGhlIHJlbmRlcmVkIG1hcmtkb3duLlxuKi9cbmZ1bmN0aW9uIGxvYWRDb250ZW50KHBhZ2VVcmwsIGNvbnRhaW5lcikge1xuICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMucmVzcG9uc2VUZXh0O1xuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHRoaXMucmVzcG9uc2VUZXh0LCBcIk1pbG8gS25vd2xlc1wiLCAnL2h0bWwvaW5kZXguaHRtbCMnICsgcGFnZVVybCk7XG4gICAgfVxuICB9O1xuICB4aHR0cC5vcGVuKCdHRVQnLCBwYWdlVXJsLCB0cnVlKTtcbiAgeGh0dHAuc2VuZCgpO1xufVxuXG5mdW5jdGlvbiBuYXZpZ2F0ZUxvY2FsKHBhdGhuYW1lKSB7XG5cdHZhciBsb2NhbFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG5cblx0Ly8gTG9hZCB0aGUgJ2Fib3V0JyBwYWdlIGJ5IGRlZmF1bHQuXG5cdGlmICghbG9jYWxQYXRoKSB7XG5cdFx0bG9jYWxQYXRoID0gJy9hYm91dCc7XG5cdH1cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0bG9hZENvbnRlbnQobG9jYWxQYXRoLCBwYWdlQ29udGFpbmVyKTtcblx0fSwgMTApO1xufVxubmF2aWdhdGVMb2NhbCgpO1xuXG4vLyBUT0RPOiBmaXggYmFjayBidXR0b24gYmVoYXZpb3IiXX0=
