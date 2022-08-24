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

app.get("/blog", (req, res) => { res.redirect("/blog/1") })

app.get("/blog/:page", (req, res) => {
  data.findAll(req.params.page, (posts, cats, overallSize) => {
    res.render("blog", {posts: posts, cats: cats, current_cat_url: "", overallSize: overallSize});
  });
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

app.get("/categories/:category", (req, res) => {
  res.redirect(`/categories/${req.params.category}/1`)
})

app.get("/categories/:category/:page", (req, res) => {
  data.findByCategory(req.params.category, req.params.page,(posts, cats, overallSize) => {
    res.render("blog", {posts: posts, cats: cats, current_cat_url: req.params.category, overallSize: overallSize})
  });
})

app.get("/*", (req, res) => {
  res.status(404);
  res.render("pageNotFound");
})

app.listen(port, () => console.log(`Server started on port ${port}`));