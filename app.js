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
  data.findAll((posts) => { res.render("blog", {posts: posts}); });
})

app.get("/web-demos", (req, res) =>{
  res.render("webDemos");
})

app.get("/unity-demos", (req, res) =>{
  res.render("unityDemos");
})

app.get("/compose", (req, res) =>{
  res.render("compose");
})

app.post("/compose", (req, res) => {
  data.add(req.body.title, req.body.content, () => res.redirect("/blog"));
})

app.get("/posts/:title", (req, res) => {
  data.findOne(req.params.title, (post) => { 
    res.render("post", {title: post.title, content: post.content});
  });
})

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});