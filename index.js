const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mamunlm10.47xczn4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // collections
    const categoriesCollection = client
      .db("recycle-clothes")
      .collection("categories");
    const usersCollection = client.db("recycle-clothes").collection("users");
    const productsCollection = client
      .db("recycle-clothes")
      .collection("products");

    //products categories
    app.get("/categories", async (req, res) => {
      const query = {};
      const result = await categoriesCollection.find(query).toArray();

      res.send(result);
    });

    // users
    app.put("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    app.get("/buyer", async (req, res) => {
      const option = "Buyer";
      const query = { option: option };
      const buyer = await usersCollection.find(query).toArray();
      res.send(buyer);
    });

    app.get("/seller", async (req, res) => {
      const option = "Seller";
      const query = { option: option };
      const Seller = await usersCollection.find(query).toArray();
      res.send(Seller);
    });

    // products
    app.post("/products", async (req, res) => {
      const query = req.body;
      const doctor = await productsCollection.insertOne(query);
      res.send(doctor);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { categories_id: id };
      const product = await productsCollection.find(query).toArray();
      res.send(product);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", async (req, res) => {
  res.send("recycle clothes ");
});
app.listen(port, () => {
  console.log(`Recycle Clothes running on port: ${port}`);
});
