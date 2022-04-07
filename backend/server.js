const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todo", require("./routes/todoRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the todo app" });
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
