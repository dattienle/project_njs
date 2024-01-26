import Artwork from '../model/schema/artwork.schema.js';

class ArtworkService {
    async findAll() {
        try {
            const artwork = await Artwork.find();
            return artwork;
        } catch (error) {
            throw new Error("Can't find any artwork");
        }
    }
}

const artworkService = new ArtworkService();
export default artworkService;