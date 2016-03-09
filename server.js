// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
 // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();

});

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});
router.route('/test')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
	 	res.json({"status":1,message:"create success"});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	 

			res.json({"count":1415,"data":[{"_id":"56c5235b80c80c03007e9080","name":" sds","nameToLower":" sds","__v":0,"iron":{"value":1,"unit":"%"},"calcium":{"value":12,"unit":"%"},"sodium":{"value":111,"unit":"mg"},"protein":{"value":99,"unit":"g"},"carbs":{"value":1,"unit":"g"},"fat":{"value":12,"unit":"g"},"calories":{"value":21,"unit":"Cal"},"serving":"100g"},{"_id":"56bdefd5a192740300d215c4","name":" vcvxcvxcvx","nameToLower":" vcvxcvxcvx","__v":0,"iron":{"value":4,"unit":"%"},"calcium":{"value":4,"unit":"%"},"sodium":{"value":4,"unit":"mg"},"protein":{"value":4,"unit":"g"},"carbs":{"value":4,"unit":"g"},"fat":{"value":4,"unit":"g"},"calories":{"value":5,"unit":"Cal"},"serving":"100g"},{"_id":"56cdb116cc5f98030033d8c9","name":"!_test","nameToLower":"!_test","__v":0,"iron":{"value":7,"unit":"%"},"calcium":{"value":5,"unit":"%"},"sodium":{"value":2,"unit":"mg"},"protein":{"value":10,"unit":"g"},"carbs":{"value":2,"unit":"g"},"fat":{"value":15,"unit":"g"},"calories":{"value":150,"unit":"Cal"},"serving":"100g"},{"_id":"56409a28bd951e03001aa40a","name":"#00","nameToLower":"#00","__v":0,"iron":{"value":0,"unit":"%"},"calcium":{"value":0,"unit":"%"},"sodium":{"value":0,"unit":"mg"},"protein":{"value":0,"unit":"g"},"carbs":{"value":0,"unit":"g"},"fat":{"value":0,"unit":"g"},"calories":{"value":0,"unit":"Cal"},"serving":"100g"},{"_id":"55b2de858f175c030051a156","name":"#11111","nameToLower":"#11111","__v":0,"iron":{"value":0,"unit":"%"},"calcium":{"value":0,"unit":"%"},"sodium":{"value":0,"unit":"mg"},"protein":{"value":0,"unit":"g"},"carbs":{"value":0,"unit":"g"},"fat":{"value":0,"unit":"g"},"calories":{"value":1,"unit":"Cal"},"serving":"100g"}]});
	 
	});
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port,"0.0.0.0");
console.log('Magic happens on port ' + port);
