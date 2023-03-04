var express = require("express");
var router = express.Router();
const { brushAdd } = require("../controller/boardController");

// 上传笔迹
router.post("/brushAdd", async (req, res) => {
  let data = req.body;
  let result = brushAdd(data);
  res.send(result);
});

module.exports = router;
