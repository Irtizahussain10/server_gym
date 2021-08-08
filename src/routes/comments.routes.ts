import express, { Request, Response } from "express";
import commentControllers from "../controllers/comment.controller";

let commentRouter = express.Router();

commentRouter.post("/postComment", async (req: Request, res: Response) => {
  try {
    let result = await commentControllers.postComment(req.body);
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

commentRouter.post("/getComments/:item", async (req: Request, res: Response) => {
  try {
    let comments = await commentControllers.getComments(req.params.item);
    if (comments[0]) {
      res.status(200).json(comments);
    }
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default commentRouter;
