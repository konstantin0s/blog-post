const express = require('express');
const router = express.Router();
require("dotenv").config();

//bring in models
const Article = require('../models/Article');
const User = require('../models/User');
const Comment = require('../models/Comment');

//@route Get Articles
//@desc All Articles
//@access Public
router.get('/', (req, res) => {
  debugger
  Article.find()
  .sort({ date: -1 })
  .then(articles => res.json(articles));
    });

    router.get('/:userId/', (req, res) => {
      debugger
      Article.find({user: req.query.userId})
      .then(articles =>{
          res.json(articles);
      })
      .catch( err =>{
          res.json(err);
      })
    })
    


    router.get('/', (req, res, next) => {
      debugger
      return Article.find()
      .populate('owner')
        .sort({ createdAt: 'descending' })
        .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
        .catch(next);
    });
    
    // router.param('id', (req, res, next, id) => {
    //   console.log("hellooooooo")

    //   debugger
    //   return Article.findById(id, (err, article) => {
    //     if(err) {
    //       return res.sendStatus(404);
    //     } else if(article) {
    //       req.article = article;
    //       return next();
    //     }
    //   }).catch(next);
    // });
    
    router.get("/one/:id", (req,res)=> {
      debugger
      Article.findById(req.params.id)
        .populate("owner")
        .then((result)=>{
          debugger
          res.status(200).json(result)
        })
        .catch((error)=> {
          res.status(500).json(error)
        })
    })
    
    // router.get("/:id", (req,res)=> {
    //   Article.findById(req.params.id)
    //     .populate("owner")
    //     .then((res)=>{
    //       res.json({
    //               article: req.article.toJSON(),
    //                     })
    //     })
    //     .catch((error)=> {
    //       res.json(error)
    //     })
    // })
    

    router.get('/:id', (req, res, next) => {
      debugger
      Article.findByIdAndUpdate(req.params.id, req.body)
      .populate("owner")
      .then((res) => {
        res.json({
            article: req.article.toJSON(),
      })
      .catch(err => {
        res.json(err);
      })
      // return res.json({
      //   article: req.article.toJSON(),
      // });
    });
  });
    
    
  router.get('/one/:id', (req, res, next) => {
    debugger
    return res.json({
      article: req.article.toJSON(),
    });
  })



//add submit POST route
router.post('/', (req, res) => {
  debugger
  const today = new Date();
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    imageUrl: req.body.imageUrl,
    owner: req.body.userId, //  -> watch out with this(causes problems?
    created: today
  }); 
  debugger
   newArticle.save().then(article => res.json(article))
   .catch(err => {
    debugger
    res.json(err);
    })
});

//Edit single Article
router.put('/one/:id', function(req, res, next) {
  debugger
  Article.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    debugger
    if (err) return next(err);
    res.json(post);
  });
});

//@route Delete Article
router.delete('/:id', (req, res) => {
 Article.findById(req.params.id)
 .then(article => article.remove().then(() => res.json({success: true})))
 .catch(err => res.status(404).json({success: false}));
});


module.exports = router;