var express = require("express");
var expressWs = require("express-ws");

var router = express.Router();
expressWs(router);  //将 express 实例上绑定 websocket 的一些方法

router.ws("/onlineBoard", function (ws, req) {
  ws.send("你连接成功了");
  ws.on("message", function (msg) {
    ws.send("pong" + msg);
  });
})

module.exports = router;