import express, { Request, Response } from "express";
import cartControllers from "../controllers/cart.controller";

let cartRouter = express.Router();

cartRouter.post("/postOrder", async (req: Request, res: Response) => {
  try {
    let result = await cartControllers.orderPlacement(req.body);
    if (result[0].acknowledged) {
      res.status(200).json(result);
    }
    if (!result[0].acknowledged) {
      res.status(400).json(result);
    }
  } catch (e) {
    res.status(500).json({
      acknowledged: false,
      error: "Internal Server Error",
    });
  }
});

export default cartRouter;
