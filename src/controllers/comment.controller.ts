import { Collection, MongoClient } from "mongodb";

let comment: Collection<Document>;

interface Comment {
  item: string;
  comment: string;
  email: string;
  name: string;
}

class commentControllers {
  static async commentClient(client: MongoClient) {
    if (!comment) {
      comment = client.db("gym_store").collection("comments");
    } else {
      return;
    }
  }

  static async postComment(commentBody: Comment) {
    let result = await comment.insertOne(commentBody as any);
    return [result];
  }

  static async getComments(item: string) {
    let comments = await comment
      .find({
        item,
      })
      .project({
        _id: 0,
        email: 0,
        item: 0,
      })
      .toArray();
    return comments;
  }
}

export default commentControllers;
