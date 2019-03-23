const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
users.use(cookieParser());
require("dotenv").config();

const User = require('../models/User');
users.use(cors());

const protect = (req, res, next)=> {
  debugger
  if(req.session.user) {
    next()
  } else {
    res.status(403).json({message: "Unauthorized"})
  }
}

// process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
  const today = new Date();
  const userData = {
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         email: req.body.email,
         password: req.body.password,
         created: today
  }

  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        User.create(userData)
        .then(user => {
          res.json({status: user.email + ' registered!'})
        })
        .catch(err => {
          res.send('error: ' + err)
        })
      })
    } else {
       res.json({error: 'User already exists'})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})
 
users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user; // check this if you cannot go to profile page!
        const payload = {
           _id: user._id,
           first_name: user.first_name,
           last_name: user.last_name,
           email: user.email
         }

         let token = jwt.sign(payload, process.env.SECRET_KEY, {
           expiresIn: 1440
         })
         res.send(token)
      } else {
        res.json({error: 'User does not exist'})
      }
    } else {
      res.json({error: 'User does not exist'})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
    res.send('/');
  })
})

users.get('/profile',protect, (req, res) => {
  const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
  .then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send('User does not exist')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

// users.post('/logout', (req, res, next) => {
//   // req.logout() is defined by passport
//   //  req.session.currentUser;
//   req.logout();
//   res.status(200).json({ message: 'Log out success!' });
// });


// users.get('/profile', protect,(req, res, next) => {
//   // req.isAuthenticated() is defined by passport
//   if (req.isAuthenticated()) {
//       res.status(200).json(req.user);
//       return;
//   }
//   res.status(403).json({ message: 'Unauthorized' });
// });

users.post("/logout", (req, res, next) => {
  res.clearCookie("name");
  req.session.destroy((err) => {
  // req.logout();
  res.status(200).json({ message: 'Log out success!' });
  });
});



module.exports = users;