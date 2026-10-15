
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Notice = require("./models/Notice");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) =>
    console.log("MongoDB connection failed:", error.message)
  );

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Department Notice Board</h1>
    <p>This is the official department notice board.</p>
    <a href="/faculty">View Faculty</a>
  `);
});

app.get("/faculty", (req, res) => {
  const faculty = [
    "Dr. Ramesh",
    "Dr. Suresh",
    "Dr. Anita",
    "Ms. Kavita",
    "Mr. Rajesh"
  ];

  res.send(`
    <h1>Department Faculty</h1>
    <ul>${faculty.map(name => `<li>${name}</li>`).join("")}</ul>
    <a href="/">Back to Home</a>
  `);
});

app.post("/api/notices", async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title cannot be empty"
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message cannot be empty"
      });
    }

    const notice = await Notice.create({
      title: title.trim(),
      message: message.trim()
    });

    res.status(201).json({
      message: "Notice added successfully",
      notice
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add notice"
    });
  }
});

app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      createdAt: -1
    });

    res.json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch notices"
    });
  }
});
app.get("/api/notices/view", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    const rows = notices.map(notice => `
      <tr>
        <td>${notice._id}</td>
        <td>${notice.title}</td>
        <td>${notice.message}</td>
        <td>${notice.createdAt
          ? new Date(notice.createdAt).toLocaleString()
          : "N/A"}</td>
      </tr>
    `).join("");

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Department Notices - MongoDB Records</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 12px;
            background: #f8fafc;
            color: #172033;
          }
          h2 { font-size: 22px; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
          }
          th {
            background: #3078ed;
            color: white;
            text-align: left;
          }
          th, td {
            border: 1px solid #dce1e8;
            padding: 10px;
            overflow-wrap: anywhere;
          }
        </style>
      </head>
      <body>
        <h2>Department Notices - MongoDB Records</h2>
        <table>
          <thead>
            <tr>
              <th>MongoDB ID</th>
              <th>Title</th>
              <th>Message</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="4">No notices found.</td></tr>'}
          </tbody>
        </table>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load MongoDB records.");
  }
});
app.listen(3000, () => {
  
  console.log("Server running at http://localhost:3000");
});
