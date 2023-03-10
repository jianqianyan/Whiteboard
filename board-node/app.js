const express = require("express");
const app = express();
const port = 3000;
const { dbInit } = require("./until/db");
const board = require("./routes/board");
const user = require("./routes/user");
const admin = require("./routes/admin");
var cookieParser = require("cookie-parser");
app.use(express.json({ limit: "100mb" }));
app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

// 数据库初始化
dbInit()
  .then(() => {
    console.log("数据库初始化成功");
  })
  .catch((err) => {
    console.log(err);
  });

// token
app.use(cookieParser());
// token 解析
const expressJwt = require("express-jwt");
const SECRET_KEY = "jianqianyan";
app.use(
  expressJwt({
    secret: SECRET_KEY,
    algorithms: ["HS256"], // 使用何种加密算法解析
  }).unless({
    path: [
      "/public",
      "/user/login",
      "/user/register",
      "/board/boardInit",
      "/admin/getBoardList",
    ],
  })
);
const tokenhandler = require("./middleware/tokenhandler");
app.use(tokenhandler);

app.use("/board", board);
app.use("/user", user);
app.use("/admin", admin);
app.use("/public", express.static("public"));
app.get("/", async (req, res) => {
  let sqlStr = "Hello";
  res.send(sqlStr);
});

// 处理token不合法或过期
const errorhandler = require("./middleware/errorhandler");
app.use(errorhandler);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
