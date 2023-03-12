var express = require("express");
var router = express.Router();
const { getBoardList, getUserList } = require("../controller/adminController");
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

module.exports = router;
