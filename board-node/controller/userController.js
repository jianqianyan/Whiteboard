const { linkQuery } = require("../until/sqlSever");
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

module.exports = { login };
