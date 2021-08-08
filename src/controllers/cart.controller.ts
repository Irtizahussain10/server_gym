import { Collection, MongoClient } from "mongodb";

let cart: Collection<Document>;

interface Order {
  email: string;
  name: string;
  number: string;
  address: string;
  item: string;
  quantity: number;
  status: string;
  price: string;
}

class cartControllers {
  static async cartClient(client: MongoClient) {
    if (!cart) {
      cart = await client.db("gym_store").collection("cart");
    } else {
      return;
    }
  }

  static async orderPlacement(order: Order) {
    let result = await cart.insertOne(order as any);
    return [result];
  }
}

export default cartControllers;
