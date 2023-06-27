const { Schema, model, models } = require("mongoose");

const ReviewSchema = new Schema({
    name: String,
    email: String,
    comment: String,
}, {
    timestamps: true,
});

export const Review = models?.Review || model('Review', ReviewSchema);