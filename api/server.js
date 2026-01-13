const express = require("express");
const cors = require("cors");

const {
  testSQL,
  insertWeight,
  getContainerTypes,
  getInboundOrders,
  getOutboundOrders,
  getOrderTypes,
  insertInboundOrder,
  insertOutboundOrder,
} = require("./databaseClient.js");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // <==== parse request body as JSON

app.post("/submitWeights", async (req, res) => {
  console.log(req.body);
  try {
    let result = await insertWeight(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/submitInbound", async (req, res) => {
  try {
    let result = await insertInboundOrder(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/submitOutbound", async (req, res) => {
  try {
    let result = await insertOutboundOrder(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
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
