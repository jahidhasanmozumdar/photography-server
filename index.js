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
const reviewCollection = client.db("reviews").collection("review");

// routes set
async function run() {
  try {
    await client.connect();

    // get all photography data api
    app.get("/allphotography", async (req, res) => {
      const query = {};
      const result = await photoCollection.find(query).toArray();
      res.send(result);
    });
    // get id query photography data api
    app.get("/photography/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await photoCollection.findOne(query);
      res.send(result);
    });
    // post new photography data
    app.post("/photography", async (req, res) => {
      const photo = req.body;
      const result = await photoCollection.insertOne(photo);
      res.send(result);
    });

    // post user review
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    // get user review
    app.get("/review/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await reviewCollection.findOne(filter);
      res.send(result);
    });

    // find by user review
    // app.get("/email/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await reviewCollection.findOne(query);
    //   res.send(result);
    // });
    // https://jahidphotography-api.onrender.com/allphotography
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
