import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST || "mysql", // docker-compose service name
  user: process.env.MYSQL_USER || "appuser",
  password: process.env.MYSQL_PASSWORD || "apppass",
  database: process.env.MYSQL_DATABASE || "grade_tracker",
};

let connection;

// Retry logic
const connectWithRetry = () => {
  console.log("🕓 Attempting MySQL connection...");

  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("❌ MySQL connection failed:", err.code);
      console.log("🔁 Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Connected to MySQL!");
    }
  });

  connection.on("error", (err) => {
    console.error("⚠️ MySQL error:", err.code);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNREFUSED") {
      connectWithRetry();
    } else {
      throw err;
    }
  });
};

connectWithRetry();

export default connection;

