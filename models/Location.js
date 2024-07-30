const db = require('../config/config_db')
let sql;

const states = [
    'Abia', 'Abuja', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

db.serialize(() => {
    sql = `CREATE TABLE IF NOT EXISTS Location(id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL)`
    db.run(sql, (err) => {
        if (err) {
            return  console.error(err.message)
        }
    });
    
    const insert = db.prepare(`INSERT INTO Location(name) VALUES (?)`)
    states.forEach(state => {
        insert.run(state, (err) => {
            if (err) return console.error(err.message)
        });
    });

    insert.finalize()
})

db.close()