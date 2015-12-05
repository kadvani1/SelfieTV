'use strict';
var _ = require('underscore');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./data/sky_programme_metadata.sqlite"
    }
});

module.exports = {

    getMatches: function(tags) {

        tags = tags || [];
        var query = knex
            .distinct('name', 'programme_uuid', 'tags')
            .select()
            .from('sky_programme_metadata');

            tags.forEach(function (tag) {
                query.orWhere('tags', 'like', '%' + tag + '%')
            })
        return query.then(function(rows) {
                return rows;
            });
    },
    getTags: function(key_word) {

        return knex.select('tags')
            .from('sky_programme_metadata')
            .where('tags', 'like', '%' + key_word + '%')
            .then(function(rows) {
                return _.pluck(rows, 'tags');
            });
    }
};
