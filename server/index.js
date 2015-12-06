var express = require('express');
var app = express();
var _ = require('underscore');

var recs = require('./app/recommendations');
var filters = require('./app/filters');

async = require("async");

// // 1st para in async.each() is the array of items
// async.each(items,
//   // 2nd param is the function that each item is passed to
//   function(item, callback){
//     // Call an asynchronous function, often a save() to DB
//     item.someAsyncCall(function (){
//       // Async call is done, alert via callback
//       callback();
//     });
//   },
//   // 3rd param is the function to call when everything's done
//   function(err){
//     // All tasks are done now
//     doSomethingOnceAllAreDone();
//   }
// );



app.get('/', function(req, res, next) {

    var number_of_people = 1;
    var photo = [20, 30, 40];
    var gender;

    var tags = filters.getFilters(number_of_people, photo, gender);
    console.log(tags)
    recs.getMatches(tags)
        .then(function(results) {

            res.json({
                matches: results
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
                .reduce(function(counts, word) {
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
