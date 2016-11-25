/**
 * Load the Express library
 */
var express = require('express');
var path = require('path');

/**
 * Initiate the library
 */
var app = express();

/**
 * Configure the views folder
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/**
 * Configure the static ( images, css, js ) folder
 */
app.use('/static', express.static(path.join(__dirname, 'public')));

/**
 * Configure the routes
 */
app.get('/', function (req, res) {
    listTemperatures(function (err, temperatures) {
        console.log(temperatures);
        res.render('index', {title: 'Lab 00', err: err, temperatures: temperatures});
    })
});

/**
 * Start the Web server
 */
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function listTemperatures(next) {

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://localhost:27017/sensors', function (err, db) {

        if (err) {
            return next(null, []);
        }

        db.collection('temperatures').find().limit(10).toArray(function (err, result) {
            if (err) {
                return next(null, []);
            }
            return next(null, result);
        });

    });

}