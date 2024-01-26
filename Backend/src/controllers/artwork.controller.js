import artworkService from "../services/artwork.service.js";

export const getAllArtworks = async (req, res) => {
    try {
        const artwork = await artworkService.findAll();
        res.status(200).json(artwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

