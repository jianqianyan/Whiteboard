var express = require("express");
var router = express.Router();
const {
  brushAdd,
  boardAdd,
  brushUpdate,
  brushDelect,
} = require("../controller/boardController");
const returnMessage = require("../until/returnMessage");

// 上传笔迹
router.post("/brushAdd", async (req, res) => {
  let data = req.body;
  let brushdata = data.data;
  brushdata.createTime = data.createTime;
  let result = await brushAdd(brushdata);
  let retMe = new returnMessage();
  if (result !== -1) {
    retMe.data = "OK";
    retMe.status = 200;
  } else {
    retMe.data = "ERROR";
    retMe.status = 20100;
  }
  res.send(retMe);
});

// 获取boardId
router.get("/boardIdGet", async (req, res) => {
  let data = req.query;
  let retMe = new returnMessage();
  let boardId = await boardAdd(data.userId);
  if (boardId !== -1) {
    retMe.data = { boardId };
    retMe.status = 200;
  } else {
    retMe.data = "ERROR";
    retMe.status = 20100;
  }
  res.send(retMe);
});

// 更新笔迹
router.post("/brushUpdate", async (req, res) => {
  let data = req.body;
  let result = await brushUpdate(data);
  let retMe = new returnMessage();
  if (result !== -1) {
    retMe.data = result;
    retMe.status = 200;
  } else {
    retMe.data = "ERROR";
    retMe.status = 20100;
  }
  res.send(retMe);
});

// 删除笔迹
router.post("/brushDelect", async (req, res) => {
  let data = req.body;
  let result = await brushDelect(data);
  let retMe = new returnMessage();
  if (result !== -1) {
    retMe.data = result;
    retMe.status = 200;
  } else {
    retMe.data = "ERROR";
    retMe.status = 20100;
  }
  res.send(retMe);
});


module.exports = router;
