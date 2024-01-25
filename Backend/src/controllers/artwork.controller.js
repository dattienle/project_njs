import Artwork from '../model/schema/artwork.schema.js'

export async function createArtworkController(req, res) {
    try {
        const artwork = new Artwork(req.body);
        await artwork.save();
        res.status(201).json(artwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function findArtworkById(req, res) {
    try {
        const artwork = await Artwork.findById(req.params.id);
        res.status(200).json(artwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function findAllArtworks(req, res) {
    try{
        const artworks = await Artwork.find();
        res.status(200).json(artworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateArtworkById(req, res) {
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body);
        await artwork.save();   
        res.status(200).json(artwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteArtworkById(req, res) {
    try{
        const artwork = await Artwork.findByIdAndDelete(req.params.id);
        res.status(200).json(artwork);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

