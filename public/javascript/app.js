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