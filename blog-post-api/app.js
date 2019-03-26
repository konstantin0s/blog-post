const express = require('express');
const app     = express();
const path    = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require('cookie-parser');
const passport      = require('passport');
const multer = require('multer');

// require('./configs/passport');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3001']
}));
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
//   )
  app.use(cookieParser());


  mongoose 
  .connect('mongodb://localhost:27017/blogpost', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  app.use(session({  //setup sessions always here 
    secret: "secret",
    key: 'sid',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));

  // app.use("/users", (req, res, next) => {
  //   debugger
  //   next()
  // })
  const Users = require('./routes/Users');
  app.use('/users', Users);

  app.use((req, res, next) => {
    if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
      next(); // ==> go to the next route ---
    } else {                          //    |
      res.status(403).json({message: "Unauthorized, session problem.?"})        //    |
    }                                 //    |
  }); 

  // const protect = (req, res, next)=> {
  //   debugger
  //   if(req.session.currentUser) {
  //     next()
  //   } else {
  //     res.status(403).json({message: "Unauthorized"})
  //   }
  // }
  


  // const Articles = require('./routes/Articles');
  app.use('/articles', require('./routes/Articles'));
  app.use('/', require('./routes/file-upload-routes'));
  app.use('/', require("./routes/Comments"));

// app.get('/', (req, res, next) => {
//   res.json(users);
//   res.render('index')
// });

app.listen(3001, ()=> {
  console.log("listening")
});

  //close mongodb
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });