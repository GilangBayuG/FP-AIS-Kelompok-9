const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const usermodel = require('./app/models/user')
const User= usermodel.usermodel
const app = express();
const authRouter = require("./app/auth/auth");
const session = require('cookie-session');

app.use(session({
  name: 'session',
  secret: "THISISSECRET",
  httpOnly: false,
  sameSite: 'strict'
}));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
app.use('/api/auth', authRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.get("/loggedin", (req, res) => {
  res.json({ message: "Succes Login." });
});

require("./app/routes/tutorial.routes.js")(app);

User.sync({force:true});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
