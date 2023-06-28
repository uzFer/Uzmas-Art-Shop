import mongooseConnect from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET') {
        if(req.query?.id) {
            res.json(await Review.findOne({_id: req.query.id}));
        }
        else {
            res.json(await Review.find());
        }
    }

    if(method === 'POST') {
        const {name, email, comment} = req.body;
        const reviewDoc = await Review.create({
            name, email, comment,
        });
        res.json(reviewDoc);
    }

    if(method === 'PUT') {
        const {name, email, comment, _id,} = req.body;
        await Review.updateOne({_id}, {
            name, email, comment,
        });
        res.json(true);
    }

    if(method === 'DELETE') {
        if(req.query?.id) { 
            await Review.deleteOne({_id: req.query?.id});
        }
        res.json(true);
    }
}