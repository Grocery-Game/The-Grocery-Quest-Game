const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route  POST api/auth
// @desc   Authenticate the user
// @access Public

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({msg: 'Please enter all fields'});
  }

  User.findOne({email})
    .then(user => {
      if(!user) return res.status(400).json({msg: 'User does not exist'})

      // validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({msg: 'invalid credentials'})

          jwt.sign({id: user.id}, process.env.JWT_SECRET, (err, token) => {
            if(err) throw err;

            res.json({token, user: {
              id: user.id,
              name: user.name,
              email: user.email
            }})
          })
        })
    })
});

// @route  GET api/auth/user
// @desc   Get User Data
// @access Private

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      return res.json(user)
    })
})



module.exports = router;