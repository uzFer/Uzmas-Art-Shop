import { Schema, model, models } from "mongoose";

const FavouriteSchema = new Schema({
    productID: String,
    name: {type: String, required: true}, 
    email: String,
    description: String,
    price: {type: Number, required: true},
    images: [{type: String}],
}, {
    timestamps: true,
});

export const Favourite = models.Favourite || model('Favourite', FavouriteSchema);