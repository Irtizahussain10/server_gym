import { Collection, MongoClient } from "mongodb";

let users: Collection<Document>;

interface Credentials {
  email: string;
  password: string;
}

class userControllers {
  static async usersClient(client: MongoClient) {
    if (!users) {
      users = await client.db("gym_store").collection("users");
    } else {
      return;
    }
  }

  static async usersSignin(credentials: Credentials) {
    let { email } = credentials;
    let user = await users.find({ email: email }).toArray();
    if (user[0]) {
      return [
        {
          acknowledged: false,
          error: "User already exists",
        },
      ];
    } else {
      let createUser = await users.insertOne(credentials as any);
      return [createUser];
    }
  }

  static async userLogin(credentials: Credentials) {
    let user = await users
      .find(credentials)
      .project({ _id: 0, password: 0 })
      .toArray();
    return user;
  }
}

export default userControllers;
