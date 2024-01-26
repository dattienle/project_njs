import { Router } from "express";
import { getAllArtworks } from "../controllers/artwork.controller.js";

const artworkRouters = Router();

artworkRouters.get("/", getAllArtworks)

export default artworkRouters