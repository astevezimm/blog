require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect(process.env.DB_URL);

Post = mongoose.model("Post", {
    title: String,
    content: String,
    url: String,
    date: Date,
    category: String,
    cat_extended_descript: String,
    cat_url: String,
    img_url: String
});

async function findCats() {
    return await Post.aggregate([{$group: {
        _id: "$category",
        category: {$first: "$category"},
        cat_url: {$first: "$cat_url"}
    }}]);
}

function getPage(posts, page) {
    if (isNaN(page) || page < 1)
        page = 1;
    else if (page * 24 > posts.length)
        page = Math.ceil(posts.length / 24);
    let start = (page - 1) * 24, end = page * 24;
    return posts.slice(start, end);
}

module.exports.findAll = async (page, callback) =>
{
    const posts = await Post.find({}).sort({date: 'desc'});
    callback(getPage(posts, page), await findCats(), posts.length);
}

module.exports.findOne = (title, callback) => {
    Post.findOne({url: _.kebabCase(title)}, (err, post) => {
        if (err)
            console.log(err);
        else
            callback(post);
    });
}

module.exports.findPrev = (title, callback) => {
    Post.find({})
        .sort({date: 'desc'})
        .exec((err, posts) => {
            if (err)
                console.log(err);
            else {
                let prevPost = posts[posts.length-1];
                for (const post of posts)
                    if (post.url === _.kebabCase(title))
                        break;
                    else
                        prevPost = post;
                callback(prevPost);
            }
        });
}

module.exports.findNext = (title, callback) => {
    Post.find({})
        .sort({date: 'desc'})
        .exec((err, posts) => {
            if (err)
                console.log(err);
            else {
                let i;
                for (i = 0; i < posts.length; i++)
                    if (posts[i].url === _.kebabCase(title))
                        break;
                callback(posts[(i+1)%posts.length])
            }
        });
}

module.exports.findByCategory = async (category, page, callback) => {
    const posts = await Post.find({cat_url: category}).sort({date: 'desc'});
    callback(getPage(posts, page), await findCats(), posts.length);
}