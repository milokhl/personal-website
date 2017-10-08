var express 					= require('express');
		app 							= express();
		path 							= require('path');
		sass							= require('node-sass-middleware');
		browserify 				= require('browserify-middleware');

app.use('/', express.static(path.join(__dirname,'./public')));
app.listen((process.env.PORT || 3000), function() {
  console.log('Listening on port 3000.')
});