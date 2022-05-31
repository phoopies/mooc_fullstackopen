const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 }
});

blogSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});

module.exports = mongoose.model('Blog', blogSchema);