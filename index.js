var express 					= require('express');
		app 							= express();
		path 							= require('path');
		browserify 				= require('browserify-middleware');

var publicDir = path.join(__dirname, './public');
app.locals.basedir = publicDir; // Needed for pug to use absolute paths.

// Set the view engine to serve .pug files from /views.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static HTML.
app.use('/', express.static(publicDir));
app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port', process.env.PORT || 3000);
});

// Serve the homepage at the base URL.
app.get("/", (req, res) => {
  res.render("homepage", {});
});

// Serve projects by string matching.
app.get("/projects/*", (req, res) => {
	const pageUrl = req.params['0'];
	if (pageUrl) {
		const projectUrl = path.join('projects', pageUrl.replace('.md', '.pug'));
		res.render(projectUrl); // Get rid of .md so that the .pug page is loaded.
	} else {
		res.render("project", {}); // Else show the base project page.
	}
});

// Let's Encrypt challenge.
app.get('/.well-known/acme-challenge/3N959xhuC5XC84Ik59Ham09Lr5dKXhcPnSTt69Z4X3A', function(req, res) {
	res.send('3N959xhuC5XC84Ik59Ham09Lr5dKXhcPnSTt69Z4X3A.PIzpJbsB_q4-uxsEHMcmklQBpTNHfdMfG7IdhmYrBoc');
});
