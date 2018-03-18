var express 					= require('express');
		app 							= express();
		path 							= require('path');
		sass							= require('node-sass-middleware');
		browserify 				= require('browserify-middleware');
		mds								= require('markdown-serve');

var publicDir = path.join(__dirname, './public');
var markDownDir = path.join(publicDir, './markdown');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Serve static HTML.
app.use('/', express.static(publicDir));
app.listen((process.env.PORT || 3000), function() {
  console.log('Listening on port ', process.env.PORT);
});

// Redirect to the main page.
app.get('/', function(req, res) {
  res.redirect('/html/base.html');
});

// Serve static markdown files.
app.use(mds.middleware({
  rootDirectory: markDownDir,
  view: 'markdown'
}));
