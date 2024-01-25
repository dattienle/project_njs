import { Router } from "express";
import { updateArtworkById, createArtworkController, findAllArtworks, findArtworkById, deleteArtworkById } from "../controllers/artwork.controller.js";

const artworkRouter = Router();

artworkRouter.post("/", createArtworkController);
artworkRouter.get("/", findAllArtworks);
artworkRouter.get("/:id",findArtworkById);
artworkRouter.put("/:id", updateArtworkById);
artworkRouter.delete("/:id", deleteArtworkById);
export default artworkRouter;