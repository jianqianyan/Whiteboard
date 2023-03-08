const mysql = require("mysql");
const dbConfig = require("../settingConfig/sqlConfig.json");
let db = async (sqlStr) => {
  return new Promise(async (resolve, reject) => {
    let connection = await dbInit();
    connection.query(sqlStr, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(res);
      }
      connection.end();
    });
  });
};

const dbInit = async () => {
  return new Promise((resolve, reject) => {
    let connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

module.exports = { db, dbInit };
