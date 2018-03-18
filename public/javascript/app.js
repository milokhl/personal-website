var marked = require('marked');
console.log(marked('I am using __markdown__.'));
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

// pageContainer allows new HTML to be loaded in without reloading the page.
var pageContainer = document.getElementById('site-wrapper');

/*
Intercepts click events, so that if the user clicks on a local link
the new content will be loaded into the page, rather than having
the browser redirect.
*/
function interceptClickEvent(e) {
  var target = e.target || e.srcElement;
  var linkParent = findParentOfTagName(target, 'A');

  if (linkParent) {
    var href = linkParent.getAttribute('href');

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

// Finds the first parent of an element with element.tagName == tagname.
// Returns null if none is found.
function findParentOfTagName(element, tagname) {
  if (element.classList && element.tagName == tagname) {
    return element;
  } else if (!element.parentNode) {
    return false;
  } else {
    return element.parentNode && findParentOfTagName(element.parentNode, tagname);
  }
}

// Listen for clicks to intercept link requests.
if (document.addEventListener) {
  document.addEventListener('click', interceptClickEvent);
} else if (document.attachEvent) {
  document.attachEvent('onclick', interceptClickEvent);
}

function highlightSyntax(html) {
  var result = html.match(/<code>(.*?)<\/code>/g);
  if (result) {
    var snippets = result.map(function(val) {
      return val.replace(/<\/?code>/g, '');
    });
    console.log(snippets);
  }
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
      highlightSyntax(this.responseText);
      window.history.pushState(this.responseText, "Milo Knowles", '/html/base.html#' + pageUrl);
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

function updateActiveButton() {
  var localPath = window.location.hash.substr(1);
  var button = document.getElementById(localPath + '-button');
  if (button) {
    button.classList.add('active');
  }
}
updateActiveButton();
