const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
connectDB();

// app.get("/", (req, res) => res.send("ITS WORKING"));

app.use(express.json({ extended: false })); //allows to get data in request.body (in user.js)

// socket.io
app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
const io = socketio(server);

// run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ from, to }) => {
    const roomName = from > to ? `${to}${from}` : `${from}${to}`;
    socket.join(roomName);

    socket.emit("message", "Welcome to Chat");
    // Broadcast when a user connects
    socket.broadcast.to(roomName).emit("message", "A user has joined the chat");
    socket.on("chatMessage", (message) => {
      socket.broadcast.to(roomName).emit("chatMessage", message);
    });
  });
});

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

server.listen(PORT, () => console.log(`Server started at port ${PORT}`));
