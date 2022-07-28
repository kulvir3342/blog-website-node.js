const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const BlogModel = require('./models/blog');

app.use(cors());
app.use(express.json());

// mongodb://localhost:27017/blog-website?readPreference=primary&appname=MongoDB%20Compass&ssl=false
mongoose.connect("mongodb://localhost:27017/blogWebsite", {
    useNewUrlParser: true
});

app.post('/addPost', async (req, res) => {
    const title = req.body.title;
    const postText = req.body.postText;
    const author = req.body.author;

    const blog = new BlogModel({
        title: title, postText: postText, author: {id: author.id, name: author.name}
    });
    await blog.save();
    res.send('Success');
});


app.get('/read', async (req, res) => {
    BlogModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});


app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await BlogModel.findByIdAndRemove(id).exec();
    res.send('item deleted');
})

app.listen(3001, () => {
    console.log("your are connected");
});