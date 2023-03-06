var express = require("express");
var router = express.Router();
const jwt = require("../until/token");
const { login, register } = require("../controller/userController");
const returnMessage = require("../until/returnMessage");

router.post("/login", async (req, res) => {
  let data = req.body;
  const retMs = new returnMessage();
  if (!data.hasOwnProperty("phone") || !data.hasOwnProperty("password")) {
    retMs.status = 404;
    retMs.message = "账号或密码不能为空";
    res.send(retMs);
    return;
  }
  let user = await login(data.phone, data.password);
  if (user === -1) {
    retMs.status = 404;
    retMs.message = "账号密码错误";
  } else {
    let ip = req.ip || req.connection.remoteAddress;
    let tokenData = { userId: user, ip: ip };
    let token = jwt(tokenData);
    retMs.status = 200;
    retMs.message = "登录成功";
    retMs.data = {
      token,
      userId: user,
    };
  }
  res.send(retMs);
});

router.post("/register", async (req, res) => {
  let data = req.body;
  const retMs = new returnMessage();
  if (!data.hasOwnProperty("phone") || !data.hasOwnProperty("password")) {
    retMs.status = 404;
    retMs.message = "账号或密码不能为空";
    res.send(retMs);
    return;
  }
  let regData = await register(data.phone, data.password);
  retMs.status = regData.status === -1 ? 404 : 200;
  retMs.message = regData.message;
  res.send(retMs);
});

module.exports = router;
