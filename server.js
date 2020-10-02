const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.get("/", (req, res) => res.send("ITS WORKING"));

app.use(express.json({ extended: false })); //allows to get data in request.body (in user.js)

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});