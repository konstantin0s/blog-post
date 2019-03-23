const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = require('./User');

//Article schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: { type: String,
     required: true,
  },
  // owner: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
