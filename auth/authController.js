import jwt from "jsonwebtoken";
import db from "./db.js"; 

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use promise wrapper for the basic mysql connection
    const query = "SELECT * FROM users WHERE username = ?";
    const results = await new Promise((resolve, reject) => {
      db.query(query, [username], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Simple plain text password for easy testing
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
