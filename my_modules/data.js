const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogDB");

Post = mongoose.model("Post", {
    title: String,
    content: String,
    url: String,
    date: Date,
    category: String
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

module.exports.add = (title, content, category, callback) => {
    if (!category)
        category = "Un-filed";
    const post =
        new Post({title: title, content: content, url: _.kebabCase(title), date: Date.now(), category: category});
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

module.exports.update = (title, content, category, callback) => {
    if (!category)
        category = "Un-filed";
    // to be implemented
}

module.exports.findByCategory = (category, callback) => {
    // to be implemented
}