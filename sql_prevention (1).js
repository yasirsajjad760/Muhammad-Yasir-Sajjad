/**
 * TASK 2: SQL INJECTION PREVENTION
 * Requirement: Apply prepared statements to secure the backend.
 */

const mysql = require('mysql2'); // Use mysql2 for prepared statement support

// ❌ VULNERABLE CODE (The "Cat" parameter attack)
// This is exactly what SQLMap exploited on the test site.
function unsafeGetProduct(req, res) {
    const category = req.query.cat; 
    // DANGER: String concatenation allows an attacker to inject "1 OR 1=1"
    const query = "SELECT * FROM products WHERE category_id = " + category;
    
    db.query(query, (err, result) => {
        res.send(result);
    });
}

// ✅ SECURE CODE (Prepared Statements)
// This prevents SQLi by using '?' as a placeholder.
function safeGetProduct(req, res) {
    const category = req.query.cat;

    // The '?' tells the database: "Expect a value here, NOT code."
    const query = "SELECT * FROM products WHERE category_id = ?";

    // The value is passed separately in an array. 
    // The database driver sanitizes it automatically.
    db.execute(query, [category], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}