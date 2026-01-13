const express = require("express");
const cors = require("cors");

const {
  insertWeight,
  getContainerTypes,
  getInboundOrders,
  getOutboundOrders,
  getWeightRecords,
  getOrderTypes,
  insertInboundOrder,
  insertOutboundOrder,
  deleteInboundOrder,
  deleteOutboundOrder,
  deleteWeightRecord,
} = require("./databaseClient.js");

const { getDefaultDateFrom } = require("./utility.js");

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

app.get("/inbounds", async (req, res) => {
  try {
    let { dateFrom, available } = req.query; // Extract query parameters
    dateFrom = getDefaultDateFrom(dateFrom);

    console.log(`dateFrom: ${dateFrom}, available: ${available}`);
    let result = await getInboundOrders(dateFrom, available); // Pass them as arguments
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/outbounds", async (req, res) => {
  try {
    let { dateFrom, available } = req.query; // Extract query parameters
    dateFrom = getDefaultDateFrom(dateFrom);

    console.log(`dateFrom: ${dateFrom}, available: ${available}`);
    let result = await getOutboundOrders(dateFrom, available); // Pass them as arguments
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/weightRecords", async (req, res) => {
  try {
    let { dateFrom, available } = req.query; // Extract query parameters
    dateFrom = getDefaultDateFrom(dateFrom);

    console.log(`dateFrom: ${dateFrom}, available: ${available}`);
    let result = await getWeightRecords(dateFrom, available); // Pass them as arguments
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/inbound/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the dynamic 'id' parameter from the URL
    console.log(`Deleting inbound order with id: ${id}`);
    let result = await deleteInboundOrder(id); // Pass it as an argument
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/outbound/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract query parameters
    let result = await deleteOutboundOrder(id); // Pass them as arguments
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/weightRecord/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract query parameters
    let result = await deleteWeightRecord(id); // Pass them as arguments
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
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
