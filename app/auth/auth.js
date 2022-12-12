const express = require('express');
const router = express.Router();
const User = require('../models/user').usermodel; // Import model User

// Register
router.post('/register', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.status(201).json(user))
    .catch(error => res.status(400).send(error));
});

// route for processing login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Authenticate user
  const datauser = await User.findOne({where:{email:email}})
  if(!datauser) return res.send("user not found !")

  // If authentication successful, save user data in session
  req.session.token = {
    id: datauser.id,
    username: datauser.username
  };

  // Redirect to dashboard or home page
  res.status(200).redirect('/loggedin');
});


module.exports = router;
