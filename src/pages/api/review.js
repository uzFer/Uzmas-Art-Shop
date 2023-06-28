import mongooseConnect from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET') {
        if(req.query?.productID) {
            res.json(await Review.find({productID: req.query.productID}));
        } 
        else {
            res.json(await Review.find());
        }
    }

    if(method === 'POST') {
        const {productID, name, email, comment, image} = req.body;
        const reviewDoc = await Review.create({
            productID, name, email, comment, image
        });
        res.json(reviewDoc);
    }

    if(method === 'PUT') {
        console.log(req.body)
        const {name, email, comment, _id} = req.body;
        await Review.updateOne({_id}, {
            name, email, comment,
        });
        res.json(true);
    }

    if(method === 'DELETE') {
        console.log(req.query)
        if(req.query?._id) { 
            await Review.deleteOne({_id: req.query?._id});
        }
        res.json(true);
    }
}