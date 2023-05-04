const { linkQuery } = require("../until/sqlSever");

const userArr = ["userId", "userName", "phone", "email", "createTime", "Available"];
class userData {
  constructor(data) {
    for (let key in data) {
      if (userArr.includes(key)) {
        this[key] = data[key];
      }
    }
  }
}
const retBrushAtt = [
  "brushId",
  "boardId",
  "userId",
  "type",
  "data",
  "x",
  "y",
  "width",
  "height",
  "createdTime",
];
class retBrushData {
  constructor(data) {
    for (let key in data) {
      if (retBrushAtt.includes(key)) {
        this[key] = data[key];
      }
    }
  }
}

const getBoardList = async (data) => {
  let page = Number(data.page) || 1;
  let pageSize = Number(data.pageSize) || 10;
  let begin = (page - 1) * pageSize;
  let end = pageSize;
  let limit = ` limit ` + begin + `,` + end;
  let sqlstr = `select * from board `;
  let condition = ``;
  if (data.userId && data.boardId) {
    condition =
      `where boardId like '` +
      data.boardId +
      `' and userId like '` +
      data.userId +
      `'`;
  } else if (data.userId) {
    condition = `where userId like '` + data.userId + `'`;
  } else if (data.boardId) {
    condition = `where boardId like '` + data.boardId + `'`;
  }
  sqlstr += condition;
  sqlstr += limit;
  let boardList = await linkQuery(sqlstr);
  let list = await Promise.all(
    boardList.map(async (item) => {
      let brushsql =
        `select * from brush where boardId like '` + item.boardId + `'`;
      let brushList = await linkQuery(brushsql);
      brushList = brushList.map((item) => {
        if (item.data) {
          const buffer = Buffer.from(item.data);
          item.data = buffer.toString("utf-8");
          return new retBrushData(item);
        }
      });
      item.data = brushList;
      return item;
    })
  );
  let totalsql = `select count(*) from board ` + condition;
  let totalArr = await linkQuery(totalsql);
  let total;
  if (totalArr.length > 0) {
    total = totalArr[0].hasOwnProperty("count(*)")
      ? Object.values(totalArr[0])[0]
      : 0;
  } else {
    total = 0;
  }
  return { data: list.length > 0 ? list : -1, total };
};

const getUserList = async (data) => {
  let page = Number(data.page) || 1;
  let pageSize = Number(data.pageSize) || 10;
  let begin = (page - 1) * pageSize;
  let end = pageSize;
  let limit = ` limit ` + begin + `,` + end;
  let sqlstr = `select * from user`;
  let condition = ``;
  if (data.userId && data.userName) {
    condition =
      ` where userId like '` +
      data.userId +
      `' and userName like '` +
      data.userName +
      `'`;
  } else if (data.userId) {
    condition = ` where userId like '` + data.userId + `'`;
  } else if (data.userName) {
    condition = ` where userName like '` + data.userName + `'`;
  }
  sqlstr += condition;
  sqlstr += limit;
  let userList = await linkQuery(sqlstr);
  let list = userList.map((item) => {
    return new userData(item);
  });
  let totalsql = `select count(*) from user ` + condition;
  let totalArr = await linkQuery(totalsql);
  let total;
  if (totalArr.length > 0) {
    total = totalArr[0].hasOwnProperty("count(*)")
      ? Object.values(totalArr[0])[0]
      : 0;
  } else {
    total = 0;
  }
  return { data: list.length > 0 ? list : -1, total };
};

const login = async (phone, password) => {
  let admin = await linkQuery(`select * from admin where Phone='` + phone + `'`);
  let adminId = -1;
  if (admin.length > 0) {
    let adminPassword = admin[0].Password;
    if (adminPassword === password) {
      adminId = admin[0].AdminId;
    }
  }
  return adminId;
}

module.exports = { getBoardList, getUserList, login };
