var express = require("express");
var router = express.Router();
const jwt = require("../until/token");
const { login } = require("../controller/userController");

router.post("/login", async (req, res) => {
  let data = req.body;
  if (!data.hasOwnProperty("phone") || !data.hasOwnProperty("password")) {
  }
  let user = await login(data.phone, data.password);
  console.log(user);
  //   let ip = req.ip || req.connection.remoteAddress;
  //   let data = { userId: 1, ip: ip };
  //   let token = jwt(data);
  res.send();
});

module.exports = router;
