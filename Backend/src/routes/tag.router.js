import { Router } from 'express';
import { createTagController, deleteTagController, findAllTagsController, findTagByIdController, updateTagController } from "../controllers/tag.controller.js";

const tagsRouter = Router();

tagsRouter.post('/', createTagController);
tagsRouter.get('/', findAllTagsController);
tagsRouter.get('/:id', findTagByIdController);
tagsRouter.put('/:id', updateTagController);
tagsRouter.delete('/:id', deleteTagController);
export default tagsRouter;