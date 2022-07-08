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

module.exports.findOne = (title, callback) => {
    Post.findOne({url: _.kebabCase(title)}, (err, post) => {
        if (err)
            console.log(err);
        else
            callback(post);
    });
}

module.exports.findByCategory = (category, callback) => {
    // to be implemented
}