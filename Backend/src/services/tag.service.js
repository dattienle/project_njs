import Tag from "../model/schema/tag.schema.js";

class TagService {
    async createTag(tagData) {
        try{
            const tag = await Tag.create(tagData);
            return tag;
        }catch (err) {
            throw new Error(err.message);
        } 
    }

    async findAllTags() {
        try{
            const tag = await Tag.find();
            return tag;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async findTagById(tagId) {
        try {
            const tag = await Tag.findById(tagId);
            return tag;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateTag(tagId, tagData) {
        try {
            const tag = await Tag.findByIdAndUpdate(tagId, tagData);
            return "Tag updated successfully";
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteTag(tagId) {
        try {
             await Tag.findByIdAndDelete(tagId);
            return "Tag deleted successfully";
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
const tagService = new TagService();
export default tagService;