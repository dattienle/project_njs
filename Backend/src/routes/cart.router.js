import { Router } from "express";
import { accesTokenValidator } from "../middlewares/user.middleware.js";
import { cartController } from "../controllers/cart.controller.js";

const cartRouter = Router();
cartRouter.post("/add",accesTokenValidator,cartController);
export default cartRouter;