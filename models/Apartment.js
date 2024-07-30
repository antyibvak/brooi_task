const db = require('../config/config_db')
let sql;

db.serialize(() => {
    sql = `CREATE TABLE IF NOT EXISTS Apartments(
        id INTEGER PRIMARY KEY, 
        no_of_units INTEGER, 
        location,
        size_in_sqFt INTEGER,
        FOREIGN KEY (location) REFERENCES Location (id) ON DELETE SET NULL)`
    db.run(sql, (err) => {
        if (err) {
            return  console.error(err.message)
        }
    });
    
    const insert = db.prepare(`INSERT INTO Apartments(no_of_units, location, size_in_sqFt) VALUES (?,?,?)`)

    insert.run(5, 2, 3000, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(4, 1, 5000, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3, 30, 6000, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(4, 29, 4000, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2, 21, 7500, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(5, 12, 3500, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3, 11, 2000, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2, 5, 2500, (err) => {
        if (err) return console.error(err.message)
    })

    insert.finalize()
})

db.close()