const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

// app.get("/", (req, res) => res.send("ITS WORKING"));

app.use(express.json({ extended: false })); //allows to get data in request.body (in user.js)

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build")); //client/build will be our static fo;der (with index.html)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); //go to index.html
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
