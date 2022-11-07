const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./utils/dbConnect");
const port = process.env.PORT || 5000;

// middle wire
app.use(cors());
app.use(express.json());

// database connect
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aiuffjp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const photoCollection = client.db("all-photography").collection("photography");

// CS1I6zPG4UXqU1Uk
// jahid

// database run

app.get("/", (ewq, res) => {
  res.send(" jahid photography connect");
});

app.listen(port, () => {
  console.log(`db connect ${port}`);
});
