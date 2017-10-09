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