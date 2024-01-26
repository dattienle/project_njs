import artworkService from "../services/artwork.service.js";

export const getAllArtworksController = async (req, res) => {
    try {
        const artwork = await artworkService.findAll();
        res.status(200).json(artwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getArtworkByIdController = async (req, res) => {
    try {
        const artworkId = req.params.id;
        const artwork = await artworkService.findById(artworkId);
        if (!artwork) {
            return res.status(404).json({ message: "Artwork with id: " + artworkId + "not found" });
        }
        res.status(200).json(artwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createArtworkController = async (req, res) => {
    try{
        const artworkData = req.body;
        const artwork = await artworkService.createArtwork(artworkData);
        res.status(201).json(artwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteArtworkController = async (req, res) => {
    try{
        const artworkId = req.params.id;
        const artwork = await artworkService.deleteById(artworkId);
        if (!artwork) {
            return res.status(404).json({ message: "Artwork with id: " + artworkId + "not found" });
        }
        res.status(200).json();
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateArtworkController = async (req, res) => {
    try{
        const artworkId = req.params.id;
        const artworkData = req.body;
        const artwork = await artworkService.updateArtwork(artworkId, artworkData);
        if (!artwork) {
            return res.status(404).json({ message: "Artwork with id: " + artworkId + "not found" });
        }
        res.status(200).json(artwork);
    }
    catch(error) {
        res.status(400).json({ message: error.message });
    }
}

