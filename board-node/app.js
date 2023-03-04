const express = require("express");
const app = express();
const port = 3000;
const { dbInit } = require("./until/db");
const board = require("./routes/board");

dbInit()
  .then(() => {
    console.log("数据库初始化成功");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", async (req, res) => {
  let sqlStr = "SELECT * FROM user";
  res.send(sqlStr);
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/public", express.static("public"));
app.use("/board", board);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
