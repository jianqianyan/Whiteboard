const { db } = require(`./db`);
const { save } = require(`./save`);

// 从table里根据message精确查找
async function find(table, message, begin = 0, pageSize = 10) {
  let sqlstr = `select * from ` + table;
  let flag1 = 0;
  sqlstr = `select top ` + pageSize + ` * from ` + table;
  let sql1 = ``;
  if (message && Object.keys(message).length != 0) {
    sql1 = ` where `;
    Object.keys(message).forEach((key) => {
      if (sql1 != ` where `) sql1 += ` and `;
      sql1 = sql1 + key + `='` + message[key] + `'`;
    });
    flag1 = 1;
    sqlstr = sqlstr + sql1 + " and";
  }
  if (!sql1) {
    sqlstr += " where";
  }
  sqlstr +=
    ` id not in (select top ` + begin + ` id from ` + table + sql1 + `)`;
  var data = {};
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
  return data;
}

// Number of searches based on information
async function findNumber(table, message, begin = 0, pageSize = 10) {
  let sqlstr = `select count(id) from ` + table;
  let sql1 = ``;
  if (message && Object.keys(message).length != 0) {
    sql1 = ` where `;
    Object.keys(message).forEach((key) => {
      if (sql1 != ` where `) sql1 += ` and `;
      sql1 += key + ` = '` + message[key] + `'`;
    });
    sqlstr = sqlstr + sql1;
  }
  var data = [];
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
  if (data.length > 0) {
    data = Object.values(data[0])[0];
  } else {
    data = 0;
  }
  return data;
}

// Fuzzy search from table according to message , from begin to begin + n
async function fuzzyfind(table, message, begin = 0, pageSize = 10) {
  let sqlstr = `select * from ` + table;
  let sql1 = ``;
  sqlstr = `select top ` + pageSize + ` * from ` + table;
  if (message && Object.keys(message).length != 0) {
    sql1 = ` where `;
    Object.keys(message).forEach((key) => {
      if (sql1 != ` where `) sql1 += ` and `;
      sql1 = sql1 + key + ` like '%` + message[key] + `%'`;
    });
    sqlstr = sqlstr + sql1 + " and";
  }
  if (!sql1) {
    sqlstr += ` where`;
  }
  sqlstr +=
    ` id not in (select top ` + begin + ` id from ` + table + sql1 + `)`;
  var data = {};
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
  return data;
}

// Number of fuzzy searches based on information
async function fuzzyfindNumber(table, message, begin = 0, pageSize = 10) {
  let sqlstr = `select count(id) from ` + table;
  let sql1 = ``;
  if (message && Object.keys(message).length != 0) {
    sql1 = ` where `;
    Object.keys(message).forEach((key) => {
      if (sql1 != ` where `) sql1 += ` and `;
      sql1 = sql1 + key + ` like '%` + message[key] + `%'`;
    });
    sqlstr = sqlstr + sql1;
  }
  var data = {};
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
  if (data.length > 0) {
    data = Object.values(data[0])[0];
  } else {
    data = 0;
  }
  return data;
}

// 插入数据 往表table中插入数据message
async function add(table, message) {
  // 拼接字符串
  let sqlstr = `insert into ` + table + `(`;
  let sql1 = ``,
    sql2 = ``;
  Object.keys(message).forEach((key) => {
    if (sql1 != ``) sql1 += `,`;
    if (sql2 != ``) sql2 += `,`;
    sql1 = sql1 + key;
    sql2 = sql2 + `'` + message[key] + `'`;
  });
  sqlstr = sqlstr + sql1 + `) values(` + sql2 + `);`;
  let data = 0;
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }

  return data;
}

// 更改数据 更改表table中条件满足target的message数据
async function update(table, target, message, flag = 0) {
  let sqlstr = `update ` + table + ` set `;
  let sql1 = ``,
    sql2 = ``;
  Object.keys(message).forEach((key) => {
    if (sql1 != ``) sql1 += `,`;
    if (flag == 1) {
      sql1 = sql1 + key + `=` + message[key];
    } else {
      sql1 = sql1 + key + `='` + message[key] + `'`;
    }
  });
  Object.keys(target).forEach((key) => {
    if (sql2 != ``) sql2 += ` AND `;
    sql2 = sql2 + key + `=` + target[key];
  });
  sql2 = ` where ` + sql2;
  sqlstr = sqlstr + sql1 + sql2;
  try {
    await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
}

// 删除数据 在表ouside中删除根据message删除数据
async function emoDelete(table, message) {
  let sqlstr = `delete from ` + table;

  if (message) {
    let sql1 = ``;
    sqlstr += ` where `;
    Object.keys(message).forEach((key) => {
      if (sql1 != ``) sql1 += ` AND `;
      sql1 = sql1 + key + `=` + message[key] + ``;
    });
    sqlstr = sqlstr + sql1;
  }
  try {
    await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
}

// Count the number in the table according to the condition
async function count(table, condition) {
  let sqlstr = `select count(*) from ` + table;

  if (condition) {
    let sql1 = ``;
    sqlstr += ` where `;
    Object.keys(condition).forEach((key) => {
      if (sql1 != ``) sql1 += ` AND `;
      slq1 += key + `=` + condition[key] + ``;
    });
    sqlstr += sql1;
  }
  let data = [];
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
  return data;
}

// query with sqlstr
async function linkQuery(sqlstr) {
  let data = [];
  try {
    data = await db(sqlstr);
  } catch (err) {
    save(err.message, "db");
  }
  return data;
}

module.exports = {
  fuzzyfindNumber,
  fuzzyfind,
  emoDelete,
  update,
  add,
  find,
  count,
  linkQuery,
  findNumber,
};
