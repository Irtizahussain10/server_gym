import express, { Request, Response } from "express";
import userControllers from "../controllers/users.controller";

let Router = express.Router();

Router.post("/signUp", async (req: Request, res: Response) => {
  try {
    let result = await userControllers.usersSignin(req.body);
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

Router.post("/login", async (req: Request, res: Response) => {
  try {
    let user = await userControllers.userLogin(req.body);
    if (!user[0]) {
      res.status(400).json({
        email: "Incorrect email id or password",
      });
    }
    if (user[0]) {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default Router;
