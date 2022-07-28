const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

const BlogModel = mongoose.model('blogs', blogSchema);
module.exports = BlogModel;