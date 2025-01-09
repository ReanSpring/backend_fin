const connection = require('../../server'); // Adjust the path as necessary

// Create the yearly table if it doesn't exist
const createYearlyTable = `
    CREATE TABLE IF NOT EXISTS yearlies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
    )
`;


connection.query(createYearlyTable, (err, results, fields) => {
    if (err) {
        console.error('Failed to create yearlies table', err);
        return;
    }
    console.log('Yearlies table created or already exists');
});

// Function to create a new yearly
const createYearly = (yearly, callback) => {
    const { year, amount } = yearly;
    const query = 'INSERT INTO yearlies (year, amount) VALUES (?, ?)';
    connection.query(query, [year, amount], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
}

// Function to get all yearlies
const getYearlies = (callback) => {
    const query = 'SELECT * FROM yearlies';
    connection.query(query, (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Function to get yearly by id

const getYearlyById = (id, callback) => {
    const query = 'SELECT * FROM yearlies WHERE id = ?';
    connection.query(query, [id], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
}

module.exports = {
    createYearly,
    getYearlies,
    getYearlyById
};
