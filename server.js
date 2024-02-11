const express = require("express");
const app = express();
const path = require("path");
const setLogger = require("./setLogger");

// routes
const membersRoutes = require("./routes/members");

// data

// setting up a static folder using a middleware.
app.use(express.static("./public"));

// initiliazing body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// middleware custom
app.use(setLogger);

app.use("/api/members", membersRoutes);

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}....`);
});
