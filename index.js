var express 					= require('express');
		app 							= express();
		path 							= require('path');
		browserify 				= require('browserify-middleware');

var publicDir = path.join(__dirname, './public');

// Set the view engine to serve .pug files from /views.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Serve static HTML.
app.use('/', express.static(publicDir));
app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port', process.env.PORT || 3000);
});

app.get("/", (req, res) => {
  res.render("homepage", {
    user: req.user
  });
});

// Let's Encrypt challenge.
app.get('/.well-known/acme-challenge/3N959xhuC5XC84Ik59Ham09Lr5dKXhcPnSTt69Z4X3A', function(req, res) {
	res.send('3N959xhuC5XC84Ik59Ham09Lr5dKXhcPnSTt69Z4X3A.PIzpJbsB_q4-uxsEHMcmklQBpTNHfdMfG7IdhmYrBoc');
});
