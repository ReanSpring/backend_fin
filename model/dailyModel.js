const connection = require('../server'); // Adjust the path as necessary

// Create the daily table if it doesn't exist
const createDailyTable = `
    CREATE TABLE IF NOT EXISTS dailies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        day DATE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
    )
`;

connection.query(createDailyTable, (err, results, fields) => {
    if (err) {
        console.error('Failed to create dailies table', err);
        return;
    }
    console.log('Dailies table created or already exists');
});

// Function to create a new daily
const createDaily = (daily, callback) => {
    const { day, amount } = daily;
    const query = 'INSERT INTO dailies (day, amount) VALUES (?, ?)';
    connection.query(query, [day, amount], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
}

// Function to get all dailies
const getDailies = (callback) => {
    const query = 'SELECT * FROM dailies';
    connection.query(query, (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Function to get daily by id
const getDailyById = (id, callback) => {
    const query = 'SELECT * FROM dailies WHERE id = ?';
    connection.query(query, [id], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
}

module.exports = {
    createDaily,
    getDailies,
    getDailyById
};
