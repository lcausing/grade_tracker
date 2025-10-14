import db from "./db.js";

export const getUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};
