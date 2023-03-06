function tokenhandler(req, res, next) {
  // 对于不需要token的接口跳过
  if (!req.hasOwnProperty("user")) {
    next();
    return;
  }
  // 对ip进行校验 
  let ip = req.ip || req.connection.remoteAddress;
  let token = req.user;
  if (token.ip !== ip) {
    res.send({
      status: 401,
    });
  }
  next();
}
module.exports = tokenhandler;
