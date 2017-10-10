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