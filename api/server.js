const express = require("express");
const cors = require("cors");

const {
  testSQL,
  insertWeight,
  getContainerTypes,
  getInboundOrders,
  getOutboundOrders,
  getOrderTypes,
} = require("./databaseClient.js");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // <==== parse request body as JSON

app.get("/hello", (req, res) => {
  testSQL();
  res.send("Hello World, Will edited this!");
});

app.get("/goodbye", (req, res) => {
  res.status(404).send("Goodbye World!");
});

app.post("/submitWeights", (req, res) => {
  console.log(req.body);
  insertWeight(req.body);
  res.status(201).send(req.body);
});

app.post("/submitInbound", (req, res) => {
  res.status(201).send(req);
});

app.post("/submitOutbound", (req, res) => {
  res.status(201).send(req);
});

app.get("/inbounds", (req, res) => {
  res.send(getInboundOrders());
});

app.get("/outbounds", (req, res) => {
  res.send(getOutboundOrders());
});

app.get("/containerTypes", async (req, res) => {
  let containerTypes = await getContainerTypes();
  console.log(containerTypes);
  res.send(containerTypes).status(200);
});

app.get("/orderTags", async (req, res) => {
  let orderTags = await getOrderTags();
  console.log(orderTags);
  res.send(orderTags).status(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
