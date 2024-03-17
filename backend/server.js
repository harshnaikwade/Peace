import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt"; // For password hashing

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

// Handle database connection errors
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
    createDatabaseAndTables();
  }
});

// Function to create database and tables
const createDatabaseAndTables = () => {
  // Create database if not exists
  const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS peace";
  db.query(createDatabaseQuery, (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database 'peace' created or already exists");
      // Switch to peace database
      db.changeUser({ database: "peace" }, (err) => {
        if (err) {
          console.error("Error switching to peace database:", err);
        } else {
          console.log("Switched to database 'peace'");
          createTables();
        }
      });
    }
  });
};

// Function to create tables
const createTables = () => {
  // Create usernew table
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS usernew (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      gender VARCHAR(10) NOT NULL,
      dob DATE NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      medicalHistory TEXT,
      diagnosis VARCHAR(255),
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(createUserTableQuery, (err) => {
    if (err) {
      console.error("Error creating usernew table:", err);
    } else {
      console.log("Table 'usernew' created or already exists");
    }
  });

  // Create counselor table
  const createCounselorTableQuery = `
    CREATE TABLE IF NOT EXISTS counselor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      areaofexpertise VARCHAR(255) NOT NULL,
      yearsofexperience INT NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(createCounselorTableQuery, (err) => {
    if (err) {
      console.error("Error creating counselor table:", err);
    } else {
      console.log("Table 'counselor' created or already exists");
    }
  });
};

// Helper function for hashing passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Common authentication function
const authenticate = async (tableName, email, password, res) => {
  try {
    const sql = "SELECT * FROM ?? WHERE email = ?";
    db.query(sql, [tableName, email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];
      const storedPassword = user.password;

      const passwordMatch = await bcrypt.compare(password, storedPassword);
      if (passwordMatch) {
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dob: user.dob,
          gender: user.gender,
          diagnosis: user.diagnosis,
          // Add other user data as needed
        };
        return res
          .status(200)
          .json({ message: "Authentication successful", userData });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//USER APIs
app.get("/user", (req, res) => {
  const sql = "SELECT * FROM usernew";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(result);
  });
});

app.post("/user", async (req, res) => {
  const sql =
    "INSERT INTO usernew (`firstName`, `lastName`, `gender`, `dob`,`email`, `medicalHistory`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?);";
  const hashedPassword = await hashPassword(req.body.password);
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.dob,
    req.body.email,
    req.body.medicalHistory,
    hashedPassword,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "User created successfully" });
  });
});

app.post("/userauth", async (req, res) => {
  const { email, password } = req.body;
  authenticate("usernew", email, password, res); // Your existing authentication logic
});

//COUNSELOR APIs
app.get("/counselor", (req, res) => {
  const sql = "SELECT * FROM counselor";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(result);
  });
});

app.post("/counselor", async (req, res) => {
  const sql =
    "INSERT INTO counselor (`firstName`, `lastName`, `email`, `areaofexpertise`,`yearsofexperience`, `password`) VALUES (?, ?, ?, ?, ?, ?);";
  const hashedPassword = await hashPassword(req.body.password);
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.areaofexpertise,
    req.body.yearsofexperience,
    hashedPassword,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Counselor created successfully" });
  });
});

app.post("/counselorauth", (req, res) => {
  const { email, password } = req.body;
  authenticate("counselor", email, password, res);
});

//Miscellaneous APIs
app.post("/getCounselor", (req, res) => {
  const { email, diagnosis } = req.body;
  const sql = `UPDATE usernew SET diagnosis = ? WHERE email = ?`;
  db.query(sql, [diagnosis, email], (err, result) => {
    if (err) {
      console.error("Error storing diagnosis:", err);
      res.status(500).send("Error storing diagnosis");
      return;
    }
    console.log("Diagnosis stored successfully");
    const sql2 = `SELECT * FROM counselor WHERE areaofexpertise = ?`;
    db.query(sql2, [diagnosis], (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
        return;
      }
      console.log("counselor fetched successfully");
      res.status(200).json(result);
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
