const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// routes go here
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  //Check if username is already taken
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (userInDatabase) {
    return res.send('Username already taken.');
  }

  //Check password confirmation matches
  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match');
  }

  //Hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  //Create the user
  const user = await User.create(req.body);

  //Redirect to sign-in
  res.redirect('/auth/sign-in');
});



module.exports = router;      