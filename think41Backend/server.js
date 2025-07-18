const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running on port 5000"); // This sends a response to the client
  console.log("Received a request on /");
});

app.listen(5000, () => {
  console.log("The server is running on port 5000");
});