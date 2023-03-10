var express = require("express");
var router = express.Router();
const { getBoardList } = require("../controller/adminController");
const returnMessage = require("../until/returnMessage");

router.get("/getBoardList", async (req, res) => {
  let data = req.query;
  let result = await getBoardList(data);
  let retMs = new returnMessage();
  retMs.data = result === -1 ? [] : result;
  retMs.status = result === -1 ? 404 : 
  res.send(retMs);
});



module.exports = router;
