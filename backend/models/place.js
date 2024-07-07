const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    cuisines: { type: String, required: true },
    pic: { type: String, default: 'http://placekitten.com/400/400' },
    founded: {
        type: Number,
        min: [1673, 'The earliest founded year is 1673.'],
        max: [new Date().getFullYear(), 'The latest founded year can be the current year.']
    }
});

placeSchema.methods.showEstablished = function() {
    return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`;
};

module.exports = mongoose.model('Place', placeSchema);

