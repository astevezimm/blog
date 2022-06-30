const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogDB");

Post = mongoose.model("Post", {
    title: String,
    content: String,
    url: String,
    date: Date,
    categories: [mongoose.ObjectId]
});

Category = mongoose.model("Category", {
    name: String,
    posts: [mongoose.ObjectId]
});

module.exports.findAll = (callback) =>
{
    Post.find({})
        .sort({date: 'desc'})
        .exec((err, posts) => {
            if (err)
                console.log(err);
            else
                callback(posts);
        });
}

module.exports.add = (title, content, callback) => {
    const post = new Post({title: title, content: content, url: _.kebabCase(title), date: Date.now()});
    post.save((err) => {
        if (err)
            console.log(err);
        else
            callback();
    });
}

module.exports.findOne = (title, callback) => {
    Post.findOne({url: _.kebabCase(title)}, (err, post) => {
        if (err)
            console.log(err);
        else
            callback(post);
    });
}