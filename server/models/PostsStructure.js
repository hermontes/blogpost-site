const mongoose = require('mongoose')

// defining the different attributes I want to store

const CommentsSchema = new mongoose.Schema({
  author: {type: String, required: true},
  text:{type: String, required: true},
  likeCount:{type: Number},
  dislikeCount:{type: Number}


}, {timestamps: true})

const PostsSchema = new mongoose.Schema({
  title:{type: String, required: true},
  content:{type: String, required: true},
  image:{type: String, required: true},
  author:{type: String, required: true},
  date:{type: Date, default: Date.now},
  comments: [CommentsSchema]
})

// const PostsStructure = mongoose.model("blogposts.blogPostCollection", PostsSchema)
const PostsStructure = mongoose.model("BlogPosts", PostsSchema, "blogPostCollection");


module.exports = PostsStructure