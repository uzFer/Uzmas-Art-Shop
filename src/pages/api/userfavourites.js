import mongooseConnect from "@/lib/mongoose";
import { Favourite } from "@/models/Favourite";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET') {
        if(req.query?.email) {
            res.json(await Favourite.find({email: req.query.email}));
        }
        else {
            res.json(await Favourite.find());
        }
    }

    if(method === 'POST') {
        const {productID, name, email, description, price, images} = req.body;
        const favouriteDoc = await Favourite.create({
            productID, name, email, description, price, images,
        });
        res.json(favouriteDoc);
    }

    if(method === 'DELETE') {
        const {_id} = req.query;
        await Favourite.deleteOne({_id});
        res.json('deleted');
    }
}