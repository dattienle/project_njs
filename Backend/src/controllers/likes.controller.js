import likeService from "../services/likes.services.js";

export const likeArtworkController = async (req, res) => {
    const { artwork_id } = req.params
    try {
        const like = await likeService.likeArtwork(artwork_id)
        res.status(200).json(like)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const unlikeArtworkController = async (req, res) => {
    const { like_id } = req.params
    try {
        const like = await likeService.unlikeArtwork(like_id)
        res.status(200).json(like)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const getLikesByArtworkIdController = async (req, res) => {
    const { artwork_id } = req.params
    try {
        const likes = await likeService.getLikesByArtworkId(artwork_id)
        res.status(200).json(likes)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}