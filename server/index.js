var express = require('express');
var app = express();
var _ = require('underscore');
var async = require("async");

var recs = require('./app/recommendations');
var filters = require('./app/filters');

var qt = require('quickthumb');
app.use(qt.static(__dirname + '/'));

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/', function(req, res, next) {

    var number_of_people = req.query.num;
    var photo = req.query.ages.split(',').map(Number);
    var gender = req.query.genders.split(',');

    var tags = filters.getFilters(photo, number_of_people, gender);
    console.log(tags)
    recs.getMatches(tags)
        .then(function(results) {

            var match = results[getRandomInt(0, results.length)]
            match.thumb = '/images/' + match.programme_uuid + '.jpeg';
            res.json({
                matches: match
            });
        })
        .catch(function(error) {
            console.error(error);
            return next(new Error("Something went wrong"));
        });
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
