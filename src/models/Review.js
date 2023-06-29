const { Schema, model, models } = require("mongoose");

const ReviewSchema = new Schema({
    productID: String,
    name: {type: String, required: true}, 
    email: String,
    comment: {type: String, required: true}, 
    image: {type: String},
    numOfStars: {type: Number, required: true},
}, {
    timestamps: true,
});

export const Review = models?.Review || model('Review', ReviewSchema);