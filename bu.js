var cfg = require('./cfg');
var knex = require('knex')(cfg);

knex.schema.createTableIfNotExists('users', function (table) {
    table.increments();
    table.string('name');
    table.timestamps();
}).finally(function () {
    knex.destroy(function () {
        console.log("Done");
    });
});