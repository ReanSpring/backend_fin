const connection = require('../server'); 

// Create the monthly table if it doesn't exist
const createMonthlyTable = `
    CREATE TABLE IF NOT EXISTS monthlies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        month DATE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
    )
`;

connection.query(createMonthlyTable, (err, results, fields) => {
    if (err) {
        console.error('Failed to create monthlies table', err);
        return;
    }
    console.log('Monthlies table created or already exists');
});

// Function to create a new monthly
const createMonthly = (monthly, callback) => {
    const { month, amount } = monthly;
    const query = 'INSERT INTO monthlies (month, amount) VALUES (?, ?)';
    connection.query(query, [month, amount], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
}

// Function to get all monthlies
const getMonthlies = (callback) => {
    const query = 'SELECT * FROM monthlies';
    connection.query(query, (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Function to get monthly by id

const getMonthlyById = (id, callback) => {
    const query = 'SELECT * FROM monthlies WHERE id = ?';
    connection.query(query, [id], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
}

module.exports = {
    createMonthly,
    getMonthlies,
    getMonthlyById
};