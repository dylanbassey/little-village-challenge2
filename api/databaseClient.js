const sql = require("mssql");

const sqlConfig = {
  user: "sa",
  password: "Password_123#",
  database: "littlevillage",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

async function testSQL() {
  try {
    let pool = await sql.connect(sqlConfig);
    let result1 = await pool
      .request()
      .query(
        "INSERT INTO WeightRecord VALUES('testCategory', 'testName', 1, 1);"
      );

    console.log(result1);
  } catch (err) {
    console.log(err);
  }
}

async function getContainerTypes() {
  try {
    console.log("Getting Container Types from DB...");
    let pool = await sql.connect(sqlConfig);
    let result = await pool.query(
      `SELECT id, weight, containerName FROM ContainerTypes;`
    );

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

async function getOrderTypes() {
  try {
    console.log("Getting Order Types from DB...");
    let pool = await sql.connect(sqlConfig);
    let result = await pool.query(`SELECT name FROM items;`);

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

async function getInboundOrders() {
  try {
    console.log("Getting inbound orders from DB...");
    let pool = await sql.connect(sqlConfig);
    let result = await pool.query(
      `SELECT id, location, category, supplierOrganisation, description, contact, notes, usagePlan, expDeliveryDate
      FROM Inbound
      WHERE NOT EXISTS(
        SELECT 1 
        FROM WeightRecord 
        WHERE WeightRecord.inboundId=Inbound.id
      );
      `
    );
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getOutboundOrders() {
  try {
    console.log("Getting outbound orders from DB...");
    let pool = await sql.connect(sqlConfig);
    let result = await pool.query(
      `SELECT id, location, category, organisation, contact, completed
      FROM Outbound
      WHERE NOT EXISTS(
        SELECT 1 
        FROM WeightRecord 
        WHERE WeightRecord.outboundId=Outbound.id
      );
      `
    );
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getWeights() {}

async function insertWeight(record) {
  try {
    let columnNames = "";
    let variableNames = "";

    let containers = [];

    for (let attributename in record) {
      if (attributename == "containers") {
        containers = record[attributename];
      } else {
        columnNames += "," + attributename;
        variableNames += ", '" + record[attributename] + "'";
      }
    }

    let containerColumnNames = "parentId";
    let containerColumnNamesList = [];
    let containerVariableValues = "";

    //get container column names
    for (let attributeName in containers[0]) {
      containerColumnNames += "," + attributeName;
      containerColumnNamesList.push(attributeName);
    }

    console.log(`\nColumn Names: `);
    for (let i = 0; i < containerColumnNamesList.length; i++) {
      console.log(containerColumnNamesList[i]);
    }
    console.log(containers);
    console.log("\nContainers: \n");

    for (let i = 0; i < containers.length; i++) {
      let container = containers[i];
      console.log(container);

      let containerColumnValues = "(@wr1Id, ";

      console.log("\nColumn Values: ");

      for (let j = 0; j < containerColumnNamesList.length; j++) {
        let attributeName = containerColumnNamesList[j];
        console.log(`${attributeName}: ${container[attributeName]}`);
        containerColumnValues += "'" + container[attributeName] + "',";
      }

      containerColumnValues = containerColumnValues.substring(
        0,
        containerColumnValues.length - 1
      ); // remove final comma
      containerColumnValues += "),";
      containerVariableValues += containerColumnValues;
    }
    containerVariableValues = containerVariableValues.substring(
      0,
      containerVariableValues.length - 1
    ); //remove final comma

    columnNames = columnNames.substring(1); //remove initial comma
    variableNames = variableNames.substring(1); //remove initial comma

    let pool = await sql.connect(sqlConfig);

    let query = `
      BEGIN TRANSACTION;
      DECLARE @wr1Id INT;

      INSERT INTO WeightRecord (${columnNames})
      VALUES (${variableNames});

      SET @wr1Id = SCOPE_IDENTITY();

      INSERT INTO Container (${containerColumnNames}) 
      VALUES ${containerVariableValues};

      SELECT * FROM WeightRecord WHERE id=@wr1ID;
      COMMIT;
      `;

    console.log(query);
    let result = await pool.query(query);

    console.log(result);
    console.log(result.recordset);
    console.log(`result: ${result.recordset}`);
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
}
async function insertInboundOrder(record) {
  try {
    let columnNames = "";
    let variableNames = "";

    let tags = [];

    for (let attributename in record) {
      if (attributename == "tags") {
        tags = record[attributename];
      } else {
        columnNames += "," + attributename;
        variableNames += ", '" + record[attributename] + "'";
      }
    }

    let tagColumnNames = "parentId";
    let tagColumnNamesList = [];
    let tagVariableValues = "";

    //get tag column names
    for (let attributeName in tags[0]) {
      tagColumnNames += "," + attributeName;
      tagColumnNamesList.push(attributeName);
    }

    console.log(`\nColumn Names: `);
    for (let i = 0; i < tagColumnNamesList.length; i++) {
      console.log(tagColumnNamesList[i]);
    }
    console.log(tags);
    console.log("\ntags: \n");

    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      console.log(tag);

      let tagColumnValues = "(@wr1Id, ";

      console.log("\nColumn Values: ");

      for (let j = 0; j < tagColumnNamesList.length; j++) {
        let attributeName = tagColumnNamesList[j];
        console.log(`${attributeName}: ${tag[attributeName]}`);
        tagColumnValues += "'" + tag[attributeName] + "',";
      }

      tagColumnValues = tagColumnValues.substring(
        0,
        tagColumnValues.length - 1
      ); // remove final comma
      tagColumnValues += "),";
      tagVariableValues += tagColumnValues;
    }
    tagVariableValues = tagVariableValues.substring(
      0,
      tagVariableValues.length - 1
    ); //remove final comma

    columnNames = columnNames.substring(1); //remove initial comma
    variableNames = variableNames.substring(1); //remove initial comma

    let pool = await sql.connect(sqlConfig);

    let query = `
    BEGIN TRANSACTION;
    DECLARE @wr1Id INT;

    INSERT INTO Inbound (${columnNames})
    VALUES (${variableNames});

    SET @wr1Id = SCOPE_IDENTITY();

    INSERT INTO Tags (${tagColumnNames}) 
    VALUES ${tagVariableValues};

    SELECT * FROM Inbound WHERE id=@wr1ID;
    COMMIT;
`;
    console.log(query);
    let result = await pool.query(query);

    console.log(result);
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
}
async function insertOutboundOrder(record) {
  try {
    let columnNames = "";
    let variableNames = "";

    let items = [];

    for (let attributename in record) {
      if (attributename == "items") {
        items = record[attributename];
      } else {
        columnNames += "," + attributename;
        variableNames += ", '" + record[attributename] + "'";
      }
    }

    let itemColumnNames = "parentId";
    let itemColumnNamesList = [];
    let itemVariableValues = "";

    //get item column names
    for (let attributeName in items[0]) {
      itemColumnNames += "," + attributeName;
      itemColumnNamesList.push(attributeName);
    }

    console.log(`\nColumn Names: `);
    for (let i = 0; i < itemColumnNamesList.length; i++) {
      console.log(itemColumnNamesList[i]);
    }
    console.log(items);
    console.log("\nitems: \n");

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      console.log(item);

      let itemColumnValues = "(@wr1Id, ";

      console.log("\nColumn Values: ");

      for (let j = 0; j < itemColumnNamesList.length; j++) {
        let attributeName = itemColumnNamesList[j];
        console.log(`${attributeName}: ${item[attributeName]}`);
        itemColumnValues += "'" + item[attributeName] + "',";
      }

      itemColumnValues = itemColumnValues.substring(
        0,
        itemColumnValues.length - 1
      ); // remove final comma
      itemColumnValues += "),";
      itemVariableValues += itemColumnValues;
    }
    itemVariableValues = itemVariableValues.substring(
      0,
      itemVariableValues.length - 1
    ); //remove final comma

    columnNames = columnNames.substring(1); //remove initial comma
    variableNames = variableNames.substring(1); //remove initial comma

    let pool = await sql.connect(sqlConfig);

    let query = `
    BEGIN TRANSACTION;
    DECLARE @wr1Id INT;

    INSERT INTO Outbound (${columnNames})
    VALUES (${variableNames});

    SET @wr1Id = SCOPE_IDENTITY();

    INSERT INTO OutboundItems (${itemColumnNames}) 
    VALUES ${itemVariableValues};

    SELECT * FROM Outbound WHERE id=@wr1ID;
    COMMIT;
`;
    console.log(query);
    let result = await pool.query(query);

    console.log(result);
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
}

sql.on("error", (err) => {
  // ... error handler
});

module.exports = {
  testSQL,
  insertWeight,
  insertInboundOrder,
  insertOutboundOrder,
  getContainerTypes,
  getInboundOrders,
  getOutboundOrders,
  getOrderTypes,
};
