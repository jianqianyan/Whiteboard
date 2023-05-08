const { linkQuery } = require("../until/sqlSever");

// 返回的用户信息配置
const userArr = ["userId", "userName", "phone", "email", "createTime", "Available"];
// 在修改时需要筛去的用户信息
const userConst = ["userId", "createTime"];

class userData {
  constructor(data) {
    for (let key in data) {
      if (userArr.includes(key)) {
        this[key] = data[key];
      }
    }
  }
}
// 返回的笔记信息配置
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

/**
 * @description: 获取后台白板list
 * @param {data:{page: 当前页数,pageSize: 每一页的尺寸,boardId: 查询的boardId, userId: 查询的用户id}}
 * @return {data: 白板list, total: list的长度}
 **/
const getBoardList = async (data) => {
  let page = Number(data.page) || 1;
  let pageSize = Number(data.pageSize) || 10;
  let begin = (page - 1) * pageSize;
  let end = pageSize;
  let limit = ` limit ` + begin + `,` + end;
  let sqlstr = `select * from board `;
  let condition = ``;
  let dataConst = ["boardId", "userId"];
  for (let key in data) {
    if (dataConst.indexOf(key) != -1 && data[key]) {
      if (condition != ``) {
        condition += ` and `;
      }
      let mes = data[key];
      if (typeof (mes) == 'string') {
        mes = `'%` + mes + `%'`;
      }
      condition += key + ` like ` + mes;
    }
  }
  if (condition)
    condition = `where ` + condition;
  sqlstr += condition;
  sqlstr += limit;
  let boardList = await linkQuery(sqlstr);
  let list = await Promise.all(
    boardList.map(async (item) => {
      let brushsql =
        `select * from brush where boardId like '` + item.boardId + `'`;
      let brushList = await linkQuery(brushsql);
      brushList = brushList.filter((item) => {
        return item.revised == 0;
      }).map((item) => {
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

/**
 * @description: 获取后台白板list
 * @param {data:{page: 当前页数,pageSize: 每一页的尺寸,userName: 查询的userName, userId: 查询的用户id}}
 * @return {data: 用户list, total: list的长度}
 **/
const getUserList = async (data) => {
  let page = Number(data.page) || 1;
  let pageSize = Number(data.pageSize) || 10;
  let begin = (page - 1) * pageSize;
  let end = pageSize;
  let limit = ` limit ` + begin + `,` + end;
  let sqlstr = `select * from user`;
  let condition = ``;
  let dataConst = ["userId", "userName"];
  for (let key in data) {
    if (dataConst.indexOf(key) != -1 && data[key]) {
      if (condition != ``) {
        condition += ` and `;
      }
      let mes = data[key];
      if (typeof (mes) == 'string') {
        mes = `'%` + mes + `%'`;
      }
      condition += key + ` like ` + mes;
    }
  }
  if (condition)
    condition = ` where ` + condition;
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

/**
 * @description: 修改用户信息
 * @param {data:需要修改的用户信息}
 * @return {message: 返回信息 -1为修改失败}
 **/
const userUpdate = async (data) => {
  let userId = data.userId;
  let message = {};
  for (let key in data) {
    if (userConst.indexOf(key) == -1) {
      message[key] = data[key];
    }
  }
  let sqlstr = `update user set `;
  let sql1 = ``;
  Object.keys(message).forEach((key) => {
    if (sql1 != ``) sql1 += ',';
    let mes = message[key]
    if (typeof (message[key]) == 'string') {
      mes = `'` + mes + `'`;
    }
    sql1 = sql1 + key + `=` + mes;
  })
  sqlstr = sqlstr + sql1 + ` where userId = ` + userId;
  let res = await linkQuery(sqlstr);
  return res == -1 ? -1 : "OK";
}

module.exports = { getBoardList, getUserList, login, userUpdate };
