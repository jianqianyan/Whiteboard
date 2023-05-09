var express = require("express");
var expressWs = require("express-ws");
const { getBrushData } = require("../controller/socketCotroller")

var router = express.Router();
expressWs(router);  //将 express 实例上绑定 websocket 的一些方法
const ws_map = new Map();

router.ws("/onlineBoard", function (ws, req) {
  ws.send("你连接成功了");
  let boardId = req.query.boardId;
  if (boardId) {
    if (ws_map.has(boardId)) {
      let sub = ws_map.get(boardId);
      sub.push(ws);
      ws_map.set(boardId, sub);
    }
    else {
      ws_map.set(boardId, [ws]);
    }
  }
  console.log("link " + boardId);
  ws.on("message", async function (msg) {
    let sub = ws_map.get(boardId);
    let mesData = JSON.parse(msg);
    if (mesData.code == 100) {
      let brushId = mesData.brushId;
      let data = await getBrushData(brushId);
      console.log(data)
    }
    sub.map(item => {
      item.send("111");
    })
  });
  ws.on("close", function () {
    console.log("close " + boardId);
    let sub = ws_map.get(boardId);
    let idx = sub.indexOf(ws);
    if (idx != -1) {
      sub.splice(idx, 1);
    }
    ws_map.set(boardId, sub);
  })
})

module.exports = router;