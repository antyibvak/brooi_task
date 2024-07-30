const db = require('../config/config_db')
let sql;


db.serialize(() => {
    sql = `CREATE TABLE Houses(
        id INTEGER PRIMARY KEY, 
        no_of_bedrooms INTEGER, 
        no_of_floors INTEGER, 
        price REAL, 
        location, 
        size_in_sqFt REAL,
        furnished INTEGER NOT NULL CHECK (furnished IN (0, 1)),
        FOREIGN KEY (location) REFERENCES Location (id) ON DELETE SET NULL)`
        
    db.run(sql, (err) => {
        if (err) {
            return  console.error(err.message)
        }
    });
    
    const insert = db.prepare(`INSERT INTO Houses(no_of_bedrooms, no_of_floors, price, location, size_in_sqFt, furnished) VALUES (?,?,?,?,?,?)`)

    insert.run(5, 2, 300000,12, 2500, 0, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(4, 1, 500000, 23, 4000, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3, 3, 600000, 32, 3000, 0, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(4, 1, 400000, 2, 5000, 0, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2, 1, 7500000, 12, 3000, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(5, 2, 3500000, 10, 3500, 0, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3, 1, 2000000, 1, 4500, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2, 2, 2500000, 14, 5500, 0, (err) => {
        if (err) return console.error(err.message)
    })

    insert.finalize()
})

db.close()