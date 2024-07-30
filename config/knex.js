//initialize knex
const knex = require('knex')


//connect knex to the database
const connect = knex({
    client:'sqlite3',
    connection:{
        filename: 'properties.db'
    }
});

module.exports = connect;