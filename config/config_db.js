const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('../properties.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Could not connect to database')
    } else {
        console.log('Successfully connected to database')
    };
})

//enable foreign key support
db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');
});

module.exports = db;
