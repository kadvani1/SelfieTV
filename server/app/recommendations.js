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

        res.tags.forEach(function(tag) {
            query.orWhere('tags', 'like', '%' + tag + '%')
                .where('name', 'in', subquery)
        });

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
