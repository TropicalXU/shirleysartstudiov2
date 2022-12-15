const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const PaintingSchema = new Schema({
    id: Number,
    isAvailable: Boolean,
    type: String,
    title: String,
    image: String,
    img: String,
    description: String,
    price: Number,
    stripe_price: Number,
    qty: Number,
    artist: String

}, opts);


module.exports = mongoose.model('Paintings', PaintingSchema);