import Artwork from '../model/schema/artwork.schema.js';

class ArtworkService {
    async findAll() {
        try {
            const artworks = await Artwork.find();
            return artworks;
        } catch (error) {
            throw new Error(error.message);
        }
    }   

    async findById(artworkId) {
        try {
            const artwork = await Artwork.findById(artworkId);
            return artwork;
        } catch (error) {
            throw new Error("Artwork with id: " + artworkId + " not found");
        }
    }

    async createArtwork(artworkData) {
        try {
            const artwork = await Artwork.create(artworkData);
            return "Artwok created successfully";
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteById(artworkId) {
        try {   
            const artwork = await Artwork.findByIdAndDelete(artworkId);
            return "Deleted artwork with id: " + artworkId + " successfully";
        } catch (error) {
            throw new Error("Artwork with id: " + artworkId + " not found");
        }
    }

    async updateArtwork(artworkId, artworkData) {
        try {
            const artwork = await Artwork.findByIdAndUpdate(artworkId, artworkData);
            return "Updated successfully";
        } catch (error) {
            throw new Error(error);
        }
    }
}
const artworkService = new ArtworkService();
export default artworkService;