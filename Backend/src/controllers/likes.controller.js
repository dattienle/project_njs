import mongoose from 'mongoose';
import artwork from '../model/schema/artwork.schema.js';

export const createLikeController = async (req, res) => {
    let artwork_id = req.params.artwork_id;
    if (!mongoose.Types.ObjectId.isValid(artwork_id)) {
        return res.status(400).send({
            message: 'Invalid artwork id',
            data: {}
        });
    }
    artwork.findOne({ _id: artwork_id }).then(async (artwork) => {
        if (!artwork) {
            return res.status(400).send({
                message: 'No artwork found',
                data: {}
            });
        } else {
            
        }
    });
}