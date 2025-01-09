const connection = require('../server'); // Adjust the path as necessary

// Create the outcomes table if it doesn't exist
const createOutcomeTable = `
    CREATE TABLE IF NOT EXISTS outcomes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        source VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

connection.query(createOutcomeTable, (err, results, fields) => {
    if (err) {
        console.error('Failed to create outcomes table', err);
        return;
    }
    console.log('Outcomes table created or already exists');
});

// Function to create a new outcome
const createOutcome = (outcome, callback) => {
    const { source, amount } = outcome;
    const query = 'INSERT INTO outcomes (source, amount) VALUES (?, ?)';
    connection.query(query, [source, amount], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
}

// Function to get all outcomes
const getOutcomes = (callback) => {
    const query = 'SELECT * FROM outcomes';
    connection.query(query, (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Function to get outcome by id

const getOutcomeById = (id, callback) => {
    const query = 'SELECT * FROM outcomes WHERE id = ?';
    connection.query(query, [id], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
}

module.exports = {
    createOutcome,
    getOutcomes,
    getOutcomeById
};