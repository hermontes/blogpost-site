const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PostsStructure = require("./models/PostsStructure");

// To parse incoming JSON data
app.use(express.json());

app.use(cors());

mongoose.connect(
  "mongodb+srv://htesfats:Umd.BlogPost@random.qsyiiux.mongodb.net/blogposts?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// Creating a new blog post
app.post("/createContent", async (req, res) => {
  //receiving all the fields we created from the front-end
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;
  const comments = req.body.comments;
  const image = req.body.image;

  const post = new PostsStructure({
    title: title,
    content: content,
    author: author,
    image: image,
    comments: comments,
  });

  try {
    await post.save().then(() => console.log("User Saved Successfully!"));

    res.send("data inserted");
  } catch (err) {
    console.log(err);
    // res.send("Data did not insert")
  }
});

app.put("/makeComment", async (req, res) => {
  const title = req.body.title;
  // const newComment = req.body.comments
  const newComment = {
    author: req.body.comments.name,
    text: req.body.comments.text,
    likeCount: req.body.comments.likeCount,
    dislikeCount: req.body.comments.dislikeCount,
  };

  try {
    const put = await PostsStructure.findOne({ title: title });
    put.comments.push(newComment);
    await put.save();

    res.send("updated");
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateLike", async (req, res) => {
  const title = req.body.title;

  const id = req.body.comments.id;
  const newLikes = req.body.comments.likeCount;

  try {
    const put = await PostsStructure.findOne({ title: title });
    const comment = put.comments.id(id);
    comment.likeCount = newLikes;
    await put.save();

    res.send("updated");
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateDislike", async (req, res) => {
  const title = req.body.title;

  const id = req.body.comments.id;
  const newdislikeCount = req.body.comments.dislikeCount;

  try {
    const put = await PostsStructure.findOne({ title: title });
    const comment = put.comments.id(id);
    comment.dislikeCount = newdislikeCount;
    await put.save();

    res.send("updated");
  } catch (err) {
    console.log(err);
  }
});

app.get("/getContent", async (req, res) => {
  // PostsStructure.find({ $where:{ title:""},})
  PostsStructure.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
