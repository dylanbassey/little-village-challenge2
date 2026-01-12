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
    let result = await pool.query(`SELECT name FROM Tags;`);

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

async function getInboundOrders() {}

async function getOutboundOrders() {}

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

      COMMIT;
`;
    console.log(query);
    let result = await pool.request().query(query);

    console.log(result);
  } catch (err) {
    throw err;
  }
}

async function insertInboundOrder(record) {}

async function insertOutboundOrder(record) {}

sql.on("error", (err) => {
  // ... error handler
});

module.exports = {
  testSQL,
  insertWeight,
  getContainerTypes,
  getInboundOrders,
  getOutboundOrders,
  getOrderTypes,
};
