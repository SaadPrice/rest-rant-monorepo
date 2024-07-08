const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
    rant: { type: Boolean, default: false }
});

module.exports = mongoose.model('Comment', commentSchema);
