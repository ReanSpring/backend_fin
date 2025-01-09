const connection = require('../server'); // Adjust the path as necessary

// Create the users table if it doesn't exist
const createUserTable = `
    CREATE TABLE IF NOT EXISTS incomes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        source VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

connection.query(createUserTable, (err, results, fields) => {
    if (err) {
        console.error('Failed to create incomes table', err);
        return;
    }
    console.log('Incomes table created or already exists');
});

// Function to create a new income

const createIncome = (income, callback) => {
    const { source, amount } = income;
    const query = 'INSERT INTO incomes (source, amount) VALUES (?, ?)';
    connection.query(query, [source, amount], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
}

// Function to get all incomes
const getIncomes = (callback) => {
    const query = 'SELECT * FROM incomes';
    connection.query(query, (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// Function to get income by id
const getIncomeById = (id, callback) => {
    const query = 'SELECT * FROM incomes WHERE id = ?';
    connection.query(query, [id], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
}

module.exports = {
    createIncome,
    getIncomes,
    getIncomeById
};