import { Router } from "express";
import { createArtworkController, deleteArtworkController, getAllArtworksController, getArtworkByIdController, updateArtworkController } from "../controllers/artwork.controller.js";

const artworkRouters = Router();

artworkRouters.get("/", getAllArtworksController)
artworkRouters.get("/:id", getArtworkByIdController)
artworkRouters.post("/", createArtworkController)
artworkRouters.delete("/:id", deleteArtworkController)
artworkRouters.put("/:id",updateArtworkController)
export default artworkRouters