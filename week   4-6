const express = require('express');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require("csrf-csrf");

const app = express();
const PORT = 3000;

// --- 1. Middleware ---
app.use(express.json());
app.use(cookieParser("your_secret_key")); // Fixes 'cookie-parser' error

// --- 2. CSRF Configuration ---
const { doubleCsrfProtection, generateToken } = doubleCsrf({
    getSecret: () => "your_secret_key",
    cookieName: "x-csrf-token",
    cookieOptions: { httpOnly: true, sameSite: "Lax", secure: false },
    getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

// --- 3. Routes ---
// Home route to prevent "Cannot GET /"
app.get('/', (req, res) => {
    res.send("<h1>Server is Live!</h1><p>Ready for Burp Suite testing.</p>");
});

// Route to get the CSRF token for testing
app.get("/api/get-csrf-token", (req, res) => {
    const token = generateToken(req, res);
    res.json({ csrfToken: token });
});

// Protected route that requires a CSRF token
app.post("/api/update-data", doubleCsrfProtection, (req, res) => {
    res.json({ message: "Success! Valid CSRF token provided." });
});

// --- 4. Error Handling ---
app.use((error, req, res, next) => {
    if (error.code === "EBADCSRFTOKEN") {
        return res.status(403).json({ message: "CSRF Attack Blocked!" });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
