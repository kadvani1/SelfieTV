'use strict';
var _ = require('underscore');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./data/sky_programme_metadata.sqlite"
    }
});

module.exports = {

    getMatches: function(res) {

        var query = knex
            .distinct('name', 'tags')
            .select()
            .from('sky_programme_metadata');

        var subquery = knex
            .select('name')

        res.sub_genres.forEach(function(sub_genre) {
            subquery.orWhere('sub-genres', 'like', '%' + sub_genre + '%')
        });

        if (res.no_sub_genres.length <= 0 ) {
            res.no_sub_genres = ['test']
        };
        var subquery2 = knex
            .select('name')

        res.no_sub_genres.forEach(function(no_sub_genre) {
            subquery2.orWhere('sub-genres', 'like', '%' + no_sub_genre + '%')
        });

        var subquery3 = knex
            .select('name')

        res.tags.forEach(function(tag) {
            subquery3.orWhere('tags', 'like', '%' + tag + '%')
        });

        query
            .andWhere('name', 'in', subquery3)
            .andWhere('name', 'not in', subquery2)
            .andWhere('name', 'in', subquery)

        return query.then(function(rows) {
            return rows;
        });
    },
    getTags: function(key_word) {

        return knex.select('tags')
            .from('sky_programme_metadata')
            .then(function(rows) {
                return _.pluck(rows, 'tags');
            });
    }
};
