import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import userControllers from "./controllers/users.controller";
import cartControllers from "./controllers/cart.controller";
import commentControllers from "./controllers/comment.controller";
import commentRouter from "./routes/comments.routes";
import cartRouter from "./routes/cart.routes";
import Router from "./routes/users.routes";

dotenv.config();

let path = __dirname + "/views/";
let app = express();
let port = process.env.PORT;
let username = process.env.DATABASE_USERNAME;
let password = process.env.PASSWORD;
let uri = `mongodb+srv://${username}:${password}@sandbox.ibylc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.static(path));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", Router, cartRouter, commentRouter);

class connect {
  static Connect() {
    let client = new MongoClient(uri).connect();
    return client;
  }
}

app.get("/*", function (req, res) {
  res.sendFile(path + "index.html");
});

connect
  .Connect()
  .then((client) => {
    userControllers.usersClient(client);
    cartControllers.cartClient(client);
    commentControllers.commentClient(client);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http:localhost://${port}`);
    });
  })
  .catch((_e) => {
    process.exit(1);
  });

//authorization for posting comment aur accessing or posting other data
//validate user data
//jwt token
//remove any
