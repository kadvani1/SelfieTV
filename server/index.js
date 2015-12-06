var express = require('express');
var app = express();
var _ = require('underscore');
var async = require("async");

var recs = require('./app/recommendations');
var filters = require('./app/filters');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/', function(req, res, next) {

    var number_of_people = req.query.num;
    var photo = req.query.ages.split(',');
    var gender = req.query.genders.split(',');

    var tags = filters.getFilters(photo, number_of_people, gender);
    console.log(tags)
    recs.getMatches(tags)
        .then(function(results) {

            res.json({
                matches: results[getRandomInt(0, results.length)]
            });
        })
        .catch(function(error) {
            console.error(error);
            return next(new Error("Something went wrong"));
        });
});

app.get('/test', function(req, res, next) {

    recs.getTags()
        .then(function(results) {

            var uniqTags = [];

            uniqTags = _.chain(results)
                .map(function(line) {
                    return line.split(';');
                })
                .flatten()
                .reduce(function(word) {
                    counts[word] = (counts[word] || 0) + 1;
                    return counts;
                }, {})
                .value();

            res.json({
                tags: uniqTags
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
