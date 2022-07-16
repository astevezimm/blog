const express = require("express");
const bodyParser = require("body-parser");
const data = require("./my_modules/data");
require("ejs");

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
  res.render("home");
})

app.get("/blog", (req, res) =>{
  console.log("loading blog")
  data.findAll((posts) => { res.render("blog", {posts: posts}); });
})

app.get("/web-demos", (req, res) =>{
  res.render("webDemos");
})

app.get("/unity-demos", (req, res) =>{
  res.render("unityDemos");
})

app.get("/posts/:title", (req, res) => {
  data.findOne(req.params.title, (post) =>
    res.render("post", {post}));
})

app.get("/posts/:title/prev", (req, res) => {
  data.findPrev(req.params.title, (post) =>
      res.render("post", {post}));
})

app.get("/posts/:title/next", (req, res) => {
  data.findNext(req.params.title, (post) =>
      res.render("post", {post}));
})

/*app.get("/categories/:category", (req, res) =>{
  data.findByCategory(req.params.category, (posts) => res.render("blog", {posts: posts}));
})*/

app.listen(port, () => console.log(`Server started on port ${port}`));