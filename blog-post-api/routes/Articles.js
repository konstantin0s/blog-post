const express = require('express');
const router = express.Router();
require("dotenv").config();

//bring in models
const Article = require('../models/Article');
const User = require('../models/User');



//@route Get Articles
//@desc All Articles
//@access Public
router.get('/', (req, res) => {
  Article.find()
  .sort({ date: -1 })
  .then(articles => res.json(articles));
    });


    router.get('/', (req, res, next) => {
      return Article.find()
        .sort({ createdAt: 'descending' })
        .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
        .catch(next);
    });
    
    router.param('id', (req, res, next, id) => {
      return Article.findById(id, (err, article) => {
        if(err) {
          return res.sendStatus(404);
        } else if(article) {
          req.article = article;
          return next();
        }
      }).catch(next);
    });
    

    // get specific article
// router.get('/:id', (req, res)=>{
//     Article.findById(req.params.id)
//     .populate({
//           path: "user", 
//           model: "User"
//     })
//     .then(res => {
//       res.json({
//             article: req.article.toJSON(),
//           });
//     })
//     .catch(err => {
//       res.json(err, 'Pula ...num merge populate?');
//     })

// })

    router.get('/:id', (req, res, next) => {
      return res.json({
        article: req.article.toJSON(),
      });
    });
    
    



//add submit POST route
router.post('/', (req, res) => {
  const today = new Date();
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    imageUrl: req.body.imageUrl,
    // owner: req.user._id, //  -> watch out with this(causes problems when addding new article)
    created: today
  });

   newArticle.save().then(article => res.json(article))
   .catch(err => {
    res.json(err);
    })
});

//Edit single Article
router.put('/:id', function(req, res, next) {
  Article.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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