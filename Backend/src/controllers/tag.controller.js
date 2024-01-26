import tagService from "../services/tag.service.js";

export const createTagController = async (req, res) => {
    try{
        const tagData = req.body;
        const tag = await tagService.createTag(tagData);
        res.status(201).json(tag);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export const findAllTagsController = async (req, res) => {
    try {
        const tag = await tagService.findAllTags();
        res.status(200).json(tag);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export const findTagByIdController = async (req, res) => {
    try {
        const tagId = req.params.id;
        const tag = await tagService.findTagById(tagId);
        res.status(200).json(tag);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export const updateTagController = async (req, res) => {
    try{
        const tagId = req.params.id;
        const tagData = req.body;
        const tag = await tagService.updateTag(tagId,tagData);
        res.status(200).json(tag);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export const deleteTagController = async (req, res) => {
    try{
        const tagId = req.params.id;
        await tagService.deleteTag(tagId);
        res.status(200).json("Tag deleted successfully");
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

