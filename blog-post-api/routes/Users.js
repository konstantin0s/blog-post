const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
users.use(cookieParser());
require("dotenv").config();

const User = require('../models/User');

users.use(cors({
  credentials: true,
  origin: ['http://localhost:3001']
}));

// const protect = (req, res, next)=> {
//   debugger
//   if(req.session.currentUser) {
//     next()
//   } else {
//     res.status(403).json({message: "Unauthorized"})
//   }
// }

// process.env.SECRET_KEY = 'secret';
users.get('/one/:id', (req, res, next) => {
  //console.log(req.params.id); // this is print our id parameter

  // lets do this
  const userid = req.params.id;
  User.findById(userid, { password: 0 }).then((err, user)=> {  // this is because we should remove password in data showing
          if (err)
              res.send(err)
          else if (!user)
              res.send(404)
          else
              res.send(user)
          next()            
      })
})

users.get('/', (req, res) => {
  User.find()
  .sort({ date: -1 })
  .then(users => res.json(users));
    });


    users.get('/', (req, res, next) => {
      return User.find()
        .sort({ createdAt: 'descending' })
        .then((users) => res.json({ users: users.map(user => user.toJSON()) }))
        .catch(next);
    });
    
    users.param('id', (req, res, next, id) => {
      return User.findById(id, (err, user) => {
        if(err) {
          return res.sendStatus(404);
        } else if(user) {
          req.user = user;
          return next();
        }
      }).catch(next);
    });
    
    users.get('/:id', (req, res, next) => {
      return res.json({
        user: req.user.toJSON(),
      });
    });


//Edit single USer
users.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

    
users.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
    .then((user)=>{
      res.json(user)
    })
    .catch((error)=> {
      res.json(error)
    })
});

users.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
    .then((user)=>{
      res.json(user)

    })
    .catch((error)=> {
      res.json(error)
    })
});

// users.get('/one/:id', function(req, res, next) {
//   User.findById(req.params.id)
//     .then((user)=>{
//       debugger
//       res.json(user)
//       debugger
//     })
//     .catch((error)=> {
//       res.json(error)
//     })
// });






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
        req.session.currentUser = user; // check this if you cannot go to profile page!
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
  
    res.status(500).json(err)

  })
})

users.get('/profile', (req, res) => {
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


users.post("/:id", (req,res)=> {

  User.findById(req.params.id)
    .populate("articles")
    .then((results)=>{
      res.json(results)
    })
    .catch((error)=> {
      res.json(error)
    })
})

users.post("/logout", (req, res)=> {

  req.session.destroy()
  res.send(200).json({message: "session destroyed"})
})


module.exports = users;