// token解析错误中间件
var save = require("../until/save");
function errorHandler(err, req, res, next) {
  // console.log(err, err.name);
  save.save(err + err.name, "errorhandler");
  let code = 500;
  let message = "Internal Server Error";
  // token解析的错误
  if (err.name === "UnauthorizedError") {
    code = 401;
    message = "no login";
  }
  res.statusCode = code;
  res.send({
    status: code,
    message,
  });
}

module.exports = errorHandler;
