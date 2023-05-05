var express = require("express");
const jwt = require("../until/token");
var router = express.Router();
const {
  getBoardList,
  getUserList,
  login,
  userUpdate,
} = require("../controller/adminController");
const returnMessage = require("../until/returnMessage");

router.get("/getBoardList", async (req, res) => {
  let data = req.query;
  let result = await getBoardList(data);
  let retMs = new returnMessage();
  retMs.data = result.data === -1 ? [] : result.data;
  retMs.status = result.data === -1 ? 404 : 200;
  retMs.total = result.total;
  retMs.message = result.data === -1 ? "没有找到" : "查找成功";
  res.send(retMs);
});

router.get("/getUserList", async (req, res) => {
  let data = req.query;
  let retMs = new returnMessage();
  let result = await getUserList(data);
  retMs.data = result.data === -1 ? [] : result.data;
  retMs.status = result.data === -1 ? 404 : 200;
  retMs.message = result.data === -1 ? "没有找到" : "查找成功";
  retMs.total = result.total;
  res.send(retMs);
});

router.post("/login", async (req, res) => {
  let data = req.body;
  let retMs = new returnMessage();
  if (!data.hasOwnProperty("phone") || !data.hasOwnProperty("password")) {
    retMs.status = 404;
    retMs.message = "账号或密码不能为空";
    res.send(retMs);
    return;
  }
  let admin = await login(data.phone, data.password);
  if (admin === -1) {
    retMs.status = 404;
    retMs.message = "账号密码错误";
  } else {
    let ip = req.ip || req.connection.remoteAddress;
    let tokenData = { adminId: admin, ip: ip };
    let token = jwt(tokenData);
    retMs.status = 200;
    retMs.message = "登录成功";
    retMs.data = {
      token,
      adminId: admin,
    };
  }
  res.send(retMs);
});

router.post("/userUpdate", async (req, res) => {
  let data = req.body;
  let retMs = new returnMessage();
  if (!data.hasOwnProperty('userId')) {
    retMs.status = 404;
    retMs.message = "缺少必要的参数";
    res.send(retMs);
    return;
  }
  let user = await userUpdate(data);
  if (user == -1) {
    retMs.status = 404;
    retMs.message = "error";
  } else {
    retMs.status = 200;
    retMs.message = "OK";
  } 
  res.send(retMs);
})

module.exports = router;
