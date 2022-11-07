const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middle wire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://jahid:CS1I6zPG4UXqU1Uk@cluster0.aiuffjp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const photoCollection = client.db("all-photography").collection("photography");

// routes set
async function run() {
  try {
    await client.connect();

    app.get("/allphotography", async (req, res) => {
      const query = {};
      const result = await photoCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/photography", async (req, res) => {
      const photo = req.body;
      const result = await photoCollection.insertOne(photo);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);

// database run

app.get("/", (req, res) => {
  res.send(" jahid photography connect");
});

app.listen(port, () => {
  console.log(`db connect ${port}`);
});
