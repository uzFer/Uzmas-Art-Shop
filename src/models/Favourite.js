import mongoose, { Schema, model, models } from "mongoose";

const FavouriteSchema = new Schema({
    name: {type: String, required: true}, 
    email: String,
    description: String,
    price: {type: Number, required: true},
    images: [{type: String}],
    category: {type: mongoose.Types.ObjectId, ref: 'Category'},
    properties: {type: Object},
}, {
    timestamps: true,
});

export const Favourite = models.Favourite || model('Favourite', FavouriteSchema);