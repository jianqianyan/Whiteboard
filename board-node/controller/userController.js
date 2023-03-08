const { linkQuery, add } = require("../until/sqlSever");
const { sqlTime } = require("../until/Time");
const login = async (phone, password) => {
  let user = await linkQuery(`select * from user where phone='` + phone + `'`);
  let userId = -1;
  if (user.length > 0) {
    let userPassword = user[0].password;
    if (userPassword === password) {
      userId = user[0].userId;
    }
  }
  return userId;
};

const register = async (phone, password) => {
  let user = await linkQuery(`select * from user where phone='` + phone + `'`);
  if (user.length !== 0) return { status: -1, message: "手机号已被注册" };
  let userData = {
    userName: phone,
    phone: phone,
    password: password,
    createTime: sqlTime(),
  };
  user = await add("user", userData);
  if (user === -1) return { status: -1, message: "注册失败" };
  return { status: 200, message: "注册成功" };
};

const findUser = async (userId) => {
  let user = await linkQuery(
    `select * from user where userId='` + userId + `'`
  );
  if (user.length == 0) {
    return -1;
  }
  return { userName: user[0].userName, phone: user[0].phone };
};

module.exports = { login, register, findUser };
