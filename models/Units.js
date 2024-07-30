const db = require('../config/config_db')
let sql;

db.serialize(() => {
    sql = `CREATE TABLE IF NOT EXISTS Units(
        id INTEGER PRIMARY KEY, 
        price REAL, 
        no_of_bedrooms INTEGER, 
        size_in_sqFt REAL, 
        apartment INTEGER,
        furnished INTEGER NOT NULL CHECK (furnished IN (0, 1)),
        FOREIGN KEY (apartment) REFERENCES Apartments (id) ON DELETE CASCADE)`;
    db.run(sql, (err) => {
        if (err) {
            return  console.error(err.message)
        }
    });
    
    const insert = db.prepare(`INSERT INTO Units(price, no_of_bedrooms, size_in_sqFt, apartment, furnished) VALUES (?,?,?,?,?)`)

    insert.run(35000000, 4, 3000, 1, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2700000, 4, 3000, 4, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(5100000, 4, 3000, 3, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3100000, 4, 3000, 6, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(35000000, 4, 3000, 1, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2700000, 4, 3000, 4, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(5100000, 4, 3000, 3, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3100000, 4, 3000, 6, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(35000000, 4, 3000, 1, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(2700000, 4, 3000, 2, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(5100000, 4, 3000, 3, 1, (err) => {
        if (err) return console.error(err.message)
    })
    insert.run(3100000, 4, 3000, 2, 1, (err) => {
        if (err) return console.error(err.message)
    })
  

    insert.finalize()
})

db.close()